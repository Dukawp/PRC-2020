var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')
var Atores = require('../controllers/atores')
var Personagens = require('../controllers/personagens')
var Generos = require('../controllers/generos')

/* GET FILMES */
router.get('/filmes', function(req, res, next) {
  Filmes.lista()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

/* GET ATORES */
router.get('/atores', function(req, res, next) {
  Atores.lista()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

/* GET PERSONAGENS */
router.get('/personagens', function(req, res, next) {
  Personagens.lista()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

/* GET GENEROS */
router.get('/generos', function(req, res, next) {
  Generos.lista()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});


/* GET PAIS */
router.get('/pais', function(req, res, next) {
  Generos.lista()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

/* GET LINGUAS */
router.get('/linguas', function(req, res, next) {
  Generos.lista()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

module.exports = router;