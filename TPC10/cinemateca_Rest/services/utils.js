const axios = require('axios')
const endpoit = "http://localhost:7200/repositories/cinemaV2"

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX c: <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
`


exports.execQuery = async function (query) {
    const encoded = encodeURIComponent(prefixes + query)
    try {
        const response = await axios.get(`${endpoit}?query=${encoded}`)
        return normalize(response.data)
    }
    catch(error) {
        return("ERRO: " + error)
    }
}

function normalize(response) {
    return response.results.bindings.map(obj => {
        var new_obj = {};
        for (let [k,v] of Object.entries(obj)) {
            new_obj[k] = v.value;
        }
        return new_obj
    });
};