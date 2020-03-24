const axios = require('axios')
var Pais = module.exports
const execQuery = require('./utils').execQuery

Pais.lista = async function(req) {
    var query = `Select ?s ?pais where {
        ?s a :País. 
        bind(replace(strafter(str(?s),"cinema#"),"_"," ")AS ?pais).
    }
    `
    
    return execQuery(query)
}