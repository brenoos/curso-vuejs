var router = new VueRouter();

router.map({
    '/bills' : {
        name: 'bill.list',
        component: window.billListComponent
    },
    'bill/create': {
        name: 'bill.create',
        component: billCreateComponent
    },
    '*': {
        component: billListComponent
    }
});

router.start({
    components: {
        'app-component' : appComponent
    }
}, '#app');

router.redirect({
   '*': '/bills'
});