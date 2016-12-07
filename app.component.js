/**
 * Created by breno on 05/12/16.
 */
window.appComponent = Vue.extend({
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
    <router-view></router-view>
    `,
    data: function(){
        return {
            title: "Contas a pagar",
        };
    },
    computed: {
        status: function(){
            var billListComponent = this.$refs.billListComponent;
            if( billListComponent.bills == ""){
                return false;
            }
            var count = 0;
            for(var i in billListComponent.bills){
                if(!billListComponent.bills[i].done){
                    count++;
                }
            }
            return count;
        }
    },
    methods: {},
    events: {
        'change-formType': function(formType){
            this.$broadcast('change-formType', formType);
        },
        'change-bill': function(bill){
            this.$broadcast('change-bill',bill);
        },
        'new-bill': function(bill){
            this.$broadcast('new-bill', bill);
        }
    }
});