window.billListComponent = Vue.extend({
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
            bills: this.$root.$children[0].bills
        };
    },
    methods: {
        loadBill: function(bill){
            this.$dispatch('change-bill', bill);
            this.$dispatch('change-formtype', 'update');
        },
        remover: function(index){
            if(confirm("deseja exlucir?")){
                this.bills.splice(index, 1);
            }
        },
    },
    events:{
        'new-bill': function (bill) {
            this.bills.push(bill);
        }
    }
});