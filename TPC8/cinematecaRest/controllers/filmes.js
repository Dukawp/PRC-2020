const axios = require('axios')
var Filmes = module.exports
const execQuery = require('./utils').execQuery


Filmes.lista = () => {
    var query = `Select ?f ?titulo ?duracao ?data ?lingua ?pais ?realizador ?rnome where {
        ?f a :Filme.
        ?f :título ?titulo.
        ?f :duração ?duracao.
        ?f :dataLançamento ?data.
        ?f :temLíngua ?l.
        bind(strafter(str(?l),"cinema#") AS ?lingua).
        filter(?lingua = 'English').
        ?f :temPaísOrigem ?p.
        bind(replace(strafter(str(?p),"cinema#"),"_"," ")AS ?pais).
        ?f :temRealizador ?realizador.
        ?realizador :nome ?rnome.
    }`

    return execQuery(query)
}


Filmes.consultar = async (id) => {
    var query = `select ?titulo ?duracao ?data ?pais ?realizador ?rnome where {
        :${id} rdf:type :Filme .
        :${id} :título ?titulo .
        :${id} :duração ?duracao .
        :${id} :dataLançamento ?data .
        optional {
            :${id} :temPaísOrigem ?p .
            bind(replace(strafter(str(?p), "cinema#"), "_", " ") as ?pais) .
        }
        optional {
            :${id} :temRealizador ?realizador.
            ?realizador :nome ?rnome.
        }
    }`
    
    return execQuery(query)
}

Filmes.getProducers = async (id) => {
    var query = `select (group_concat(distinct ?prod; separator=",") as ?produtores) where {
        :${id} rdf:type :Filme .
        :${id} :foiProduzido ?p .
        ?p :nome ?prod . 
    }`
    
    return execQuery(query)
}

Filmes.getActors = async (id) => {
    var query = `select (group_concat (distinct ?nome ; separator=",")as ?atores) where {
        ?s a :Ator .
    	?s :atuou :${id}.
    	?s  :nome ?nome.
    }`
    
    return execQuery(query)
}

Filmes.getPers = async (id) => {
    var query = `select (group_concat (distinct ?nome ; separator=",")as ?personagens) where {
        ?s a :Personagem .
    	?s :éPersonagemDe :${id}.
    	?s :nome ?nome.
    }`
    
    return execQuery(query)
}

Filmes.getGenres = async (id) => {
    var query = `select (group_concat (distinct ?nome ; separator=",")as ?generos) where {
    	:${id} :temGénero ?s.
    	?s :nome ?nome.
}`
    
    return execQuery(query)
}