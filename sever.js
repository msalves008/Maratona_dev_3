const express = require("express")
const server = express()

//configuando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./",{
    express: server,
    noCache: true,    
})

/*momento video 01:43*/

//CONFIGURANDO ARQUIVOS EXTRAS (Estaticos)
//Ex: CSS: JS : logo
server.use(express.static('public'))

//habilitar body do formulario
server.use(express.urlencoded({ extended: true}))

//configurando conexão com o banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: '1498',
    host: 'localhost',
    port: 5432,
    database: 'doe'
})

//chamando index.html
server.get("/", function(req, res){
    db.query("SELECT * FROM donors", function(err, result){
        if(err) return res.send("Erro de banco de dados")
        const donors = result.rows
        return res.render("index.html",{donors})

    })
})

 //pegando dados do formulário
 server.post("/", function(req, res){
   
    const name = req.body.name
const blood = req.body.blood    
const email = req.body.email
    

    //verificando se os campos foram preenchidos
    if(name == "" || email == "" || blood == ""){
        return res.send("Por favor!\n Preencha Todos Os Campos")
    }

    //colocando valores dentro do banco de dados
    
    const query = `INSERT INTO donors ("name","email","blood") VALUES ($1, $2, $3);`   
    /*const query = 'INSERT INTO donors ("name","email","blood") VALUES (name,email, blood);'*/     

    const valores = [name, email, blood]
    
    db.query(query, valores, function(err){
        //caso der erro
        if(err) {
            return res.send("Erro no Banco de Dados." + query)
        }
        //se estiver ok
        else{
            return res.redirect("/")   
        }

    })

})


//iniciando o servidor na porta 3000
server.listen(3000, function(){
    console.log("SERVER OK")
})
