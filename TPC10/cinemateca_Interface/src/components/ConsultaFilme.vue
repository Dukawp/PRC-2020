<template>
  <div>
    <v-alert type="warning" v-if="!filmeCarregado">
      A carregar informação
    </v-alert>
    <v-card class="ma-4" v-else>
      <v-card-title class="indigo darken-4 white--text" dark>
        <span class="headline">Filme: "{{ filme.info.titulo }}" ({{idFilme}})</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="2">
              <div class="info-label">Resumo</div>
            </v-col>
            <v-col>
              <div class="info-content">{{ filme.info.res }}</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <div class="info-label">Data</div>
            </v-col>
            <v-col>
              <div class="info-content">{{ filme.info.data }}</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <div class="info-label">Duração (minutos)</div>
            </v-col>
            <v-col>
              <div class="info-content">{{ filme.info.duracao }}</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <div class="info-label">Índice de Popularidade</div>
            </v-col>
            <v-col>
              <div class="info-content">{{ filme.info.pop }}</div>
            </v-col>
          </v-row>

          <Linguas :lista="filme.linguas" />
          <Generos :lista="filme.generos" />
          <Atores :lista="filme.atores" />
          <Personagens :lista="filme.personagens" />


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
const lhost = require("@/config/global").host;

import Linguas from "@/components/filmes/Linguas.vue"
import Generos from "@/components/filmes/Generos.vue"
import Personagens from "@/components/filmes/Personagens.vue"
import Atores from "@/components/filmes/Atores.vue"

export default {
  name: 'Consulta filme',

  components: {
    Linguas, 
    Generos, 
    Atores, 
    Personagens
  },

  props: ["idFilme"],

  data: () => ({
    filme : [],
    filmeCarregado : false,

    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [10,20,50,100,-1],
      "items-per-page-all-text": "Todos"
    }
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/filmes/"+ this.idFilme);
      this.filme = response.data
      this.filme.atores.sort((a,b) => a.anome > b.anome ? 1 : -1)
      this.filmeCarregado = true
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