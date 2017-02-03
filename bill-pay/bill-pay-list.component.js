window.billPayListComponent = Vue.extend({
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
                    <td> {{o.date_due}} </td>
                    <td> {{o.name}} </td>
                    <td> {{o.value | currency 'R$ ' 2}} </td>
                    <td class="minha-classe" :class="{'pago': o.done, 'nao-pago': !o.done}">
                        {{o.done | doneLabel}}
                    </td>
                    <td>
                        <a v-link="{name: 'bill-pay.update', params: {id: o.id}}">Editar</a> 
                        <a href="#" @click.prevent='remover(o)'>Remover</a>
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    data: function(){
        return {
            bills: []
        };
    },
    created: function () {
      Bill.query().then((response) => {
          this.bills = response.data;
      });
    },
    methods: {
        remover: function(bill){
            if(confirm("deseja exlucir?")){
                Bill.delete({id: bill.id}).then((response) => {
                    this.bills.$remove(bill);
                    this.$dispatch('change-info');
                });
            }
        },
    }
});