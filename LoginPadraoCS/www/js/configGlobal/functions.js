$(function() {
    var alValue;
    
    $('#toggleManterConfigGlobal').change(function() {
        localStorage.setItem("toggleManterConfigGlobal", $(this).prop('checked'));
        if ($(this).prop('checked')) {
            // Deve desconctar
            
            alValue = 1;
            
            $("#hintToggleConfigGlobal").removeClass("hidden");
        } else {
            $("#hintToggleConfigGlobal").addClass("hidden");    
            
            alValue = 0;
        }
        
        var values = {'acao':'configuracoes','config':'autoLogout','Login':localStorage.getItem("login"),'Senha':localStorage.getItem("senha"),'FlagSenha':flagSenha,'dispUUID':device.uuid,'autoLogout':alValue};

        webService(values, '#retorno', autoLogout);
        
        
    })
  })
