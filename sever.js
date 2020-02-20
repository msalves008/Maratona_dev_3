const express =  require("express")
const server =  express()

//configuando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./",{
    express: server,
    noCache: true,    
})

//lista de doadores
const donors = [

    {
        name: "Kaio Viana",
        blood: "AB+"
    },
    {
        name: "Matheus de Sousa",
        blood: "O-"
    },
    {
        name: "Sergio Calura",
        blood:"A+"
    },
    {
        name:"Fernando Henrique",
        blood:"O+"
    }
]

//CONFIGURANDO ARQUIVOS EXTRAS (Estaticos)
//Ex: CSS: JS : logo
server.use(express.static('public'))

//chando index.html
server.get("/", function(req, res){
    return res.render("index.html",{donors})
})






 //iniciando o servidor na porta 3000
server.listen(3000, function(){
    console.log("SERVER OK")
})
