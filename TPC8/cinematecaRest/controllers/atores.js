const axios = require('axios')
var Atores = module.exports
const execQuery = require('./utils').execQuery



Atores.lista = () => {
    var query = `Select ?s ?nome ?sexo where {
        ?s a :Ator.
        ?s :nome ?nome.
        ?s :sexo ?sexo.   
    }
    `
    
    return execQuery(query)
    
}

Atores.consultar = async function(id) {
    var query = `select ?nome ?sexo where {
    	:${id} a :Ator.
    	:${id} :nome ?nome.
    	:${id} :sexo ?sexo
    }`
    
    return execQuery(query)
    
}

Atores.getFilmes = async function(id) {
    var query = `select (group_concat(distinct ?filme; separator=",") as ?filmes)  where {
        :${id} rdf:type :Ator.
        :${id} :atuou ?f.
        ?f :título ?filme.
    }`
    
    return execQuery(query)
    
}

