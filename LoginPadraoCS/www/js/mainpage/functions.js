function listaUsuariosLocais() {
    $('#cmbUsuarioMainPage option[value!="0"]').remove();
    dati.selectAll("tblUsers", function(registros) {
        
        $.each(registros, function(c, usuarios){
            
            $('#cmbUsuarioMainPage').append($('<option>', {
                value: usuarios.ID,
                text: usuarios.NOME
            }));
            
        })                
    })
}

function loginMainPage(json){
    
    if (json.result==true) {
        $("#txtSenhaMainPage").val("");
        
        localStorage.setItem("idUsuario", json.ID);
        
        if(json.autoLogout == "-1" || json.autoLogout == null || json.autoLogout == undefined){
            navigator.notification.confirm("Você deseja que este dispositivo desconecte-se automaticamente após 30 minutos de inatividade?", function(buttonID){
                
                if(buttonID == 1){
                    
                    var values = {'acao':'configuracoes','config':'autoLogout','Login':localStorage.getItem("login"),'Senha':localStorage.getItem("senha"),'FlagSenha':flagSenha,'dispUUID':device.uuid,'autoLogout':1};
                    webService(values, '#retorno', autoLogout);
                    
                    localStorage.setItem("toggleManterConfigGlobal", true);
                    
                }else{
                    
                    var values = {'acao':'configuracoes','config':'autoLogout','Login':localStorage.getItem("login"),'Senha':localStorage.getItem("senha"),'FlagSenha':flagSenha,'dispUUID':device.uuid,'autoLogout':0};
                    
                    webService(values, '#retorno', autoLogout);
                    
                    localStorage.setItem("toggleManterConfigGlobal", false);                    
                }
                
            }, "Atenção", ["Sim", "Não"]);
        }
        
        if(json.SENHACRIPTO != "-1"){
            localStorage.setItem("senha", json.SENHACRIPTO);
            flagSenha = "S";
        }else{
            flagSenha = "N";
        }
        
        localStorage.setItem('cliente', json.cliente);
        
        //navigator.notification.alert(json.nomeUsuario);
        
        if(json.nomeUsuario != "err_no_name"){
           //panielNome
            $("#textoPainel").html("<center><h3 style='margin-bottom: -20px !important;'><strong>Bem-vindo</h3></strong><br /><h4>"+json.nomeUsuario + "</h4></center>");
        }else{
            $("#textoPainel").html("<center><h3 style='margin-bottom: -20px !important;'><strong>Bem-vindo</strong></h3><br /></center>");
        }
        
        badge(json.qtde, ".badVagas", localStorage.getItem("cliqueVaga"));
        selecionaLogo(localStorage.getItem('cliente'));
        
        activate_page("#activitymain");        
    } else {
        if(json.msg == null){
            navigator.notification.alert("Usuário ou senha incorreto(s) ou usuário não cadastrado no aplicativo.");
        }else{
            navigator.notification.alert(json.msg);
        }
    }
    
}

$(document).on("change", "#cmbUsuarioMainPage", function() {
   
    $("#txtSenhaMainPage").val("");
    
});

function logout(json){
    if (json.result == true) {
        
        localStorage.setItem("idUsuario", "");
        localStorage.setItem("login", "");
        localStorage.setItem("senha",  "");
        
        listaUsuariosLocais();
        
        activate_page("#mainpage");
    }else{
        navigator.notification.alert("Falha ao desconectá-lo.");
    };
}

function autoLogout(json){
    
    if(json.result == false){
       
        alert("Erro ao salvar sua preferência.");        
    }
    
}
    
