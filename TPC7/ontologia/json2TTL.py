import json, io, re

filmes = ""
pessoas = ""
listReps = []
personagens = ""
generos = []

#JSON TO TTL

with open('people.json') as f:
  data = json.load(f)

  people = data["people"]

for i in people:

    info = i["id"] 
    title = info["original_title"].replace(" ", "_")
    title = re.sub('[, ½ # * @ … &]+', '', title)
    title = re.sub('[\" \' ( ) ]', "_", title)
    if(title.endswith(".")):
            title = title[:-1]
    filme = "###  http://www.di.uminho.pt/prc2020/2020/2/cinema#" + title + "\n:"+ title +" rdf:type owl:NamedIndividual, \n\t\t:Filme ;"
    
    #TEM_GENERO#
    genero = "\t:temGénero \n"
    for g in info["genres"]:
        gen = g.replace(" ", "_")
        genero = genero + "\t\t:" + gen + ",\n"  
        if not (gen in generos):
            generos.append(gen)

    genero = genero[:-2]
    genero = genero +";"

    #TEM_PAIS_ORIGEM#
    pais = "\t:temPaísOrigem \n"
    for p in info["production_countries"]:
        c = p.replace(" ", "_")
        pais = pais + "\t\t:" + c + ",\n"
    pais = pais[:-2]
    pais = pais +";"

    #TEM_ATOR#
    actors = "\n\t:temAtor \n"
    pers = "\n\t:temPersonagem \n"
    for cast in i["cast"]:
        a = cast["name"].replace(" ", "_")
        a = re.sub('[, $]+', '', a)
        a = re.sub('[\" \']', "_", a)
        personagem = cast["character"].replace(" ","_")
        personagem = re.sub('[, $ / & @ # ( ) ’ \s ?]+', '', personagem)
        personagem = re.sub('[\" \' —]', "_", personagem)
        if(personagem.endswith(".")):
            personagem = personagem[:-1]
        if(a.endswith(".")):
            a = a[:-1] 
        actors = actors + "\t\t:" + a + ",\n"
        if(len(personagem) > 0):
            pers = pers + "\t\t:" + personagem + ",\n"
    actors = actors[:-2]
    pers = pers[:-2]
    pers = pers + ";"
    actors = actors +";"


    #TEM_REALIZADOR#
    realizador = "\n\t:temRealizador \n"
    for crew in i["crew"]:
        if(crew["job"] == "Director"):
            r = crew["name"].replace(" ","_")
            r = re.sub('[, $]+', '', r)
            r = re.sub('[\" \']', "_", r) 
            if(r.endswith(".")):
                r = r[:-1]
            realizador = realizador + "\t\t:" + r + ",\n"
    realizador = realizador[:-2]
    realizador = realizador +";"

    runtime = int(info["runtime"] or 0)

    #FILME DETAILS# MUITO HARDCODED ... MELHORAR ESTA ESTUPIDEZ!!!
    if(len(actors) > 20 and len(pais) > 20 and len(pers) > 20):
        filme = filme + "\n" + actors + "\n" + pers + "\n" + realizador + "\n" +  genero + "\n" + pais + "\n \t:dataLançamento " +  "\"" + info["release_date"] + "\"" +"; \n \t:duração "+ str(runtime) + ".\n"
        filmes = filmes + filme + "\n"
    elif(len(actors) >20 and len(pers) > 20):
        filme = filme + "\n" + actors + "\n" + pers + "\n" + realizador + "\n" +  genero + "\n \t:dataLançamento " +  "\"" + info["release_date"] + "\"" +"; \n \t:duração "+ str(runtime) + ".\n"
        filmes = filmes + filme + "\n"
    elif(len(actors) >20 and len(pais) > 20):
        filme = filme + "\n" + actors + "\n"  + realizador + "\n" +  genero + "\n" + pais + "\n \t:dataLançamento " +  "\"" + info["release_date"] + "\"" +"; \n \t:duração "+ str(runtime) + ".\n"
        filmes = filmes + filme + "\n"
    elif(len(pais) >20 and len(pers) > 20):
        filme = filme + "\n" + pers  + "\n" + realizador + "\n" + genero + "\n" + pais + "\n \t:dataLançamento " +  "\"" + info["release_date"] + "\"" +"; \n \t:duração "+ str(runtime) + ".\n"
        filmes = filmes + filme + "\n"
    else:
        filme = filme + "\n" + realizador + "\n" +  genero + "\n" + "\n \t:dataLançamento " +  "\"" + info["release_date"] + "\"" +"; \n \t:duração "+ str(runtime) + ".\n"
        filmes = filmes + filme + "\n"


    #PESSOAS INFO#
    for cast in i["cast"]:
        nome = cast["name"].replace(" ", "_")
        nome = re.sub('[, $]+', '', nome)
        nome = re.sub('[\" \']', "_", nome) 
        personagem = cast["character"].replace(" ","_")
        personagem = re.sub('[, $ / & @ # ( ) ’ \s ?]+', '', personagem)
        personagem = re.sub('[\" \' —]', "_", personagem)
        if(nome.endswith(".")):
            nome = nome[:-1]
        if(personagem.endswith(".")):
            personagem = personagem[:-1]    
        if not (nome in listReps):
            listReps.append(nome)
            if (cast["gender"] == 1):
                sexo = "F"
            else:
                sexo= "M"
            pessoa = "###  http://www.di.uminho.pt/prc2020/2020/2/cinema#" + nome + "\n:" + nome + " rdf:type owl:NamedIndividual ,"+ "\n\t\t:Pessoa ;"+ "\n\t:sexo " + "\"" + sexo + "\"" + ".\n" 
            pessoas = pessoas + pessoa + "\n"
            if(len(personagem)> 0):
                personagem = "###  http://www.di.uminho.pt/prc2020/2020/2/cinema#" + personagem + "\n:"+personagem+ " rdf:type owl:NamedIndividual ,"+"\n \t\t:Personagem;" + "\n\t:éRepresentadoPor " + ":" + nome + ".\n"
                personagens = personagens + personagem + "\n"

    for crew in i["crew"]:
        if(crew["job"] == "Director"):
            r = crew["name"].replace(" ","_")
            r = re.sub('[, $]+', '', r)
            r = re.sub('[\" \']', "_", r) 
            if(r.endswith(".")):
                r = r[:-1]
            if not (r in listReps):
                listReps.append(r)

                if (crew["gender"] == 1):
                    sexo = "F"
                else:
                    sexo= "M"
                pessoa = "###  http://www.di.uminho.pt/prc2020/2020/2/cinema#" + r + "\n:" + r + " rdf:type owl:NamedIndividual ,"+ "\n\t\t:Pessoa ;"+ "\n\t:sexo " + "\"" + sexo + "\"" + ".\n" 
                pessoas = pessoas + pessoa + "\n"


    #GENEROS#
    gns = ""
    for g in generos:
        genero = "###  http://www.di.uminho.pt/prc2020/2020/2/cinema#" + g + "\n:" + g + " rdf:type owl:NamedIndividual ,"+ "\n\t\t:Género"+ ".\n"
        gns = gns + genero + "\n"
with io.open("cinema.ttl", "a", encoding="utf-8") as myfile:
    #myfile.write(pessoas)
    #myfile.write(filmes)
    #myfile.write(personagens)
    myfile.write(gns)
