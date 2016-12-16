/**
 * Created by breno on 05/12/16.
 */
Vue.filter('doneLabel', function(value){
    if(value == false){
        return "Não paga";
    }else{
        return "Paga";
    }
});

Vue.filter('doneLabelReceive', function(value){
    if(value == false){
        return "Não Recebida";
    }else{
        return "Recebida";
    }
});

Vue.filter('corContas', function(value){
    if(value === false){
        return "Nenhuma conta Cadastrada";
    }
    if(!value){
        return "Nenhuma conta a pagar"
    }else{
        return "Você tem "+value+" contas a pagar";
    }
});

Vue.filter('corContasReceive', function(value){
    if(value === false){
        return "Nenhuma conta Cadastrada";
    }
    if(!value){
        return "Nenhuma conta a receber"
    }else{
        return "Você tem "+value+" contas a receber";
    }
});