var router = new VueRouter();
var mainComponent = Vue.extend({
    components: {
        'bill-component': billComponent
    },
    template: `<bill-component></bill-component>`,
    data: function () {
        return {
            billsPay: [
                {data_due: '20/08/2016', name: 'Conta de luz', value: 70.99, done: true},
                {data_due: '21/08/2016', name: 'Conta de água', value: 55.99, done: false},
                {data_due: '22/08/2016', name: 'Conta de telefone', value: 25.99, done: false},
                {data_due: '23/08/2016', name: 'Supermercado', value: 65.99, done: false},
                {data_due: '24/08/2016', name: 'Cartão de crédito', value: 1500.99, done: false},
                {data_due: '25/08/2016', name: 'Empréstimo', value: 5500.99, done: false},
                {data_due: '26/08/2016', name: 'Gasolina', value: 200.99, done: false}
            ],
            billsReceive: [
                {data_due: '20/08/2016', name: 'Casas', value: 70.99, done: true},
                {data_due: '21/08/2016', name: 'Salário', value: 55.99, done: false},
                {data_due: '22/08/2016', name: 'Vale Alimentação', value: 25.99, done: false},
                {data_due: '23/08/2016', name: 'Vale Refeição', value: 65.99, done: false},
                {data_due: '24/08/2016', name: 'Vale Transporte', value: 1500.99, done: false}
            ]
        };
    }
});
router.map({
    '/':{
        name: 'dashboard',
        component: dashboardComponent
    },
    '/bill-pays': {
        name: 'bill-pay',
        component: billPayComponent,
        subRoutes: {
            '/' : {
                name: 'bill-pay.list',
                component: billPayListComponent
            },
            '/create': {
                name: 'bill-pay.create',
                component: billPayCreateComponent
            },
            '/:index/update': {
                name: 'bill-pay.update',
                component: billPayCreateComponent
             },
        }
    },
    '/bill-receive': {
        name: 'bill-receive',
        component: billReceiveComponent,
        subRoutes: {
             '/' : {
                name: 'bill-receive.list',
                component: billReceiveListComponent
            },
            '/create': {
                name: 'bill-receive.create',
                component: billReceiveCreateComponent
            },
            '/:index/update': {
                name: 'bill-receive.update',
                component: billReceiveCreateComponent
             },
        }
    },
});

router.start({
    components: {
        'main-component' : mainComponent
    }
}, '#app');
