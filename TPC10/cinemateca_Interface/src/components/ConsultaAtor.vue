<template>
    <div>
      <v-alert type="warning" v-if="!atorCarregado">
        A carregar informação
      </v-alert>

      <v-card class="ma-4" v-else>
        <v-card-title class="indigo darken-4 white--text" dark>
          <span class="headline">Ator: "{{ ator.info.nome }}" ({{idAtor}})</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="2">
                <div class="info-label">Sexo</div>
              </v-col>
              <v-col>
                <div class="info-content">{{ ator.info.sex }}</div>
              </v-col>
            </v-row>

            <Listagem 
              :lista="ator.produziu" 
              nome="Produziu"
            />
            <Listagem 
              :lista="ator.realizou" 
              nome="Realizou"
            />
            <Representou 
              :lista="ator.representou" 
              nome="Representou"
            />
            
          </v-container>  
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$router.go(-1)">voltar</v-btn>
        </v-card-actions>
      </v-card>

    </div>
</template>


<script>
import axios from 'axios'
import Listagem from "@/components/atores/Listagem.vue"
import Representou from "@/components/atores/Representou.vue"
const lhost = require("@/config/global").host;


export default {
  name: 'Consulta ator',

  components: {
    Listagem,
    Representou
  },

  props: ["idAtor"],

  data: () => ({
    ator : [],
    atorCarregado : false,

    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [10,20,50,100,-1],
      "items-per-page-all-text": "Todos"
    }
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/atores/"+ this.idAtor);
      this.ator = response.data
      this.atorCarregado = true
    } 
    catch (e) {
      return e;
    }
  },

  methods: {
  }
  
}
</script>

<style>
.info-label {
  color: indigo;
  padding: 5px;
  font-weight: 400;
  width: 100%;
  background-color: #e0f2f1;
  font-weight: bold;
}

.info-content {
  padding: 5px;
  width: 100%;
  border: 1px solid #1a237e;
}
</style>