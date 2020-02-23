var express = require('express');
var router = express.Router();
var axios = require('axios');

const prefix = `
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX xml: <http://www.w3.org/XML/1998/namespace>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX noInferences: <http://www.ontotext.com/explicit>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
`

router.get('/', function(req, res, next) {
  axios.get("http://localhost:7200/repositories")
    .then(dados => { 
      data = []
            for(let i = 0; i < dados.data.results.bindings.length; i++){
                data[i] = dados.data.results.bindings[i].id.value
            }
      dquery = []
      res.render('index', {data,dquery, title: 'SPARQL' });
    })
    .catch(erro => res.status(500).jsonp(erro))
});



router.get('/query', function(req, res) {
  let query = req.query.query
  let repositorio =  req.query.repo

  axios.get(`http://localhost:7200/repositories/${repositorio}/namespaces`)
        .then(dado => {
            let pref = prefix + 'PREFIX : <' + dado.data.results.bindings[0].namespace.value + '>'
            var encoded = encodeURIComponent(pref + query)
            let link = `http://localhost:7200/repositories/${repositorio}?query=${encoded}`

            axios.get(link)
                .then(dados => {
                  dquery = []
                    for(let i = 0; i < dados.data.results.bindings.length; i++)
                      dquery[i] = dados.data.results.bindings[i]
                  res.render('index', {dquery,data , title: 'SPARQL' });
                })
                .catch(erro => {
                  dquery = []
                  dquery[0]="Query com erros.. Corrija e tente novamente!"
                  res.render('index', {dquery,data , title: 'SPARQL' });
                })
        })
})


module.exports = router;
