function progressao(json){

    if(json.result === true){
        
        $(".erroProgressao").addClass("hidden");
        $("#page_86_14").removeClass("hidden");
        
        $(".textoCargoAtual").html(json.cargoAtual);

        $("#lvCargoAtual").html(" ");
        var requisitosAtuais = "";
        
        if (json.requisitoAtual != undefined) {
        
            for(var i=0; i < json.requisitoAtual.length; i++){
                requisitosAtuais += "<a class='list-group-item allow-badge widget uib_w_92' data-uib='twitter%20bootstrap/list_item' data-ver='1' href='#' id='lvItemCargoAtual'><p class='list-group-item-text'>"+ json.requisitoAtual[i].descricao +"</p></a>"
            }
        } else {
            requisitosAtuais = "<a class='list-group-item allow-badge widget uib_w_92' data-uib='twitter%20bootstrap/list_item' data-ver='1' href='#' id='lvItemCargoAtual'><p class='list-group-item-text'>Sem requisitos</p></a>"    
        }
            
            
        $("#lvCargoAtual").append(requisitosAtuais);
        requisitosAtuais = "";
        
        $(".textoCargoSup").html(json.cargoSuperior);
        
        $("#lvCargoSuperior").html(" ");
        
        var requisitosSup = "";
        var igual = 0;
        
        if (json.requisitoSuperior != undefined) {
        
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
            
        } else {
            requisitosSup = "<a class='list-group-item allow-badge widget uib_w_96' data-uib='twitter%20bootstrap/list_item' data-ver='1' href='#' id='lvItemCargoSuperior'>Sem requisitos</a>";
        }
            
            
        $("#lvCargoSuperior").append(requisitosSup);
        requisitosSup = "";
        
        if (json.porcentegem > 0) {
            $(".textoProgressoBar").html(json.porcentegem+"%");        
            $(".progressoBarProgressao").css('width', json.porcentegem+"%");            
            $("#pbProgresso").removeClass("hidden");
        } else {
            $("#pbProgresso").addClass("hidden");
        }

    }else{
        $("#page_86_14").addClass("hidden");
        $(".erroProgressao").removeClass("hidden");
    }
    
    activate_page("#progressao");
    
}