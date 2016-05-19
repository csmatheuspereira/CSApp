function chamaCargo(json){
    
    if (json.result == true){
        
        $("#pnMainCargo").html(" ");
        
        var cargos = json.cargo;
        var cargosDec = $("<div/>").html(cargos).text();
                        
        
        if (cargosDec.length > 0){
            $("#pnMainCargo").append(cargosDec);        
                  
        } else {            
            $("#pnMainCargo").append("<div class='alert no_wrap widget uib_w_56 d-margins alert-warning' data-uib='twitter%20bootstrap/alert' data-ver='1'><i class='glyphicon glyphicon-warning-sign'></i> Você não possui um cargo associado ao seu usuário.</div>");               
        }
        
        activate_page("#cargo");

    }
    else {
        navigator.notification.alert("Erro na requisição, verifique sua internet e tente novamente. Se o problema persistir contate o suporte.");
    }
    
    
    
}