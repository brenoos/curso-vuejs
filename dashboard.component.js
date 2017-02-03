
window.dashboardComponent = Vue.extend({
    template: `
    <h1> {{title}} </h1>
    
    <h2>Você tem {{totalPagar | currency 'R$ ' 2}} à Pagar</h2>
    <h2>Você tem {{totalReceber | currency 'R$ ' 2}} à Receber</h2>
    <br/><br/>
    <h2>Seu saldo será de {{totalReceber - totalPagar | currency 'R$ ' 2}}</h2>
    `,
    data: function(){
        return {
            title: "Dashboard",
            totalPagar: 0,
            totalReceber: 0
        };
    },
    created: function () {
        this.getTotalPagar();
        this.getTotalReceber();
    },
    methods: {
      getTotalPagar(){
          Bill.total().then((response) => {
              this.totalPagar = response.data.total;
          })
      },
        getTotalReceber(){
            BillReceive.total().then((response) => {
                this.totalReceber = response.data.total;
            })
        }
    },
});