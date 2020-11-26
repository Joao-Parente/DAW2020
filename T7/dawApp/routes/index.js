var express = require('express');
var router = express.Router();

var { parse } = require('querystring')

var Student = require('../controllers/student')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/students', function (req, res) {
  // Data retrieve
  Student.list()
    .then(data => res.render('students', { list: data }))
    .catch(err => res.render('error', { error: err }))
    ;
});

router.get('/students/:id', function (req, res) {

  if (req.params.id == 'registar') res.render('form')

  else {
    Student.lookUp(req.params.id)
      .then(data => res.render('student', { regist: data }))
      .catch(err => res.render('error', { error: err }))
      ;
  }
});


router.get('/students', function (req, res) {
  // Data retrieve
  Student.list()
    .then(data => res.render('students', { list: data }))
    .catch(err => res.render('error', { error: err }))
    ;
});

router.get('/students/:id/editar', function (req, res) {
  res.render('form2',{id:req.params.id})
});



router.delete('/students/:id', function (req, res) {

  console.log("Paraams " + req.params.id)
  Student.remove(req.params.id)
    .then()
    .catch(err => res.render('error', { error: err }))
    ;
}
);


router.post('/students', function (req, res) {

  Student.insert(req.body)
    .then(
      res.redirect("/students/" + req.body.numero)
    )
    .catch (err => res.render('error', { error: err }))
    
})

router.post('/editar/:id', function (req, res) {

  Student.remove(req.params.id)
  .then()
  .catch(err => res.render('error', { error: err }))
  ;

  Student.insert(req.body)
    .then(
      
      res.redirect("/students/" + req.params.id)
    )
    .catch (err => res.render('error', { error: err }))
    
})









module.exports = router;
