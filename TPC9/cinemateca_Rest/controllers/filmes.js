var Filmes = module.exports
const execQuery = require('../services/utils').execQuery


Filmes.getLista = async function(){
    var query = `select ?f ?titulo ?duracao ?data ?pop ?res where {
        ?f a c:Filme .
        ?f c:título ?titulo .
        ?f c:duração ?duracao .
        ?f c:dataLançamento ?data .
        ?f c:línguaOriginal ?lingua .
        ?f c:popularidade ?pop .
        ?f c:resumo ?res .
    } ` 
    return execQuery(query)
}

async function getFilmeAtomica(idFilme){
    var query = `select ?f ?titulo ?duracao ?data ?pop ?res where {
        c:${idFilme} a c:Filme .
        c:${idFilme} c:título ?titulo .
        c:${idFilme} c:duração ?duracao .
        c:${idFilme} c:dataLançamento ?data .
        c:${idFilme} c:línguaOriginal ?lingua .
        c:${idFilme} c:popularidade ?pop .
        c:${idFilme} c:resumo ?res .
    } ` 
    return execQuery(query)
}

Filmes.getAtoresDoFilme =  async function(idFilme) {
    var query = `select ?a ?anome where {
        c:${idFilme} c:temAtor ?a .
        ?a c:nome ?anome .
    } ` 
    return execQuery(query)
}

Filmes.getGenerosDoFilme =  async function(idFilme) {
    var query = `select ?g ?gnome where {
        c:${idFilme} c:temGénero ?g .
        ?g c:nome ?gnome .
    } ` 
    return execQuery(query)
}

Filmes.getPersonagensDoFilme =  async function(idFilme) {
    var query = `select ?p ?pnome where {
        c:${idFilme} c:temPersonagem ?p .
        ?p c:nome ?pnome .
    } ` 
    return execQuery(query)
}

Filmes.getFilme =  async function(idFilme) {
    try {
        const atomica = await getFilmeAtomica(idFilme)
        const generos = await Filmes.getGenerosDoFilme(idFilme)
        const atores = await Filmes.getAtoresDoFilme(idFilme)
        const personagens = await Filmes.getPersonagensDoFilme(idFilme)
        let filme = atomica[0]
        filme['generos'] = generos
        filme['atores'] = atores
        filme['personagens'] = personagens
        return filme
    } catch (error) {
        throw(error)
    }
}
