var express = require('express');
var router = express.Router();
var Generos = require('../controllers/generos')
var Paises = require('../controllers/pais')
var Linguas = require('../controllers/linguas')


//------------------------------GENEROS------------------------------//

/* GET GENEROS */
router.get('/generos', function(req, res, next) {
  Generos.lista()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});


//------------------------------PAISES------------------------------//

/* GET PAIS */
router.get('/pais', function(req, res, next) {
  Paises.lista()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

//------------------------------LINGUAS------------------------------//

/* GET LINGUAS */
router.get('/linguas', function(req, res, next) {
  Linguas.lista()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

module.exports = router;