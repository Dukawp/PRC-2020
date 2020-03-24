const axios = require('axios')
var Linguas = module.exports
const execQuery = require('./utils').execQuery


Linguas.lista = async function(req) {
    var query = `Select ?s ?lingua where {
        ?s a :Língua. 
        bind(replace(strafter(str(?s),"cinema#"),"_"," ")AS ?lingua).
    }
    `
    return execQuery(query)
} 
