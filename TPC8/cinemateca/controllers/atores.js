const axios = require('axios')
var Atores = module.exports


var prefixes = `
    PREFIX : <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
`

var getLink = "http://localhost:7200/repositories/cinema2020" + "?query="  


Atores.lista = async function(req) {
    var query = `Select ?s ?nome ?sexo where {
        ?s a :Ator.
        ?s :nome ?nome.
        ?s :sexo ?sexo.   
    }
    `
    
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
    } 
}