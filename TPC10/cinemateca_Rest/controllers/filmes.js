var Filmes = module.exports
const execQuery = require('../services/utils').execQuery


Filmes.getLista = async function(){
    var query = `select ?f ?idFilme ?titulo ?duracao ?data ?lingua ?pop ?res where {
        ?f a c:Filme .
        ?f c:título ?titulo .
        ?f c:duração ?duracao .
        ?f c:dataLançamento ?data .
        ?f c:línguaOriginal ?lingua .
        bind(strafter(str(?f),'cinema#') as ?idFilme)

    }
    order by ?titulo ` 
    
    return execQuery(query)
}

Filmes.getLinguas = async function(idFilme){
    var query = `select distinct ?l where {
        { c:${idFilme} c:línguaOriginal ?l .} 
        union
        { c:${idFilme} c:temLíngua ?lind .
          ?lind c:nome ?l . }
    }` 
    return execQuery(query)
}

Filmes.getAtoresDoFilme = async function(idFilme){
    var query = `select ?a ?idAtor ?anome where {
        c:${idFilme} c:temAtor ?a.
        ?a c:nome ?anome .
        bind(strafter(str(?a),'cinema#') as ?idAtor).
    } ` 
    return execQuery(query)
}

Filmes.getGenerosDoFilme = async function(idFilme){
    var query = `select ?g ?idGenero ?gnome where {
        c:${idFilme} c:temGénero ?g.
        ?g c:nome ?gnome .
        bind(strafter(str(?g),'cinema#') as ?idGenero)

    } ` 
    return execQuery(query)
}

Filmes.getPersonagensDoFilme = async function(idFilme){
    var query = `select ?p ?idPersonagem ?pnome where {
        c:${idFilme} c:temPersonagem ?p.
        ?p c:nome ?pnome .
        bind(strafter(str(?p),'cinema#') as ?idPersonagem)

    } ` 
    return execQuery(query)
}

Filmes.getFilmeAtomica = async function (idFilme){
    var query = `select ?titulo ?duracao ?data ?lingua ?pop ?res where {
        c:${idFilme} a c:Filme .
        c:${idFilme} c:título ?titulo .
        c:${idFilme} c:duração ?duracao .
        c:${idFilme} c:dataLançamento ?data .
        c:${idFilme} c:línguaOriginal ?lingua .
        c:${idFilme} c:popularidade ?pop.
        c:${idFilme} c:resumo ?res .
    } ` 
    return execQuery(query)
}
  
Filmes.getFilme = async function(idFilme){
    try{
        var atomica = await Filmes.getFilmeAtomica(idFilme)
        var generos = await Filmes.getGenerosDoFilme(idFilme)
        var atores = await Filmes.getAtoresDoFilme(idFilme)
        var personagens = await Filmes.getPersonagensDoFilme(idFilme)
        var linguas = await Filmes.getLinguas(idFilme)


        var filme = {
            info : atomica[0],
            generos : generos,
            atores : atores,
            personagens : personagens,
            linguas : linguas

        }
        return filme
    }
    catch(e){
        throw(e)
    }
}