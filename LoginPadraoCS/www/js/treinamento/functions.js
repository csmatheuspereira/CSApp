function treinamentos(json){
    
    if(json.treinamento != undefined){
        if(json.treinamento.length > 0){
            
            $("#lvTreinamentos").html(" ");
            var treinamento = "";
            for(var i=0; i < json.treinamento.length; i++){
                
                treinamento += "<a class='list-group-item allow-badge widget uib_w_103' data-uib='twitter%20bootstrap/list_item' data-ver='1' href='#' id='lvItemTreinamentos' data-codigo='"+json.treinamento[i].codTreinamento+"' data-titulo='"+json.treinamento[i].titulo+"' data-palestrante='"+json.treinamento[i].palestrante+"' data-descricao='"+json.treinamento[i].conteudo+"' data-inicio='"+json.treinamento[i].dataInicio+"' data-fim='"+json.treinamento[i].dataTermino+"' data-horaInicio='"+json.treinamento[i].horaInicio+"' data-horaFim='"+json.treinamento[i].horaFinal+"' data-intervalo='"+json.treinamento[i].intervalo+"' data-custo='"+json.treinamento[i].valorCurso+"' data-inscricoes='"+json.treinamento[i].fimInscricao+"' data-status='"+json.treinamento[i].status+"'><h4 class='list-group-item-heading'>"+json.treinamento[i].titulo+"</h4><p class='list-group-item-text text-listv'><strong>Palestrante: </strong>"+json.treinamento[i].palestrante+"</p><p class='list-group-item-text text-listv'><strong>Inicio: </strong> "+json.treinamento[i].dataInicio+"</p><p class='list-group-item-text text-listv'><strong>Inscrições até: </strong>"+json.treinamento[i].fimInscricao+"</p></a>";
                
            }
            $("#lvTreinamentos").append(treinamento);
            var treinamento = "";
            activate_page("#treinamentos");
        }else{
            navigator.notification.alert("não tem nada", null, "Erro");
        }

    }else{
        navigator.notification.alert("não tem nada", null, "Erro");
    }
    
}

