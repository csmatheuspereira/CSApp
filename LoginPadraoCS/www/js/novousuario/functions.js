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
             $("#textoPainel").html("<center><h3 style='margin-bottom: -20px !important;'><strong>Bem-vindo</h3></strong><br /><h4>"+titleize(json.nomeUsuario) + "</h4></center>");
        }else{
            $("#textoPainel").html("<center><h3 style='margin-bottom: -20px !important;'><strong>Bem-vindo</strong></h3><br /></center>");
        }
        
        badge(json.qtde, ".badVagas", localStorage.getItem("cliqueVaga"));
        selecionaLogo(localStorage.getItem('cliente'));
        
        activate_page("#activitymain");
        
    } else {
        navigator.notification.alert("Usuário ou senha incorreto(s) ou usuário não cadastrado no aplicativo.");
    }
    
}