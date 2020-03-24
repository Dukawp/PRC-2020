var axios = require('axios')
const endpoit = "http://localhost:7200/repositories/cinema2020"

var prefixes = `
    PREFIX : <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
`

exports.execQuery = async function (query) {
    var encoded = encodeURIComponent(prefixes + query)
    try {
        var response = await axios.get(endpoit + "?query=" + encoded)
        var vars = response.data.head.vars
        var res = response.data.results.bindings;
        var jsonList = [];
        for(i in res) {
            var json = {}
            for(j in vars) {
                json[vars[j]] = res[i][vars[j]].value;
            }
            jsonList.push(json);
        }
        return(jsonList)
    }
    catch(error) {
        return("ERRO: " + error)
    }
}