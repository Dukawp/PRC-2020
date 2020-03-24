var express = require('express');
var router = express.Router();
var Personagens = require('../controllers/personagens')

/* GET PERSONAGENS */
router.get('/', function(req, res, next) {
  Personagens.lista()
      .then(dados => res.jsonp(dados))
      .catch(e => res.status(500).send(`Erro na listagem de personagens: ${e}`))
});


router.get('/:id', async function(req, res, next) {
  try{
      var personagem = await Personagens.consultar(req.params.id)
      var filmes = await Personagens.getFilmes(req.params.id)

      personagem.push(filmes)

      res.jsonp(personagem)
  }catch(e){
      res.status(500).send(`Erro na listagem do Personagem: ${e}`)
  }
});

module.exports = router;