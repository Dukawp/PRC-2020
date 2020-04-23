<template>
  <v-card class="ma-2">
    <v-card-title class="indigo darken-4 white--text" dark
      >Lista dos Filmes na BD
      <v-spacer></v-spacer>
      <v-text-field
        v-model="filtrar"
        label="Filtrar"
        single-live
        hide-details
        dark
        >
      </v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="hfilmes"
        :items="filmes"
        :footer-props="footer_props"
        :search="filtrar"
        >

          <template v-slot:no-data>
            <v-alert :value="true" color="warning" icon="warning">
              Ainda não foi possível apresentar uma lista dos filmes...
            </v-alert>
          </template>

          <template v-slot:item.ops="{item}">
            <v-icon
              @click="mostraFilme(item)"
            >
            {{ verFilme }}
            </v-icon>
          </template>

          <v-template v-slot:items="props">
            <tr @click="rowClicked(props.item)">
              <td>{{ props.item.titulo }}</td>
              <td>{{ props.item.data }}</td>
              <td>{{ props.item.lingua }}</td>
              <td>{{ props.item.duracao }}</td>
              <td>{{ props.item.pop }}</td>
            </tr>
          </v-template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'
const lhost = require("@/config/global").host;
import { mdiMovieOpen } from '@mdi/js'

export default {
  name: 'ListaFilmes',

  data: () => ({
    hfilmes: [
      {text: "Título", sortable: true, value: 'titulo', class: 'subtitle-1'},
      {text: "Data", sortable: true, value: 'data', class: 'subtitle-1'},
      {text: "Língua", sortable: true, value: 'lingua', class: 'subtitle-1'},
      {text: "Duração", sortable: true, value: 'duracao', class: 'subtitle-1'},
      {text: "Popularidade", sortable: true, value: 'pop', class: 'subtitle-1', filterable : false},
      {text: "Operações", value: 'ops' , class: 'subtitle-1'}
    ],
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [10,20,50,100,-1],
      "items-per-page-all-text": "Todos"
    },
    filmes: [],
    filtrar : "",
    verFilme : mdiMovieOpen
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/filmes");
      this.filmes = response.data
    } 
    catch (e) {
      return e;
    }
  },

  methods: {
    mostraFilme: function(item){
      alert('Cliquei no filme: ' + JSON.stringify(item))
      this.$router.push("/filmes/"+ item.idFilme);
    }
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