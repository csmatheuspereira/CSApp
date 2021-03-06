var urlWS = "";
var flagSenha = "N";
var err_conn_unset = "Defina URL de acesso.";

// Descobrir qual a origem do sobre
var sobreSender;


if (localStorage.getItem("verificaUrlOnline") === null) {
    localStorage.setItem("verificaUrlOnline", "S");
}

function checaWS(){
    
    if (localStorage.getItem("urlWS") === null) {
        localStorage.setItem("urlWS", "");
        urlWS = "";    
        return false;
    } else {
    
        if (localStorage.getItem("urlWS").length > 0) {
            urlWS = localStorage.getItem("urlWS");
            return true;            
        } else {
            localStorage.setItem("urlWS", "");
            urlWS = "";
            return false;
        }
    }
}

function webService(values, status, callback){
    if(verificaConexao(true) && checkOnline(urlWS)){    
        var sucesso;
        
        var conn = $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: urlWS,
                        data: values,
                        success: function(json) {
                            callback(json);
                        },
                        beforeSend: function() {
                            $("#loader").removeClass("hidden");                                           
                            
                            sucesso = false;
                            
                            setTimeout(function(){
                                if (!sucesso) {
                                    $("#loader").addClass("hidden");
                                    navigator.notification.alert("O tempo da requisição expirou, tente novamente. Se o problema persistir entre em contato com o suporte.", null,"Erro");
                                    conn.abort();                                
                                }
                            }, 20000);
                        }
                    })
                    .done(function() {
                        $("#loader").addClass("hidden");
                        sucesso = true;
                    })
                    .fail(function(jqXHR, textStatus) {
                        // Neste caso, sucesso recebe verdadeiro pois o método Fail trata seu próprio erro
                        sucesso = true;
                        
                        $("#loader").addClass("hidden");
                        
                        if (textStatus != "abort") {
                            navigator.notification.alert("Ocorreu um erro desconhecido. Mensagem de erro: " + textStatus + ". Informe este erro ao suporte.", null,"Erro");       
                        }
                    });                
    }    
}


function checkOnline(url){
    if(localStorage.getItem("verificaUrlOnline") == "S"){        
        var http = new XMLHttpRequest();
        
        setTimeout(function(){
            if (resultado == undefined) {
                $("#loader").addClass("hidden");
                
                navigator.notification.alert("A URL de Serviço não pôde ser contactada, tente novamente mais tarde. Se o problema persistir entre em contato com o suporte.", null,"Erro");
                
                http.abort();
                
                return false;
            }
        }, 20000);
        
        http.open('HEAD', url, false);
        http.send();
        var resultado = http.status != 404;

        if(resultado){
            $("#loader").addClass("hidden");
            localStorage.setItem("verificaUrlOnline", "N");
            return true;
        }else{
            $("#loader").addClass("hidden");
            navigator.notification.alert("A URL de Serviço não pôde ser contactada ou foi selecionada incorretamente.", null,"Erro");            
            activate_page("#configuracoes");
            return false;
        }
        
    }else{
        return true;
    }
    
}


function verificaConexao(ws){
    if (ws == undefined) { ws = false;}
    
    if (ws) { $("#loader").removeClass("hidden"); }
    
    if(navigator.connection.type == "none")
    {
       $('#internet').removeClass('hidden');
        return false;
    }else{
        $('#internet').addClass('hidden');
        return true;
    }
};



function checaCampo(values) {

    var erro = false;

    for (var i = 0; i <= values.length -1; i++) {

        if (values[i] == undefined || values[i] == "") {
            i = (values.length + 1);
            erro = true;
        }
    }

    return erro;

}

function dump(obj) {
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }

    navigator.notification.alert(out);
    //alert(out);
}

function Cript(dados){

    var chave = 487;
    var addTexto = "7NSgN7UGiU5pGae6ovO5TCk9LlEA087hKezQ";

    var word = dados;
    word += addTexto;
    var s = (word.length+1);
    var nw = "";
    var n = chave;
    var nindex,m;

    for (var x = 1; x < s; x++){
        m = x*n;
        if (m > s){
            nindex = m % s;
        }
        else if (m < s){
            nindex = m;
        }
        if (m % s == 0){
            nindex = x;
        }
        nw = nw+word[nindex-1];
    }
    return nw;
}


// Controla qualquer badge que precise no aplicativo

// Parametro quantidade(1): quantidade recebida do JSON, serve tambem para comparasao.
// Parametro objeto(2): deve ser passado o ID ou CLASSSE do objeto que sera inserido o numero

// Modo de uso:
//  badge(variavelDeEntradaJSON, ".classeDoObjeto"); Exemplo com CLASSE do objeto
//  badge(variavelDeEntradaJSON, "#idDoObjeto"); Exemplo com ID do objeto

function badge(quantidade,objeto,clique){
    
    if(quantidade > 0 && quantidade < 100 && clique == "0"){
        $(objeto).removeClass("hidden");
        $(objeto).html(" ");
        $(objeto).html(quantidade);
    }else if(quantidade > 99 && clique == "0"){
        $(objeto).removeClass("hidden");
        $(objeto).html(" ");
        $(objeto).html("+99");
    }else{
        $(objeto).addClass("hidden");
    }
    
}

