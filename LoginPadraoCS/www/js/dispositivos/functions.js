function listaDispositivos(dispositivo){
    $("#lvDispositivos").html(" ");
    if(Object.keys(dispositivo).length > 0){
        for(var i=0; i < Object.keys(dispositivo).length; i++){
            
            var data = "";
            var botaoDeleta = "";
            if(device.uuid == dispositivo[i].uuid){
                data = "Último Acesso: " + dispositivo[i].data  +"<div style='margin-left:30px;'> Este dispositivo</div> ";
            }
            else{
                data = "Último Acesso: " + dispositivo[i].data; 
                botaoDeleta = "<button class='btn widget uib_w_60 d-margins btn-link btnDeletaDispStyleCustom' data-uib='twitter%20bootstrap/button' data-ver='1' id='btnDeletaDisp' codigo='"+ i + "'><i class='glyphicon glyphicon-remove' data-position='icon only'></i> </button>";
            }
            
            var src = "";
            if(dispositivo[i].nome.slice(0,5) === "Apple"){
                src = "interface/UI/dispositivos/apple/ic_apple_hdpi.png";
            }else
                if(dispositivo[i].nome.slice(0,5) === "Nokia" || dispositivo[i].nome.slice(0,9) === "Microsoft"){
                    src = "interface/UI/dispositivos/windows/ic_windows_hdpi.png";
                }else{
                    src="interface/UI/dispositivos/android/ic_android_hdpi.png";
                }
                
            
            var itemDisp = " <a class='list-group-item allow-badge widget uib_w_70' data-uib='twitter%20bootstrap/list_item' data-ver='1' id='lvItemDisp' codigo='"+ i + "' > <img src='"+ src +"' class='img-device'> <h4 class='list-group-item-heading text-listv'> "+ dispositivo[i].nome +" "+ botaoDeleta+" </h4> <p class='list-group-item-text text-listv' align='left'> " + data + " </p> </a>";
            
            $("#lvDispositivos").append(itemDisp);
        }
        $(".uib_w_59").remove();
        activate_page("#dispositivos");
        
    }else{
        navigator.notification.alert("Erro na requisição, verifique sua internet e tente novamente. Se o problema persistir contate o suporte.");
    }
}

function deletaItemDisp(codigo){
    $("[codigo="+codigo+"]").remove();
}



  