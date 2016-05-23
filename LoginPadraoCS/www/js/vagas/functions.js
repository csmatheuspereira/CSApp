function listaVagas(vagas){
    $("#lvVagas").html(" ");
    if(Object.keys(vagas).length > 0 && vagas.result != false){
        for(var i=0; i < Object.keys(vagas).length; i++){
            
                        
             var itemVaga = "<a class='list-group-item allow-badge widget uib_w_80' data-uib='twitter%20bootstrap/list_item' href='#' data-ver='1' id='lvItemVaga' data-codigo='"+i+"' data-descM='"+vagas[i].descricaoMacro+"' data-desc='"+ vagas[i].descricao+"'  data-val='"+vagas[i].dataValidade+"'> <img class='img-vaga' src='interface/UI/vagas/seta_direita.png'> <h4 class='list-group-item-heading'>"+ vagas[i].descricao +"</h4> <p class='list-group-item-text'>Inscrição até "+ vagas[i].dataValidade +"</p></a>"
                        
            
            $("#lvVagas").append(itemVaga);
        }
        $(".uib_w_63").remove();
        activate_page("#vagas");
        
    }else if(vagas.result == false){
        
        var itemVaga = "<div class='alert no_wrap widget uib_w_56 d-margins alert-warning' data-uib='twitter%20bootstrap/alert' data-ver='1'><i class='glyphicon glyphicon-warning-sign'></i> Nenhuma vaga disponível.</div>"
        
        $("#lvVagas").append(itemVaga);
        
        $(".uib_w_63").remove();
        activate_page("#vagas");
    }else{
        navigator.notification.alert("Erro na requisição, verifique sua internet e tente novamente. Se o problema persistir contate o suporte.", null, "Erro");
    }
}

function perfilVaga(id){
    $("#pnVaga").html("");
    
    var header = "<div class='panel-heading'><div class='widget-container'><div class='tarea widget uib_w_71 d-margins pnMainStyleMargins' data-uib='media/text data-ver='0' name='uib_w_71'><div class='widget-container left-receptacle'></div><div class='widget-container right-receptacle'></div><div class='text-container'><h3><strong> "+$("#lvItemVaga[data-codigo='"+id+"']").attr("data-desc")+"</strong></h3></div></div></div></div>";
    
    $("#pnVaga").append(header);
    
    var body = "<div class='col uib_col_15 single-col' data-uib='layout/col' data-ver='0'><div class='widget-container content-area vertical-col'><div class='tarea widget uib_w_68 d-margins' data-uib='media/text' data-ver='0' name='uib_w_68'><div class='widget-container left-receptacle'></div><div class='widget-container right-receptacle'></div><div class='text-container'><p> "+ $("#lvItemVaga[data-codigo='"+id+"']").attr("data-descM") +" </p><p><strong> Inscrições até "+ $("#lvItemVaga[data-codigo='"+id+"']").attr("data-val")  +" </strong> - Procurar o departamento de RH</p></div></div><span class='uib_shim'></span></div></div>";
    
    $("#pnVaga").append(body);
//    $("#lvItemVaga[data-codigo='"+id+"']").attr("data-descM")
    activate_page("#vaga");
    
}

// Verifica se já exite uma data definida no LOCALSTORAGE, caso não exista
// definine a data atual para o LOCALSTORAGE.
//-- NECESSARIO PARA EVITAR BUG AO MOMENTO DE
// INSTALACAO DO APLICATIVO POIS O LOCALSTORAGE ESTARA VAZIO. ---

// Valor de default da flag é 0(somente retorno)
// Valor 1(grava uma nova data e a retorna)

// Modo de uso:
//  badgeNovasVagas(); Modo default (0) da funcao, somente retorno
//  badgeNovasVagas(1); Modo gravar e retornar (1) da funcao, grava uma nova data e a retorna

function badgeNovasVagas(flagSetaData){
    if (typeof(flagSetaData)==='undefined') flagSetaData = 0;
    
    if (localStorage.getItem("dataUltimoClique") === null || flagSetaData == 1) {
        cliqueVaga();
        localStorage.setItem("dataUltimoClique", geraData('/',1));        
        return localStorage.getItem("dataUltimoClique");
    }else if(flagSetaData == 0){
        cliqueVaga();
        return localStorage.getItem("dataUltimoClique");
    }
    
}

function cliqueVaga(){
    if(localStorage.getItem("cliqueVaga") === null){
        localStorage.setItem("cliqueVaga", 0);
    }else{
        if(geraData("/", 1) > localStorage.getItem("dataUltimoClique")){
            localStorage.setItem("cliqueVaga", 0);
        }
    }
    
}
