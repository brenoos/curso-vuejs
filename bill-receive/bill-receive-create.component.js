window.billReceiveCreateComponent = Vue.extend({
    template:`
        <form name="form" @submit.prevent="submit">
            <label>Vencimento:</label>
            <input type="text" v-model="bill.date_due" />
            <br /><br />
            <label>Nome:</label>
            <select v-model="bill.name">
                <option v-for="o in names" :value="o"> {{o}} </option>
            </select>
            <br /><br />
            <label>Valor:</label>
            <input type="text" v-model="bill.value"/>
            <br /><br />
            <label> Recebida</label>
            <input type="checkbox" v-model="bill.done" />
            <br /><br />
            <input type="submit" value="Enviar"/>
        </form>
    `,
    data: function(){
        return {
            formType: 'insert',
            names: [
                'Casas',
                'Salário',
                'Vale Alimentação',
                'Vale Refeição',
                'Vale Transporte'
            ],
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
        };
    },
    created: function(){
        if(this.$route.name == 'bill-receive.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit: function(){
            if(this.formType == 'insert'){
                BillReceive.save({}, this.bill).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                });
            }else{
                BillReceive.update({id: this.bill.id}, this.bill).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                });
            }
        },
        getBill: function(id) {
            BillReceive.get({id: id}).then((response) => {
                this.bill = response.data;
            })
        },
    },
});