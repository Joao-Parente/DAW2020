var http = require('http')
var fs = require('fs')
var aux = require('./mymod.js')

console.log("Servidor ligado para pedidos na porta 7777")
http.createServer(function (req, res) {
    console.log(req.method + " " + req.url + " " + aux.myDateTime())

    if (req.url.match(/.*\/(index|([1-9]|[1-9][0-9]|10[0-9]|11[0-9]|12[0-2])).html$/)) {
        var url_sep = req.url.split(/(\/|\.)/)
        var num=[]
        num= url_sep[url_sep.length - 3]
        console.log("requested " +'../site/'+num+'.html')
        fs.readFile('../site/' + num + '.html', function (err, data) {
            res.writeHead(200, { 'Context-Type': 'text/html' })
            res.write(data)
            res.end()
        })
    }
    else {
        res.writeHead(200, { 'Context-Type': 'text/html' })
        res.write("<h2><p>O url nao corresponde ao esperado</p> <p>tente por exemplo <a href=\"http://localhost:7777/index.html\"<u>localhost:7777/index.html</u></a></h2>")
        res.end()
    }


}).listen(7777);

