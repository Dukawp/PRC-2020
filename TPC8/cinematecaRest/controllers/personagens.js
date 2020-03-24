const axios = require('axios')
var Personagens = module.exports
const execQuery = require('./utils').execQuery


Personagens.lista = () => {
    var query = `Select ?s ?nome where {
        ?s a :Personagem. 
        ?s :nome ?nome.
    }
    `
    return execQuery(query)
}


Personagens.consultar = async (id) => {
    var query = `select ?nome ?sexo where {
    	:${id} a :Personagem.
    	:${id} :nome ?nome.
    	:${id} :sexo ?sexo
    }`
    
    return execQuery(query)
}

Personagens.getFilmes = async function(id) {
    var query = `select (group_concat(distinct ?filme; separator=",") as ?filmes)  where {
        :${id} rdf:type :Personagem.
        :${id} :éPersonagemDe ?f.
        ?f :título ?filme.
    }`
    
    return execQuery(query)
    
}