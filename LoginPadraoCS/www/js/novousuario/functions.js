function login(json){
    
    if (json.result==true) {
                               
        dati.query("SELECT count(NOME) QTDE FROM tblUsers WHERE NOME='" + $("#txtNomeNovoUsuario").val() + "'", function(registros){
            conta=registros.rows.item(0).QTDE;
            
            if (conta <= 0) {
                // Usuário não existe. Cadastra no BD local
                var registro = { "NOME": $("#txtNomeNovoUsuario").val() }

                dati.insert("tblUsers", registro, function(ID){
                    //navigator.notification.alert("Cadastrado");
                });
            }
        });
        
            
        /*
        // Pega os textos do comboBox e coloca na array cmbUsuario
        var cmbUsuario = $("#cmbUsuarioMainPage option").map(function() {
                 return $(this).text();
              }).get();
        
        
        // Verifica se existe usuários já cadastrados
        if (cmbUsuario.length > 0){
            var final = (cmbUsuario.length - 1);
        }else{
            var final = 0;
        }
            
        
        // Verifica se já existe o usuário no combo
        for (var i = 0; i <= final; i++){
            if (cmbUsuario[i] == $("#txtNomeNovoUsuario").val())
                {                                                            
                    break;
                    // Aqui o usuário já existe. Sai do for e chama a próxima tela
                } else {
                    // Usuário não existe. Cadastra no BD local
                    var registro = { "NOME": $("#txtNomeNovoUsuario").val() }
                    
                    dati.insert("tblUsers", registro, function(ID){
                        //navigator.notification.alert("Cadastrado");
                    });
                    
                    break;
                }
        }
        
        */ //Antiga função de registrar usuário inexistente
        
        
        $("#txtSenhaNovoUsuario").val("");
        
        localStorage.setItem("idUsuario", json.ID);
        
        if(json.SENHACRIPTO != "-1"){
            localStorage.setItem("senha", json.SENHACRIPTO);
            flagSenha = "S";
        }
        
        localStorage.setItem('cliente', json.cliente);
        
        badge(json.qtde, ".badVagas", localStorage.getItem("cliqueVaga"));
        selecionaLogo(localStorage.getItem('cliente'));
        
        activate_page("#activitymain");
        
    } else {
        navigator.notification.alert("Usuário ou senha incorreto(s) ou usuário não cadastrado no aplicativo.");
    }
    
}