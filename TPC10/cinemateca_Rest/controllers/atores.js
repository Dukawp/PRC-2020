var Atores = module.exports
const execQuery = require('../services/utils').execQuery


Atores.getLista = async function(){
    var query = `select ?nome ?idAtor where {
        ?f a c:Ator .
        ?f c:nome ?nome
        bind(strafter(str(?f),'cinema#') as ?idAtor)
        }
    ` 
    return execQuery(query)
}

Atores.getAtorAtomica = async function(idAtor){
    var query = `select ?f ?nome ?sex where {
        c:${idAtor} a c:Ator.
    	c:${idAtor} c:nome ?nome.
    	c:${idAtor} c:sexo ?sex
        }
    `
    return execQuery(query)
}

Atores.getProduziu = async function(idAtor){
    var query = `select ?ftitulo where {
    	c:${idAtor} a c:Ator.
        c:${idAtor} c:produziu ?p.
        ?p c:título ?ftitulo
        } 
    ` 
    return execQuery(query)
}


Atores.getRealizou = async function(idAtor){
    var query = `select ?ftitulo where {
    	c:${idAtor} a c:Ator.
        c:${idAtor} c:realizou ?p.
        ?p c:título ?ftitulo
        } 
    ` 
    return execQuery(query)
}

Atores.getRepresentou = async function(idAtor){
    var query = `select ?fnome where {
    	c:${idAtor} a c:Ator.
        c:${idAtor} c:representa ?p.
        ?p c:nome ?fnome
        } 
    ` 
    return execQuery(query)
}

Atores.getAtor = async function(idAtor){
    try{
        var atomica = await Atores.getAtorAtomica(idAtor)
        var produziu = await Atores.getProduziu(idAtor)
        var realizou = await Atores.getRealizou(idAtor)
        var representou = await Atores.getRepresentou(idAtor)
        
        var ator = {
            info : atomica[0],
            produziu : produziu,
            realizou : realizou,
            representou : representou
        }
        return ator
    }
    catch(e){
        throw(e)
    }
}