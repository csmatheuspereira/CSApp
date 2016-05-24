function progressao(json){
    
    if(json.result == true){
        
        $(".textoCargoAtual").html(json.cargoAtual);

        $("#lvCargoAtual").html(" ");
        var requisitosAtuais = "";
        for(var i=0; i < json.requisitoAtual.length; i++){
            requisitosAtuais += "<a class='list-group-item allow-badge widget uib_w_92' data-uib='twitter%20bootstrap/list_item' data-ver='1' href='#' id='lvItemCargoAtual'><p class='list-group-item-text'>"+ json.requisitoAtual[i].descricao +"</p></a>"
        }
        $("#lvCargoAtual").append(requisitosAtuais);
        requisitosAtuais = "";
        
        $(".textoCargoSup").html(json.cargoSuperior);
        
        $("#lvCargoSuperior").html(" ");
        
        var requisitosSup = "";
        var igual = 0;
        for(var i=0; i < json.requisitoSuperior.length; i++){
            
            for(var j=0; j < json.requisitoAtual.length; j++){
                if(json.requisitoAtual[j].codigo == json.requisitoSuperior[i].codigo){
                    igual = json.requisitoAtual[j].codigo;
                    break;
                };
            }
            
            if(json.requisitoSuperior[i].codigo == igual){
                requisitosSup += "<a class='list-group-item allow-badge widget uib_w_96 list-group-item-success' data-uib='twitter%20bootstrap/list_item' data-ver='1' href='#' id='lvItemCargoSuperior'><i class='glyphicon glyphicon-ok'></i> "+ json.requisitoSuperior[i].descricao +"</a>";
            }else{
                 requisitosSup += "<a class='list-group-item allow-badge widget uib_w_96' data-uib='twitter%20bootstrap/list_item' data-ver='1' href='#' id='lvItemCargoSuperior'>"+ json.requisitoSuperior[i].descricao +"</a>";
            }
            
        }
        $("#lvCargoSuperior").append(requisitosSup);
        requisitosSup = "";
        
        $(".textoProgressoBar").html(json.porcentegem+"%");
        $(".progressoBarProgressao").css('width', json.porcentegem+"%");

    }else{
       $("#page_86_14").html(" ");
        
        var nadaEncontrado = "<div class='upage-content ac0 content-area vertical-col left'><div class='alert no_wrap widget uib_w_56 d-margins alert-warning' data-uib='twitter%20bootstrap/alert' data-ver='1' style='margin-top:60px;'><i class='glyphicon glyphicon-warning-sign'></i> Você não possui um cargo associado ao seu usuário.</div></div>"
        
        $("#page_86_14").append(nadaEncontrado);
        nadaEncontrado = "";
        
    }
    
    activate_page("#progressao");
    
}