function geraData(separador,posicao){
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    
    var seconds = today.getSeconds();
    var minutes = today.getMinutes();
    var hour = today.getHours();
    
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    }
    
    if(posicao == 1){
        today = dd+separador+mm+separador+yyyy;
    }else if(posicao == 2){
        today = yyyy+separador+mm+separador+dd;
    }else if(posicao == 3){
        today = dd+separador+mm+separador+yyyy+" "+hour+":"+minutes+":"+seconds;
    }
    
    return today;
    
}

function selecionaLogo(cliente){
    
    if(cliente == "ARALCO"){
        $('.customLogo').attr('src', 'interface/Logo/aralco.png');
    }else{
        $('.customLogo').attr('src', 'interface/Logo.png');
    }
    
}

(function (window, $) {

$(function() {


  $('.ripple').on('click', function (event) {
    event.preventDefault();

    var $div = $('<div/>'),
        btnOffset = $(this).offset(),
        xPos = event.pageX - btnOffset.left,
        yPos = event.pageY - btnOffset.top;


    $div.addClass('ripple-effect');
    var $ripple = $(".ripple-effect");

    $ripple.css("height", $(this).height());
    $ripple.css("width", $(this).height());
    $div
      .css({
        top: yPos - ($ripple.height()/2),
        left: xPos - ($ripple.width()/2),
        background: $(this).data("ripple-color")
      })
      .appendTo($(this));

    window.setTimeout(function(){
      $div.remove();
    }, 2000);
  });

});

})(window, jQuery);


function sair(){    
    
    if (window.location.hash == "#mainpage" || window.location.hash == "##mainsub"){
        navigator.notification.confirm("Deseja sair do aplicativo?", function(buttonID){
            
            if(buttonID == 1){
                if(device.platform.toLowerCase() == "android") { navigator.app.exitApp(); }
            }            
        }, "Confirmação", ["Sim", "Não"]);        
        
    } else if (window.location.hash == "#activitymain") {
        navigator.notification.confirm("Deseja desconectar-se do aplicativo?", function(buttonID){
            
            if(buttonID == 1){
                var values = {'acao':'logout','Login':localStorage.getItem("login"),'Senha':localStorage.getItem("senha"),'FlagSenha':flagSenha,'dispUUID':device.uuid};

                if (checaWS()) {
                    webService(values, "#retorno", logout);
                } else {
                    navigator.notification.alert(err_conn_unset, null, "Atenção");
                    activate_page("#configuracoes");
                }                
            }            
        }, "Confirmação", ["Sim", "Não"]);                
    
    } else if (window.location.hash == "#cargo" || window.location.hash == "#vagas" || window.location.hash == "#configGlobal" || window.location.hash == "#progressao" || window.location.hash == "#treinamentos" ){
        activate_page("#activitymain");
    
    } else if (window.location.hash == "#vaga"){
        activate_page("#vagas");                
    
    } else if (window.location.hash == "#dispositivos" || window.location.hash == "#configTemas"){
        activate_page("#configGlobal");
    
    } else if (window.location.hash == "#configuracoes" || window.location.hash == "#novousuario"){
        activate_page("#mainpage");    
    
    } else if (window.location.hash == "#sobre") {
        
        if(sobreSender == "logado"){
         activate_page("#configGlobal");
        }else if(sobreSender == "semLogin"){
         activate_page("#configuracoes"); 
        }
        
    } else if (window.location.hash == "#treinamento") {
        activate_page("#treinamentos");    
    }
    
    
}

function autoLogin(){
    if (localStorage.getItem("toggleManterConfigGlobal") == "true" &&
        localStorage.getItem("login") != null &&
        localStorage.getItem("senha") != null) {

        var dispUUID = device.uuid;
        var dispNome = device.manufacturer +" "+ device.model;    
        var dispToken = "";
        
        var values = {'acao':'login','Login':localStorage.getItem("login"),'Senha':localStorage.getItem("senha"),'DispUUID':dispUUID,'DispNome':dispNome,'DispToken':dispToken,'dataClique':badgeNovasVagas()};
                        
        webService(values, "#retorno", loginMainPage);            
    }
}

/* POR FAVOR NÂO MUDE NADA AQUI ********* MANTENHA DISTANCI DESSE TRECHO DE CÓDIGO */
/* MATHEUS MARQUES, SÁBADO 04 de JUNHO de 2016 */
function moeda(n, c, d, t)
{
    c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}
/* POR FAVOR NÂO MUDE NADA AQUI ********* MANTENHA DISTANCI DESSE TRECHO DE CÓDIGO */

function titleize(text) {
    var words = text.toLowerCase().split(" ");
    for (var a = 0; a < words.length; a++) {
        var w = words[a];
        words[a] = w[0].toUpperCase() + w.slice(1);
    }
    return words.join(" ");
}