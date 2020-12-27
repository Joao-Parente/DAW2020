var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('CB da homepage, id da sessão: ' + req.sessionID)
  res.render('index');
});

router.get('/protegida', verificaAutenticacao, function (req, res, next) {
  console.log('CB da área protegida...')
  res.render('protegida');
});

function verificaAutenticacao(req, res, next) {
  console.log('User (verif.): ' + JSON.stringify(req.user))
  if(req.isAuthenticated()){
    // true if logged in 
    next();
  }
  else {res.redirect("/users/login")}
}



module.exports = router;
