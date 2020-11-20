var http = require('http')
var axios = require('axios')
var fs = require('fs')
var ghtml = require('./sgenerate')
var static = require('./static')
var { parse } = require('querystring')




// retira os valores do form e transforma num objeto json
function recuperaInfo(request, d, callback) {
    if (request.headers['content-type'] == 'application/x-www-form-urlencoded') {
        let body = "id=" + d + "&"


        request.on('data', bloco => {
            body += bloco.toString()
        })
        console.log("atao" + body + "\n")
        request.on('end', () => {
            console.log(body)
            callback(parse(body))
        })
    }
}

// Template para a página  ------------------
function returnPag(res, d) {
    axios.get("http://localhost:3000/todo?_sort=donein,begindate&_order=desc,desc")
        .then(todo => {



            axios.get("http://localhost:3000/done?_sort=donein,begindate&_order=desc,desc")
                .then(done => {



                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write(ghtml.geraPag(todo.data, done.data, d))
                    res.end()
                })
                .catch(function (erro) {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write("<p>Não foi possível obter a lista done...")
                    res.end()
                })

        })
        .catch(function (erro) {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
            res.write("<p>Não foi possível obter a lista todo...")
            res.end()
        })
}




var taskServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 19)
    console.log(req.method + " " + req.url + " " + d)


    if (static.recursoEstatico(req)) {
        static.sirvoRecursoEstatico(req, res)
    }

    else {

        // Tratamento do pedido
        switch (req.method) {
            case "GET":
                // GET / --------------------------------------------------------------------
                if ((req.url == "/")) {
                    returnPag(res, d)
                }
                else if (/\/[0-9]{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])T([0-1][0-9]|2[0-4]):([0-5][0-9]|60):([0-5][0-9]|60)\/do/.test(req.url)) {

                    var id = req.url.split("/")[1]

                    axios.get("http://localhost:3000/todo/" + id)
                        .then(response => {
                            let registo = response.data
                            registo.donein=d
                            

                            axios.delete("http://localhost:3000/todo/" + id)
                                .then(response => {




                                    axios.post('http://localhost:3000/done', registo)
                                        .then(resp => {
                                            returnPag(res, d)
                                        })
                                        .catch(erro => {
                                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                            res.write('<p>Erro no post na alteracao para feito: ' + erro + '</p>')
                                            res.write('<p><a href="/">Voltar</a></p>')
                                            res.end()
                                        })
                                })
                                .catch(erro => {
                                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                    res.write('<p>Erro no delete da tarefa por fazer: ' + erro + '</p>')
                                    res.write('<p><a href="/">Voltar</a></p>')
                                    res.end()
                                })
                        })
                        .catch(function (erro) {
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write("<p>Não foi possível obter o registo ...")
                            res.end()
                        })


                }
                else if (/\/[0-9]{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])T([0-1][0-9]|2[0-4]):([0-5][0-9]|60):([0-5][0-9]|60)\/delete/.test(req.url)) {
                  
                    var id = req.url.split("/")[1]
                    axios.delete("http://localhost:3000/done/" + id)
                        .then(response => {
                            returnPag(res, d)
                        })
                        .catch(erro => {
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                            res.write('<p>Erro no delete já realizada: ' + erro + '</p>')
                            res.write('<p><a href="/">Voltar</a></p>')
                            res.end()
                        })
                }

                else {
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write("<p>" + req.method + " não suportado neste serviço.</p>")
                    res.end()
                    break;
                }




                break;

            case "POST":

                if (req.url == '/form') {


                    recuperaInfo(req, d, resultado => {
                        console.log('POST de aluno:' + JSON.stringify(resultado))
                        resultado.donein=d
                        axios.post('http://localhost:3000/todo', resultado)
                            .then(resp => {
                                returnPag(res, d)
                            })
                            .catch(erro => {
                                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                                res.write('<p>Erro no POST: ' + erro + '</p>')
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.end()
                            })
                    })
                }
                break;


            default:
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                res.write("<p>" + req.method + " não suportado neste serviço.</p>")
                res.end()
                break;
        }
    }
})

taskServer.listen(9999)
console.log('Servidor à escuta na porta 9999...')