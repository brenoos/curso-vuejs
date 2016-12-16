window.billReceiveComponent = Vue.extend({
    components: {
        'menu-component' : billReceiveMenuComponent
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
        {{status | corContasReceive}}
    </h3>
    <menu-component></menu-component>
    <router-view></router-view>
    `,
    data: function(){
        return {
            title: "Contas a Receber",
        };
    },
    computed: {
        status: function(){
            var bills = this.$root.$children[0].billsReceive;
            if(!bills.length){
                return false;
            }
            var count = 0;
            for(var i in bills){
                if(!bills[i].done){
                    count++;
                }
            }
            return count;
        }
    },
});