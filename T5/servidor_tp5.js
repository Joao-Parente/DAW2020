
const axios=require('axios');
const { Console } = require('console');
const { write } = require('fs');
var http = require('http')
var aux = require('./mymod.js')

http.createServer(function (req, res) {
    console.log(req.method + " " + req.url + " " + aux.myDateTime())

    if (req.method == 'GET') {

        if (req.url == '/') {
            res.writeHead(200, { 'Context-Type': 'text/html;charset=utf-8' })
            res.write('<h2>Escola de Musica<h2>');
            res.write('<ul>')
            res.write("<li><a href='/alunos'>Lista de Alunos</a></li>")
            res.write("<li><a href='/cursos'>Lista de Cursos</a></li>")
            res.write("<li><a href='/instrumentos'>Lista de Instrumentos</a></li>")
            res.write('</ul>')
            res.end()
        }
        else if (req.url == "/alunos") {


            axios.get('http://localhost:3001/alunos')
                .then(resp => {
                    alunos = resp.data; 

                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write('<h2>Lista de Alunos</h2>');
                    res.write('<ul>')
                    alunos.forEach(a => {
                      
                        res.write("<li><a href='/alunos/"+a.id +"'>" +a.id+ ' - '+ a.nome +'</a></li>')

                    })
                    res.write('</ul>')
                    res.write("<address>[<a href='/'> Voltar</a> ]</address>")
                    res.end()
                })
                .catch(function (error) {
                    console.log('Erro na obtenção da lista de alunos: ' + error);
                })
        }

        else if (req.url.match(/\/alunos\/[a-zA-Z0-9\-_]/)){
            axios.get('http://localhost:3001'+req.url)
                .then(resp => {
                    aluno = resp.data; 

                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })                   
                    res.write('<dl>')
                    
                    Object.keys(aluno).forEach(key=> {

                        res.write('<dt>' + key +' </dt>')
                        res.write('<dd>' + aluno[key] +' </dd>')

                    })

                    res.write('</dl>')
                    res.write("<address>[<a href='/alunos'> Voltar aos alunos</a> ]</address>")
                    res.end()
                })
                .catch(function (error) {
                    console.log('Erro na obtenção do aluno : ' + error);
                    res.writeHead(200, { 'Context-Type': 'text/html' })
                    res.write("<p> O Aluno nao existe: " + req.method + " " + req.url + "</p>")
                    res.write("<address>[<a href='/alunos'> Voltar aos alunos</a> ]</address>")
                    res.end()
                })

        }
        else if (req.url == "/cursos") {


            axios.get('http://localhost:3001/cursos')
                .then(resp => {
                    alunos = resp.data; 

                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write('<h2>Lista de Cursos</h2>');
                    res.write('<ul>')
                    alunos.forEach(c => {
                      
                        res.write("<li><a href='/cursos/"+c.id +"'>" +c.id+ ' - '+ c.designacao +'</a></li>')

                    })
                    res.write('</ul>')
                    res.write("<address>[<a href='/'> Voltar</a> ]</address>")
                    res.end()
                })
                .catch(function (error) {
                    console.log('Erro na obtenção da lista de cursos: ' + error);
                })
        }
        else if (req.url.match(/\/cursos\/[a-zA-Z0-9\-_]/)){
            axios.get('http://localhost:3001'+req.url)
                .then(resp => {
                    curso = resp.data; 

                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })                   
                    res.write('<dl>')
                    
                    res.write('<dt>id</dt><dd>' + curso.id + '</dd>')
                    res.write('<dt>designacao</dt><dd>' + curso.designacao + '</dd>')
                    res.write('<dt>duracao</dt><dd>' + curso.duracao + '</dd>')
                    res.write('<dt>instrumento</dt>'
                                +'<dd><dt>id</dt><dd>'
                                +curso.instrumento.id
                                +'</dd></dd>')
                   

                    res.write('</dl>')
                    res.write("<address>[<a href='/cursos'> Voltar aos cursos</a> ]</address>")
                    res.end()
                })
                .catch(function (error) {
                    console.log('Erro na obtenção do curso : ' + error);
                    res.writeHead(200, { 'Context-Type': 'text/html' })
                    res.write("<p> O Curso nao existe: " + req.method + " " + req.url + "</p>")
                    res.write("<address>[<a href='/cursos'> Voltar aos cursos</a> ]</address>")
                    res.end()
                })

        }
        else if (req.url == "/instrumentos") {


            axios.get('http://localhost:3001/instrumentos')
                .then(resp => {
                    alunos = resp.data; 

                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.write('<h2>Lista de instrumentos</h2>');
                    res.write('<ul>')
                    alunos.forEach(i => {
                      
                        res.write("<li><a href='/instrumentos/"+i.id +"'>" +i.id +'</a></li>')

                    })
                    res.write('</ul>')
                    res.write("<address>[<a href='/'> Voltar</a> ]</address>")
                    res.end()
                })
                .catch(function (error) {
                    console.log('Erro na obtenção da lista de instrumentos: ' + error);
                })
        }
        else if (req.url.match(/\/instrumentos\/[a-zA-Z0-9\-_]/)){
            axios.get('http://localhost:3001'+req.url)
                .then(resp => {
                    instrumento = resp.data; 

                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })                   
                    res.write('<dl>')
                    
                    Object.keys(instrumento).forEach(key=> {
                       
                        res.write('<dt>' + key +' </dt>')
                        res.write('<dd>' + instrumento[key] +' </dd>')

                    })

                    res.write('</dl>')
                    res.write("<address>[<a href='/instrumentos'> Voltar aos instrumentos</a> ]</address>")
                    res.end()
                })
                .catch(function (error) {
                    console.log('Erro na obtenção do instrumento : ' + error);
                    res.writeHead(200, { 'Context-Type': 'text/html' })
                    res.write("<p> O instrumento nao existe: " + req.method + " " + req.url + "</p>")
                    res.write("<address>[<a href='/instrumentos'> Voltar aos instrumentos</a> ]</address>")
                    res.end()
                })

        }
        else {



            res.writeHead(200, { 'Context-Type': 'text/html' })
            res.write("<p>Pedido nao suportado: " + req.method + " " + req.url + "</p>")
            res.write("<address>[<a href='/'> Voltar</a> ]</address>")
            res.end()
        }



    }
    else {
       
        res.writeHead(200, { 'Context-Type': 'text/html' })
        res.write("<p>Pedido nao suportado: " + req.method + " " + req.url + "</p>")
        res.write("<address>[<a href='/'> Voltar</a> ]</address>")
        res.end()
    }

}).listen(4000);

console.log('Servidor a escuta na porta 4000...')

