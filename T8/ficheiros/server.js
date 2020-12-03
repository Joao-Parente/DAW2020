var express = require('express')
var bodyParser = require('body-parser')
var templates = require('./html-templates')
var jsonfile = require('jsonfile')
var logger = require('morgan') // logger

var fs= require('fs')

var multer = require('multer')
const { json } = require('body-parser')
const { fstat } = require('fs')
var upload = multer({dest:'uploads/'})


var app = express()



//set logger
app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended:false }))

app.use(bodyParser.json())

app.use(express.static('public'))


app.get('/',function (req,res){
    var d = new Date().toISOString().substr(0,16)

    var files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'})
    res.write(templates.fileList(files,d))
    res.end()
})
    

app.get('/files/upload',function (req,res){
    var d = new Date().toISOString().substr(0,16)

    res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'})
    res.write(templates.fileForm(d))
    res.end()
})

app.get('/files/download/:fname', (req,res) => {

    res.download(__dirname +'/public/fileStore/'+req.params.fname)
})





app.post('/files',upload.array('myFile'),function(req,res){



   
    //req.file is the 'myfile'
    //req.body will hold text fields if any   


    req.files.forEach( file => {

        let oldPath = __dirname +'/'+file.path
        let newPath = __dirname +'/public/fileStore/'+file.originalname
      
        fs.rename(oldPath,newPath,function(err){
            if (err) throw err
    
        })
      
      
      
        var files = jsonfile.readFileSync('./dbFiles.json')
        var d= new Date().toISOString().substr(0,16)
       
        files.push(
            {
                date:d,
                name:file.originalname,
                size:file.size,
                mimetype:file.mimetype,
                desc:req.body.desc
            }
        )
        jsonfile.writeFileSync('./dbFiles.json',files)
        
    

        
    })

    res.redirect('/')
})


app.listen(7702,() => console.log('Servidor á escuta na porta 7702...'))