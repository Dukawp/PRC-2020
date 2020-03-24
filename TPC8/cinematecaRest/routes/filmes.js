var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')


/* GET FILMES */
router.get('/', function(req, res, next) {
  Filmes.lista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

router.get('/:id', async function(req, res, next) {
    try{
        var filme = await Filmes.consultar(req.params.id)
        var produtores = await Filmes.getProducers(req.params.id)
        filme.push(produtores)
        var atores = await Filmes.getActors(req.params.id)
        filme.push(atores)
        var personagens = await Filmes.getPers(req.params.id)
        filme.push(personagens)
        var generos = await Filmes.getGenres(req.params.id)
        filme.push(generos)

        res.jsonp(filme)
    }catch(e){
        res.status(500).send(`Erro na listagem do filme: ${e}`)
    }
});

module.exports = router;