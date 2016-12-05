window.menuComponent = Vue.extend({
    template:`
    <nav>
        <ul>
            <li v-for="o in menus">
                <a href="#" @click.prevent="showView(o.id);"> {{o.name}} </a>
                </li>
        </ul>
    </nav>
    `,
    data: function(){
        return {
            menus: [
                {id: 0, name:"Listar Contas"},
                {id: 1, name: "Criar Conta"}
            ],
        };
    },
    methods: {
        showView: function(id){
            this.$dispatch('change-activedview', id);
            if(id == 1){
                this.$dispatch('change-formtype', 'insert');
            }
        },
    },
});