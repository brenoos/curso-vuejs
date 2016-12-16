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
            ]
        };
    }
});
router.map({
    '/bill-pays': {
        component: billPayComponent,
        subRoutes: {
            '/' : {
                name: 'bill.list',
                component: billPayListComponent
            },
            '/create': {
                name: 'bill.create',
                component: billPayCreateComponent
            },
            '/:index/update': {
                name: 'bill.update',
                component: billPayCreateComponent
             },
        }
    },
});

router.start({
    components: {
        'main-component' : mainComponent
    }
}, '#app');
//
// router.redirect({
//    '*': '/bills'
//});