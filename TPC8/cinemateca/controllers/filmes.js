const axios = require('axios')
var Filmes = module.exports


var prefixes = `
    PREFIX : <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
`

var getLink = "http://localhost:7200/repositories/cinema2020" + "?query="  


Filmes.lista = async function(req) {
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
    
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
    } 
}