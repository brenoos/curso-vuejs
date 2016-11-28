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

var app = new Vue({
    el: "#app",
    data:{
        test: '',
        title: "Contas a pagar",
        menus: [
            {id: 0, name:"Listar Contas"},
            {id: 1, name: "Criar Conta"}
        ],
        activedView: 0,
        formType: 'insert',
        bill: {
            data_due: '',
            name: '',
            value: 0,
            done: false
        },
        names: [
            'Conta de luz',
            'Conta de água',
            'Conta de telefone',
            'Supermercado',
            'Cartão de crédito',
            'Empréstimo',
            'Gasolina',
        ],
        bills: [
            {data_due: '20/08/2016', name: 'Conta de luz', value: 70.99, done: true},
            {data_due: '21/08/2016', name: 'Conta de água', value: 55.99, done: false},
            {data_due: '22/08/2016', name: 'Conta de telefone', value: 25.99, done: false},
            {data_due: '23/08/2016', name: 'Supermercado', value: 65.99, done: false},
            {data_due: '24/08/2016', name: 'Cartão de crédito', value: 1500.99, done: false},
            {data_due: '25/08/2016', name: 'Empréstimo', value: 5500.99, done: false},
            {data_due: '26/08/2016', name: 'Gasolina', value: 200.99, done: false}
        ]
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
        showView: function(id){
            this.activedView = id;
            if(id == 1){
                this.formType = 'insert';
            }
        },
        submit: function(){
            if(this.formType == 'insert'){
                this.bills.push(this.bill);
            }
            this.bill = {
                data_due: '',
                name: '',
                value: 0,
                done: false
            };
            this.activedView = 0;
        },
        loadBill: function(bill){
            this.bill = bill;
            this.activedView = 1;
            this.formType = 'update'
        },
        remover: function(index){
            if(confirm("deseja exlucir?")){
                this.bills.splice(index, 1);
            }
        },
    },
});