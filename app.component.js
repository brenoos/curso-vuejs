/**
 * Created by breno on 05/12/16.
 */
window.appComponent = Vue.extend({
    components: {
        'menu-component' : menuComponent,
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
        };
    },
    computed: {
        status: function(){
            var bills = this.$root.$children[0].bills;
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