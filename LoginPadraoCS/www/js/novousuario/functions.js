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

        $("#txtSenhaNovoUsuario").val("");
        
        localStorage.setItem("idUsuario", json.ID);
        
        if(json.SENHACRIPTO != "-1"){
            localStorage.setItem("senha", json.SENHACRIPTO);
            flagSenha = "S";
        }else{
            flagSenha = "N";
        }
        
        localStorage.setItem('cliente', json.cliente);
        
        if(json.nomeUsuario != "err_no_name"){
           //panielNome
            $("#textoPainel").html("Bem-vindo<br />"+titleize(json.nomeUsuario));
        }else{
            $("#textoPainel").html("Bem-vindo");
        }
        
        badge(json.qtde, ".badVagas", localStorage.getItem("cliqueVaga"));
        selecionaLogo(localStorage.getItem('cliente'));
        
        activate_page("#activitymain");
        
    } else {
        navigator.notification.alert("Usuário ou senha incorreto(s) ou usuário não cadastrado no aplicativo.");
    }
    
}