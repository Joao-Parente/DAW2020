var express = require('express');
var router = express.Router();
var passport = require('passport')

var User = require('../controllers/user')

/* GET users listing. */
router.get('/login', function(req, res) {
  res.render('login-form');
});

router.get('/register', function(req, res) {
  res.render('reg-form');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


router.post('/login', passport.authenticate('local'),function(req, res) {
  console.log('Na cb do POST login...')
  console.log('Auth' + JSON.stringify(req.user))
  console.log(req.body)
  res.redirect('/protegida')
});

router.post('/register', function(req, res) {


  User.insert(req.body)
    .then(dados => res.redirect('/'))
    .catch(erro => res.render('error',{error:erro}))
  
});

module.exports = router;
