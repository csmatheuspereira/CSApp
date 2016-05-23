/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    var dispToken = "";
    
    // Funções que ocorrem ao abrir o app
    verificaConexao();
    definirTema();
    listaUsuariosLocais();

    if (!checaWS()) {
         navigator.notification.alert("Defina a URL de serviço", null, "Atenção");
         activate_page("#configuracoes");
     };             
     
     $(function() {

        var awayCallback = function() {              
            if (localStorage.getItem("login").length > 0) {
                 var values = {'acao':'logout','Login':localStorage.getItem("login"),'Senha':localStorage.getItem("senha"),'FlagSenha':flagSenha,'dispUUID':device.uuid};

                if (checaWS()) {
                    webService(values, "#retorno", logout);
                    $(".uib_w_39").modal("toggle");
                } else {
                    navigator.notification.alert("Defina a URL de serviço!", null, "Atenção");
                    activate_page("#configuracoes");
                }
            }
        };

        var idle = new Idle({
            onAway : awayCallback,
            awayTimeout :1800000 
        }).start();

        idle.setAwayTimeout(1800000);
    }); // Detectar inatividade do usuário e desconectá-lo em 30 minutos               
    
     
     
     
     if(device.platform.toLowerCase() == "android"){
        $("#loader").removeClass("hidden");
        var push = PushNotification.init({ 
            "android": {
                "senderID": "788790867910"
            },
            "ios": {
                "senderID": "788790867910", 
                "alert": "true", 
                "badge": "true", 
                "sound": "true",
                "ecb":"onNotificationAPNS",
                "gcmSandbox": "true"
            }, 
            "windows": {} 
        });
     

         push.on('registration', function(data) {
             //console.log(data.registrationId);
             //$("#gcm_id").html(data.registrationId);
             $("#loader").addClass("hidden");
             dispToken = data.registrationId;
            // navigator.notification.alert(dispToken);
         });

         push.on('notification', function(data) {
             console.log(data.message);
             alert(data.title+" Message: " +data.message);
             // data.title,
             // data.count,
             // data.sound,
             // data.image,
             // data.additionalData
         });

         push.on('error', function(e) {
             console.log(e.message);
         });

     } // Push GCM DON'T TOUCH THIS BEACH
     
     
     
     
     /* button  #btnNovo */
    $(document).on("click", "#btnNovoMainPage", function(evt)
    {        
        activate_page("#novousuario"); 
    });
    
        /* button  #btnVoltarNovoUsuario */
    $(document).on("click", "#btnVoltarNovoUsuario", function(evt)
    {
         listaUsuariosLocais();
        
         activate_page("#mainpage"); 
    });
    
        /* button  #btnLoginNovoUsuario */
    $(document).on("click", "#btnLoginNovoUsuario", function(evt)
    {
        var dispUUID = device.uuid;
        var dispNome = device.manufacturer +" "+ device.model;
        
        if (checaWS()) {
            
            var valuesCheca = [ $("#txtNomeNovoUsuario").val(), $("#txtSenhaNovoUsuario").val() ];
            
            localStorage.setItem("login", $("#txtNomeNovoUsuario").val());
            localStorage.setItem("senha", Cript($("#txtSenhaNovoUsuario").val()));
            
            var values = {'acao':'login','Login':localStorage.getItem("login"),'Senha':localStorage.getItem("senha"),'DispUUID':dispUUID,'DispNome':dispNome,'DispToken':dispToken,'dataClique':badgeNovasVagas()};

            if(!checaCampo(valuesCheca)){
                webService(values, "#retorno", login);
            } else {
                navigator.notification.alert("Digite valores corretos!", null, "Erro");
            }
        } else {
            navigator.notification.alert("Defina a URL de serviço!", null, "Atenção");
            activate_page("#configuracoes");
        }            
    });
        
        /* button  #btnConfigMainPage */
    $(document).on("click", "#btnConfigMainPage", function(evt)
    {                
        document.getElementById("txtURLConfiguracoes").value = localStorage.getItem("urlWS");
        localStorage.setItem("verificaUrlOnline", "S");
        activate_page("#configuracoes"); 
    });

        /* button  #btnVoltarConfiguracoes */
    $(document).on("click", "#btnVoltarConfiguracoes", function(evt)
    {
         /*global activate_page */
         activate_page("#mainpage");
    });
            
        /* button  #btnSalvarConfiguracoes */
    $(document).on("click", "#btnSalvarConfiguracoes", function(evt)
    {
        localStorage.setItem("urlWS", $("#txtURLConfiguracoes").val());
        activate_page("#mainpage");
    });              
    
        /* button  #btnLoginMainPage */
    $(document).on("click", "#btnLoginMainPage", function(evt)
    {
        var dispUUID = device.uuid;
        var dispNome = device.manufacturer +" "+ device.model;    
        
        if (checaWS()) {
            
            var cmbText = document.getElementById("cmbUsuarioMainPage");
            
            var valuesCheca = [ cmbText.options[cmbText.selectedIndex].text, $("#txtSenhaMainPage").val() ];
            
            localStorage.setItem("login", cmbText.options[cmbText.selectedIndex].text);
            localStorage.setItem("senha", Cript($("#txtSenhaMainPage").val()));
                        
            var values = {'acao':'login','Login':localStorage.getItem("login"),'Senha':localStorage.getItem("senha"),'DispUUID':dispUUID,'DispNome':dispNome,'DispToken':dispToken,'dataClique':badgeNovasVagas()};
                        
            if(!checaCampo(valuesCheca)){
                webService(values, "#retorno", loginMainPage);
            } else {
                navigator.notification.alert("Digite valores corretos!", null, "Erro");
            }
        } else {
            navigator.notification.alert("Defina a URL de serviço!", null, "Atenção");
            activate_page("#configuracoes");
        }         
    });
                 
    				       
        /* button  #btnLimparConfiguracoes */
    $(document).on("click", "#btnLimparConfiguracoes", function(evt)
    {
        
        
        
        navigator.notification.confirm("Você realmente deseja apagar todas informações deste dispositivo?", function(buttonID){
            
            if(buttonID == 1){
                localStorage.setItem("login", "");
                localStorage.setItem("senha", "");
                localStorage.setItem("idUsuario", "");
                localStorage.setItem("urlWS", "");

                //localStorage.setItem("indexUsr", 0);                

                dati.emptyTable("tblUsers",function(status){
                    listaUsuariosLocais();
                }); 
                localStorage.removeItem("temaAtual");
                localStorage.removeItem("temaAnterior");
                navigator.notification.alert("Dados apagados com sucesso!", null, "Sucesso");
            }            
        }, "Confirmação", ["Sim!", "Não!"]);
    });    
    
    
        /* button  #btnConfigActivityMain */
    $(document).on("click", "#btnConfigActivityMain", function(evt)
    {
         /*global activate_page */
         activate_page("#configGlobal"); 
    });
     
    
        /* button  #btnSairConfig */
    $(document).on("click", "#btnSairConfig", function(evt)
    {        
        var values = {'acao':'logout','Login':localStorage.getItem("login"),'Senha':localStorage.getItem("senha"),'FlagSenha':flagSenha,'dispUUID':device.uuid};

        if (checaWS()) {
            webService(values, "#retorno", logout);
        } else {
            navigator.notification.alert("Defina a URL de serviço!", null, "Atenção");
            activate_page("#configuracoes");
        }        
    });
     
    
        /* button  #btnVoltarConfig */
    $(document).on("click", "#btnVoltarConfig", function(evt)
    {
         /*global activate_page */
         activate_page("#activitymain"); 
    });
     
    
        /* button  #btnDispositivosConfig */
    $(document).on("click", "#btnDispositivosConfig", function(evt)
    {
        if (checaWS()){
        var values = {'acao':'configuracoes', 
                      'config':'dispositivos',
                      'Login':localStorage.getItem("login"),
                      'Senha':localStorage.getItem("senha"),
                      'FlagSenha':flagSenha,
                      'idUsuario':localStorage.getItem("idUsuario")
                     };
        webService(values,'#retorno',listaDispositivos);
        }
    });
     
    
        /* graphic button  #btnCargosActivityMain */
    $(document).on("click", "#btnCargosActivityMain", function(evt)
    {
        if (checaWS()){
            var values = {'acao':"cargo", 
                          'Login':localStorage.getItem("login"),
                          'Senha':localStorage.getItem("senha"),
                          'FlagSenha':flagSenha,
                          'idUsuario':localStorage.getItem("idUsuario")
                         };
            webService(values, "#retorno", chamaCargo);             
        } else {
            navigator.notification.alert("Defina a URL de serviço!", null, "Atenção");
            activate_page("#configuracoes");
        }
         

    });
     
    
        /* button  #btnVoltarCargo */
    $(document).on("click", "#btnVoltarCargo", function(evt)
    {
         /*global activate_page */
         activate_page("#activitymain"); 
    });
    
        /* button  #btnVoltarDispositivos */
    $(document).on("click", "#btnVoltarDispositivos", function(evt)
    {
         /*global activate_page */
         activate_page("#configGlobal"); 
    });
    
        /* button  #btnDeletaDisp */
    $(document).on("click", "#btnDeletaDisp", function(evt)
    {
        deletaItemDisp($(this).attr("codigo"));
    });
    
        /* button  #btnVoltarVagas */
    $(document).on("click", "#btnVoltarVagas", function(evt)
    {
         /*global activate_page */
         activate_page("#activitymain"); 
    });
    
        /* graphic button  #btnVagasActivityMain */
    $(document).on("click", "#btnVagasActivityMain", function(evt)
    {
        if (checaWS()){
        var values = {'acao':'vagas', 
                      'Login':localStorage.getItem("login"),
                      'Senha':localStorage.getItem("senha"),
                      'FlagSenha':flagSenha,
                      'idUsuario':localStorage.getItem("idUsuario")
                     };
            
        
            badgeNovasVagas(1);
            localStorage.setItem("cliqueVaga", 1);
            $(".badge-final").addClass("hidden");
            webService(values,'#retorno',listaVagas);
        }
    });
    
        /* listitem  #lvItemVaga */
    $(document).on("click", "#lvItemVaga", function(evt)
    {
        perfilVaga($(this).attr("data-codigo"));
    });
    
        /* button  #btnVoltarVaga */
    $(document).on("click", "#btnVoltarVaga", function(evt)
    {
        activate_page("#vagas");
    });
    
        /* button  #btnTemasConfig */
    $(document).on("click", "#btnTemasConfig", function(evt)
    {
         /*global activate_page */
         activate_page("#configTemas"); 
    });
    
        /* button  #btnVoltarTema */
    $(document).on("click", "#btnVoltarTema", function(evt)
    {
         /*global activate_page */
         activate_page("#configGlobal"); 
    });
     
    $(document).on("click", "#btnTentarNovamente", function(evt){
        verificaConexao();
    });
    
        /* graphic button  #btnProgressao */
    $(document).on("click", "#btnProgressao", function(evt)
    {
         /*global activate_page */
         activate_page("#progressao"); 
         return false;
    });
    
        /* button  #btnVoltarProgressao */
    $(document).on("click", "#btnVoltarProgressao", function(evt)
    {
         /*global activate_page */
         activate_page("#activitymain"); 
         return false;
    });
    
    }       
    document.addEventListener("app.Ready", register_event_handlers, false);
        
})();
