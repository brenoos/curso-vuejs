window.billComponent = Vue.extend({
    template:`
    <nav>
        <ul>
            <li v-for="o in menus">
                <a v-link="{name: o.routeName}"> {{o.name}} </a>
                </li>
        </ul>
    </nav>
    <router-view></router-view>
    `,
    data: function(){
        return {
            menus: [
                // {id: 0, name:"Listar Contas", url: '/bills'},
                // {id: 1, name: "Criar Conta", url: '/bill/create'}
                {name: "Contas a pagar", routeName: 'bill.list'},
                {name: "Contas a receber", routeName: 'bill.create'}
            ],
        };
    },
});