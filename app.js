Vue.filter('doneLabel', function(value){
    if(value == false){
        return "Não paga";
    }else{
        return "Paga";
    }
});

Vue.filter('corContas', function(value){
    if(value === false){
        return "Nenhuma conta Cadastrada";
    }
    if(!value){
        return "Nenhuma conta a pagar"
    }else{
        return "Você tem "+value+" contas a pagar";
    }
});
var menuComponent = Vue.extend({
    template:`
    <nav>
        <ul>
            <li v-for="o in menus">
                <a href="#" @click.prevent="showView(o.id);"> {{o.name}} </a>
                </li>
        </ul>
    </nav>
    `,
    data: function(){
        return {
            menus: [
                {id: 0, name:"Listar Contas"},
                {id: 1, name: "Criar Conta"}
            ],
        };
    },
    methods: {
        showView: function(id){
            this.$parent.activedView = id;
            if(id == 1){
                this.$parent.formType = 'insert';
            }
        },
    },
});
var billListComponent = Vue.extend({
    template: `
        <style type="text/css">
        .pago{
            color: green;
        }
        .nao-pago{
            color: red;
        }
        </style>
        <table border="1" cellpadding="10">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Vencimento</th>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Paga?</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(index,o) in bills">
                    <td> {{index + 1}} </td>
                    <td> {{o.data_due}} </td>
                    <td> {{o.name}} </td>
                    <td> {{o.value | currency 'R$ ' 2}} </td>
                    <td class="minha-classe" :class="{'pago': o.done, 'nao-pago': !o.done}"> 
                        {{o.done | doneLabel}} 
                    </td>
                    <td>
                        <a href="#" @click.prevent="loadBill(o)">Editar</a> <a href="#" @click.prevent='remover(index)'>Remover</a>
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    data: function(){
        return {
            bills: [
                {data_due: '20/08/2016', name: 'Conta de luz', value: 70.99, done: true},
                {data_due: '21/08/2016', name: 'Conta de água', value: 55.99, done: false},
                {data_due: '22/08/2016', name: 'Conta de telefone', value: 25.99, done: false},
                {data_due: '23/08/2016', name: 'Supermercado', value: 65.99, done: false},
                {data_due: '24/08/2016', name: 'Cartão de crédito', value: 1500.99, done: false},
                {data_due: '25/08/2016', name: 'Empréstimo', value: 5500.99, done: false},
                {data_due: '26/08/2016', name: 'Gasolina', value: 200.99, done: false}
            ]
        };
    },
    methods: {
        loadBill: function(bill){
            this.$parent.bill = bill;
            this.$parent.activedView = 1;
            this.$parent.formType = 'update'
        },
        remover: function(index){
            if(confirm("deseja exlucir?")){
                this.bills.splice(index, 1);
            }
        },
    }
});
var billCreateComponent = Vue.extend({
    template:`
        <form name="form" @submit.prevent="submit">
            <label>Vencimento:</label>
            <input type="text" v-model="bill.data_due" />
            <br /><br />
            <label>Nome:</label>
            <select v-model="bill.name">
                <option v-for="o in names" :value="o"> {{o}} </option>
            </select>
            <br /><br />
            <label>Valor:</label>
            <input type="text" v-model="bill.value"/>
            <br /><br />
            <label> Paga</label>
            <input type="checkbox" v-model="bill.done" />
            <br /><br />
            <input type="submit" value="Enviar"/>
        </form>    
    `,
    props: ['bill','formType'],
    data: function(){
        return {
            names: [
                'Conta de luz',
                'Conta de água',
                'Conta de telefone',
                'Supermercado',
                'Cartão de crédito',
                'Empréstimo',
                'Gasolina',
            ]
        };
    },
    methods: {
        submit: function(){
            if(this.formType == 'insert'){
                this.$parent.$children[1].bills.push(this.bill);
            }
            this.bill = {
                data_due: '',
                name: '',
                value: 0,
                done: false
            };
            this.$parent.activedView = 0;
        },
    }
});
var appComponent = Vue.extend({
    components: {
        'menu-component' : menuComponent,
        'bill-list-component': billListComponent,
        'bill-create-component': billCreateComponent
    },
    template: `
    <style type="text/css">
        .pago{
            color: green;
        }
        .nao-pago{
            color: red;
        }
        .cinza{
            color: gray;
        }
        .minha-classe{
            background-color: burlywood;
        }
    </style>
    <h1> {{title}} </h1>
    <h3 :class="{'nao-pago': status > 0, 'pago': status === 0, 'cinza': status === false}"> 
        {{status | corContas}} 
    </h3>
    <menu-component></menu-component>
    <div v-show="activedView == 0">
        <bill-list-component></bill-list-component>
    </div>
    <div v-show="activedView == 1">
       <bill-create-component :bill.sync="bill" :form-type="formType"></bill-create-component>      
    </div>
    `,
    data: function(){
        return {
            test: '',
            title: "Contas a pagar",
            activedView: 0,
            formType: 'insert',
            bill: {
                data_due: '',
                name: '',
                value: 0,
                done: false
            },
        };
    },
    computed: {
        status: function(){
            if(this.bills == ""){
                return false;
            }
            var count = 0;
            for(var i in this.bills){
                if(!this.bills[i].done){
                    count++;
                }
            }
            return count;
        }
    },
    methods: {

    },
});
Vue.component('app-component', appComponent);
var app = new Vue({
    el: "#app",
});