var app = new Vue({
    el: "#app",
    data:{
        title: "Contas a pagar",
        menus: [
            {id: 0, name:"Listar Contas"},
            {id: 1, name: "Criar Conta"}
        ],
        activedView: 0,
        bills: [
            {data_due: '20/08/2016', name: 'Conta de luz', value: 70.99, done: 1},
            {data_due: '21/08/2016', name: 'Conta de água', value: 55.99, done:0},
            {data_due: '22/08/2016', name: 'Conta de telefone', value: 25.99, done:0},
            {data_due: '23/08/2016', name: 'Supermercado', value: 65.99, done:0},
            {data_due: '24/08/2016', name: 'Cartão de crédito', value: 1500.99, done:0},
            {data_due: '25/08/2016', name: 'Empréstimo', value: 5500.99, done:0},
            {data_due: '26/08/2016', name: 'Gasolina', value: 200.99, done:0}
        ]
    },
    computed: {
        status: function(){
            var count = 0;
            for(var i in this.bills){
                if(!this.bills[i].done){
                    count++;
                }
            }
            return !count?"Nenhuma conta a Pagar":"Existem "+ count +" a serem pagas";
        }
    },
    methods: {
        showView: function(id){
            this.activedView = id;
        }
    }
});

