const readline = require('readline');
const fs = require('fs');
const write_path = 'salaAula.ttl';
const read_path = 'PRI2019-Avaliacao.csv';
var text = ""
var efrequentadoPor = []

let rl = readline.createInterface({
    input: fs.createReadStream(read_path)
});

let line_no = 0;

function copyData(write_path, read_path){
    rl.on('line', function(line) {
        line_no++;
        if(line.split(',')[0] != 'Número' && line.split(',')[0] != 'A63129'  ){
            efrequentadoPor.push(  ` :${line.split(',')[0]}  ` )
            text = `###  urn:absolute:PRC_01_SalaAula#${line.split(',')[0]}
            :${line.split(',')[0]} rdf:type owl:NamedIndividual ,
                                    :Aluno ;
                    :frequenta :gcs ,
                            :prc ,
                            :pri,
                            :spln;
                    :Ident "${line.split(',')[0]}"^^xsd:string ;
                    :nome "${line.split(',')[1]}"^^xsd:string ;
                    :email "${line.split(',')[0]}@alunos.uminho.pt"^^xsd:string ;
                    :curso "MIEI"^^xsd:string .
                    \n
                    `

                fs.appendFile(write_path, text, function(err) {
                    if (err) throw err;
                });
        }
    });
}



copyData(write_path,read_path);


// end
rl.on('close', function(line) {
    efrequentadoPor += ';'
    var aula = `
    ###  urn:absolute:PRC_01_SalaAula#jcr
    :jcr rdf:type owl:NamedIndividual ,
              :Professor ;
     :leciona :prc ,
              :pri ;
     :Ident "D1513"^^xsd:string ;
     :nome "José Carlos Ramalho"^^xsd:string .

    \n

    ###  urn:absolute:PRC_01_SalaAula#prh
    :prh rdf:type owl:NamedIndividual ,
              :Professor ;
     :leciona :gcs ;
     :nome "Pedro Rangel Henriques"^^xsd:string .

    \n

    ###  urn:absolute:PRC_01_SalaAula#jj
    :jj rdf:type owl:NamedIndividual ,
              :Professor ;
     :leciona :spln ;
     :Ident "D"^^xsd:string ;
     :nome "José João"^^xsd:string .

     \n
    
    ###  urn:absolute:PRC_01_SalaAula#prc
    :prc rdf:type owl:NamedIndividual ,
                  :UC ;
         :éFrequentadaPor ${efrequentadoPor}
         :éLecionadaPor :jcr ;
         :nome "Processamento e Representação de Conhecimento"^^xsd:string .
    \n
         ###  urn:absolute:PRC_01_SalaAula#gcs
    :gcs rdf:type owl:NamedIndividual ,
              :UC ;
     :éFrequentadaPor ${efrequentadoPor}
     :éLecionadaPor :prh ;
     :nome "Gramáticas na Compreensão de Software"^^xsd:string .
     \n
     ###  urn:absolute:PRC_01_SalaAula#pri
    :pri rdf:type owl:NamedIndividual ,
                  :UC ;
         :éFrequentadaPor ${efrequentadoPor}
         :éLecionadaPor :jcr ;
         :nome "Processamento e Representação de Informação"^^xsd:string .
    \n
    ###  urn:absolute:PRC_01_SalaAula#spln
    :spln rdf:type owl:NamedIndividual ,
                  :UC ;
         :éFrequentadaPor ${efrequentadoPor}
         :éLecionadaPor :jj ;
         :nome "Scripting no Processamento de Linguagem Natural"^^xsd:string .
    `
    fs.appendFile(write_path, aula, function(err) {
        if (err) throw err;
    });
    console.log("IDs todos alunos:" + efrequentadoPor)
    console.log('Total alunos : ' + (line_no - 1));
});