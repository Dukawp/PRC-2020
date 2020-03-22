import urllib.request, json

apiKey = "?api_key=d49938d2f7bd6bff37b66b4c15525322&language=en-US"
ids = []
idsP = []
filmes = {}
filmes["movies"] = []
people = {}
people["people"] = []
peopleCast = {}
peopleCast["people"] = []
dicIds = {}

#MOVIE DETAILS
info = {}
info["genres"] = []
info["original_language"] = ""
info["original_title"] = ""
info["production_companies"] = []
info["production_countries"] = []
info["release_date"] = ""
info["runtime"] = ""
info["spoken_languages"] = []

#GET ID# TOP MOVIES ALL TIME - 5 PAGES - 

i = 1
while i <= 5:
    url = "https://api.themoviedb.org/3/movie/top_rated?api_key=d49938d2f7bd6bff37b66b4c15525322&language=en-US&page={}" .format(i)
    print(url)
    response = urllib.request.urlopen(url)
    data = response.read()
    encoding = response.info().get_content_charset('utf-8')
    i+=1
    #print(json.loads(data.decode(encoding)))
    info = json.loads(data.decode(encoding))
    for a in info["results"]:
        ids.append(a["id"])

#GET ID# POPULAR MOVIES - 5 PAGES - 
i = 1
while i <= 5:
    url = "https://api.themoviedb.org/3/movie/popular?api_key=d49938d2f7bd6bff37b66b4c15525322&language=en-US&page={}" .format(i)
    print(url)
    response = urllib.request.urlopen(url)
    data = response.read()
    encoding = response.info().get_content_charset('utf-8')
    i+=1
    #print(json.loads(data.decode(encoding)))
    info = json.loads(data.decode(encoding))
    for a in info["results"]:
        ids.append(a["id"])


#GET CREDITS FROM EACH MOVIE#
for i in ids:
    url = "https://api.themoviedb.org/3/movie/{}" .format(i) + "/credits?api_key=d49938d2f7bd6bff37b66b4c15525322"
    response = urllib.request.urlopen(url)
    data = response.read()
    encoding = response.info().get_content_charset('utf-8')
    #print(json.loads(data.decode(encoding)))
    
    people["people"].append(json.loads(data.decode(encoding)))

#GET MOVIE DETAILS#
for i in ids:
    url = "https://api.themoviedb.org/3/movie/{}" .format(i) + apiKey
    response = urllib.request.urlopen(url)
    data = response.read()
    encoding = response.info().get_content_charset('utf-8')
    #print(json.loads(data.decode(encoding)))
    
    filmes["movies"].append(json.loads(data.decode(encoding)))


#SAVE DATA#
with open('ndata.json', 'w') as outfile:
   json.dump(filmes, outfile, indent=4)

with open('people.json', 'w') as outfile:
   json.dump(people, outfile, indent=4)



#-- IDs = Movie Title --#
with open('ndata.json') as f:
  data = json.load(f)

  movies = data["movies"]

for i in movies: 
    #GET GENRES
    for g in i["genres"]: 
        info["genres"].append(g["name"])
    #GET PROD COMPANIES
    for g in i["production_companies"]: 
        info["production_companies"].append(g["name"])
    #GET PROD COUNTRIES
    for g in i["production_countries"]: 
        info["production_countries"].append(g["name"])
    #GET SPOKEN LANG
    for g in i["spoken_languages"]: 
        info["spoken_languages"].append(g["name"])

    info["original_language"] = i["original_language"]
    info["original_title"] = i["original_title"]
    info["release_date"] = i["release_date"]
    info["runtime"] = i["runtime"]

    dicIds[i["id"]] = info


with open('people.json', 'r+') as f:
    pp = json.load(f)

for people in pp["people"]:
    if(dicIds[people["id"]]):
        people["id"] =dicIds[people["id"]]
    
with open('people.json', 'w') as outfile:
    json.dump(pp, outfile, indent=4)