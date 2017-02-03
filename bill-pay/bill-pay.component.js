/**
 * Created by breno on 05/12/16.
 */
window.billPayComponent = Vue.extend({
    components: {
        'menu-component' : billPayMenuComponent,
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
    <router-view></router-view>
    `,
    data: function(){
        return {
            title: "Contas a pagar",
            status: false
        };
    },
    created: function () {
      this.updateStatus();
    },
    methods:{
        calculateStatus: function (bills) {
            if(!bills.length){
                this.status = false;
            }
            var count = 0;
            for(var i in bills){
                if(!bills[i].done){
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus: function () {
            Bill.query().then((response) => {
                this.calculateStatus(response.data);
            });
        }
    },
    events:{
        'change-status': function () {
            this.updateStatus();
        }
    }
});