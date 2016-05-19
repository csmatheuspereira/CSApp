function definirTema(){
    
    if(localStorage.getItem("temaAtual") === null && localStorage.getItem("temaAnterior") === null){
        localStorage.setItem("temaAtual", "vermelho");
        $(".header-bg").addClass(localStorage.getItem("temaAtual"));
        $(".btn-primary").addClass(localStorage.getItem("temaAtual"));
        $("."+selecionaCheck(localStorage.getItem("temaAtual"))).removeClass("hidden");
        selecionaFundos(localStorage.getItem("temaAtual"));
    }else{
        $(".header-bg").addClass(localStorage.getItem("temaAtual"));

        $(".btn-primary").addClass(localStorage.getItem("temaAtual"));
        
        $("."+selecionaCheck(localStorage.getItem("temaAtual"))).removeClass("hidden");
        selecionaFundos(localStorage.getItem("temaAtual"));
    }
    
    
    
}

$(document).on("click", ".btnTemaCores", function(evt)
    {
        if(localStorage.getItem("temaAnterior") === null){
            $("."+selecionaCheck(this.id)).removeClass("hidden");
            localStorage.setItem("temaAtual", this.id);
            localStorage.setItem("temaAnterior", this.id);
        }else{
            if(this.id != localStorage.getItem("temaAnterior")){
                $("."+selecionaCheck(this.id)).removeClass("hidden");
                $("."+selecionaCheck(localStorage.getItem("temaAnterior"))).addClass("hidden");

                //header-bg btn-primary

                $(".header-bg").addClass(this.id);
                $(".header-bg").removeClass(localStorage.getItem("temaAnterior"));

                $(".btn-primary").addClass(this.id);
                $(".btn-primary").removeClass(localStorage.getItem("temaAnterior"));


                localStorage.setItem("temaAtual", this.id);
                localStorage.setItem("temaAnterior", this.id);
                selecionaFundos(localStorage.getItem("temaAtual"));
            }
        }
    });

function selecionaCheck(id){
    
    if(id == "vermelho"){
        return "vermc";
    }else if(id == "verde"){
        return "verdc";
    }else if(id == "azul"){
        return "azulc";
    }else if(id == "laranja"){
        return "larac";
    }else if(id == "roxo"){
        return "roxoc";
    }else if(id == "cinza"){
        return "cinzc";
    }else if(id == "escuro"){
        return "escuc";
    };
    
}

function selecionaFundos(id){
    
    if(id == "vermelho"){
        $('h3').css('color', 'rgb(0, 0, 0)');
        document.body.style.backgroundColor = "rgb(255, 255, 255)";
    }else if(id == "verde"){
        $('h3').css('color', 'rgb(0, 0, 0)');
        document.body.style.backgroundColor = "rgb(255, 255, 255)";
    }else if(id == "azul"){
        $('h3').css('color', 'rgb(0, 0, 0)');
        document.body.style.backgroundColor = "rgb(255, 255, 255)";
    }else if(id == "laranja"){
        $('h3').css('color', 'rgb(0, 0, 0)');
        document.body.style.backgroundColor = "rgb(255, 255, 255)";
    }else if(id == "roxo"){
        $('h3').css('color', 'rgb(0, 0, 0)');
        document.body.style.backgroundColor = "rgb(255, 255, 255)";
    }else if(id == "cinza"){
        $('h3').css('color', 'rgb(0, 0, 0)');
        document.body.style.backgroundColor = "rgb(255, 255, 255)";
    }else if(id == "escuro"){
        $('h3').css('color', 'rgb(255, 255, 255)');
        document.body.style.backgroundColor = "rgb(51, 51, 51)";
    };
    
}