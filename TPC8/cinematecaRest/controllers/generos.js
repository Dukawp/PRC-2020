const axios = require('axios')
var Generos = module.exports
const execQuery = require('./utils').execQuery


Generos.lista = async function(req) {
    var query = `Select ?s ?genero where {
        ?s a :Género. 
        bind(strafter(str(?s),"cinema#") AS ?genero).
    }
    `
    
    return execQuery(query)
}