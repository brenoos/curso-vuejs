
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
        };
    },
    computed: {
        totalReceber(){
            var total = 0;
            var bills = this.$root.$children[0].billsReceive;
            for(var i in bills){
                total += bills[i].value
            }
            return total;
        }
    },
    created: function () {
        this.getTotalPagar()
    },
    methods: {
      getTotalPagar(){
          Bill.total().then((response) => {
              this.totalPagar = response.data.total;
          })
      }
    },
});