function perfilTreinamento(id){
    
    if($("#lvItemTreinamentos[data-codigo='"+id+"']").data("custo") == 0){
        var custo = "Grátis";
    }else{
        var custo = moeda($("#lvItemTreinamentos[data-codigo='"+id+"']").data("custo"))
    }
    
    //perfilTreinamento tituloTreinamento
    $("#perfilTreinamento").html(" ");
    $(".tituloTreinamento").html(" ");
    $(".tituloTreinamento").html($("#lvItemTreinamentos[data-codigo='"+id+"']").data("titulo"));
    $("#perfilTreinamento").append("<p><strong>Palestrante: </strong>"+$("#lvItemTreinamentos[data-codigo='"+id+"']").data("palestrante")+"</p><p><strong>Descrição: </strong>"+$("#lvItemTreinamentos[data-codigo='"+id+"']").data("descricao")+"</p><p><strong>Inicio: </strong>"+$("#lvItemTreinamentos[data-codigo='"+id+"']").data("inicio")+"</p><p><strong>Término: </strong>"+$("#lvItemTreinamentos[data-codigo='"+id+"']").data("fim")+"</p><p><strong>Hora Início: </strong>"+$("#lvItemTreinamentos[data-codigo='"+id+"']").data("horainicio")+"</p><p><strong>Hora Final: </strong>"+$("#lvItemTreinamentos[data-codigo='"+id+"']").data("horafim")+"</p><p><strong>Intervalo: </strong>"+$("#lvItemTreinamentos[data-codigo='"+id+"']").data("intervalo")+"</p><p><strong>Custo: </strong>"+custo+"</p><p><strong>Inscrições até:</strong> "+$("#lvItemTreinamentos[data-codigo='"+id+"']").data("inscricoes")+"</p>");
    
    $(".btnInscricao").html(" ");
    
    if($("#lvItemTreinamentos[data-codigo='"+id+"']").data("status") == "A"){
        $(".btnInscricao").html("<button class='btn widget uib_w_112 d-margins btnWidth btn-warning' disabled='disabled' data-uib='twitter%20bootstrap/button' data-ver='1'>Aguardando aprovação da vaga</button>");
    }else if($("#lvItemTreinamentos[data-codigo='"+id+"']").data("status") == "S"){
        $(".btnInscricao").html("<button class='btn widget uib_w_112 d-margins btnWidth btn-success' disabled='disabled' data-uib='twitter%20bootstrap/button' data-ver='1'>Inscrição aprovada</button>");
    }else if($("#lvItemTreinamentos[data-codigo='"+id+"']").data("status") == "N"){
        $(".btnInscricao").html("<button class='btn widget uib_w_112 d-margins btnWidth btn-danger' disabled='disabled' data-uib='twitter%20bootstrap/button' data-ver='1'>Inscrição reprovada</button>");
    }else if($("#lvItemTreinamentos[data-codigo='"+id+"']").data("status") == null){
         $(".btnInscricao").html("<button class='btn widget uib_w_112 d-margins btnWidth btn-primary' data-uib='twitter%20bootstrap/button' data-ver='1' data-idtrapp='"+id+"' id='btnEnviarInscricao'>Enviar Inscrição</button>");
    }
    
    activate_page("#treinamento");
    
//    <button class="btn widget uib_w_112 d-margins btnWidth btn-primary" data-uib="twitter%20bootstrap/button" data-ver="1">Enviar Inscrição</button>
    
//<p><strong>Palestrante:</strong> Carmen</p><p><strong>Descrição:</strong> Mauris id mi arcu. Vivamus luctus tincidunt ipsum vitae rhoncus. Morbi commodo sagittis elit nec accumsan. Interdum e</p><p><strong>Inicio: </strong> 18/06</p><p><strong>Término: </strong> 25/06</p><p><strong>Hora Início: </strong> 14:00</p><p><strong>Hora Final: </strong> 18:00</p><p><strong>Intervalo: </strong> 0:30</p><p><strong>Custo: </strong>Grátis</p><p><strong>Inscrições ate 13/06</strong></p>
    
    
}

$(document).on("click", "#btnEnviarInscricao", function(evt)
{
    
    var codigo = $(this).data('idtrapp');
    
    if (checaWS()){
        var values = {'acao':'inscricao', 
                      'Login':localStorage.getItem("login"),
                      'Senha':localStorage.getItem("senha"),
                      'FlagSenha':flagSenha,
                      'idUsuario':localStorage.getItem("idUsuario"),
                      'idTrapp':codigo
                     };

        webService(values,'#retorno',inscricao);
    }
    
     /*global activate_page */
     //activate_page("#activitymain");
});

function inscricao(json){
    
    if(json.result == true){
        
        navigator.notification.alert("Inscrição enviada com sucesso!", null, "Aviso");
        
        if (checaWS()){
        var values = {'acao':'treinamentos', 
                      'Login':localStorage.getItem("login"),
                      'Senha':localStorage.getItem("senha"),
                      'FlagSenha':flagSenha,
                      'idUsuario':localStorage.getItem("idUsuario")
                     };
            
            webService(values,'#retorno',treinamentos);
        }
        
    }else{
        navigator.notification.alert("Erro ao enviar sua inscrição.", null, "Erro");
    }
    
}

//<a class="list-group-item allow-badge widget uib_w_103" data-uib="twitter%20bootstrap/list_item" data-ver="1" href="#" id="lvItemTreinamentos"><h4 class="list-group-item-heading">Curso 1</h4><p class="list-group-item-text text-listv"><strong>Palestrante: </strong>Carmem</p><p class="list-group-item-text text-listv"><strong>Inicio: </strong> 18/06</p><p class="list-group-item-text text-listv"><strong>Inscrições até: </strong></p></a>