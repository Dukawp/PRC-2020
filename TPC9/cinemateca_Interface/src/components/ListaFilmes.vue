<template>
  <v-card class="ma-2">
    <v-card-title>Lista dos Filmes na BD</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="hfilmes"
        :items="filmes"
        @click:row="rowClicked">

          <template v-slot:no-data>
            <v-alert :value="true" color="warning" icon="warning">
              Ainda não foi possível apresentar uma lista dos filmes...
            </v-alert>
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

export default {
  name: 'ListaFilmes',

  data: () => ({
    hfilmes: [
      {text: "Título", sortable: true, value: 'titulo', class: 'subtitle-1'},
      {text: "Data", sortable: true, value: 'data', class: 'subtitle-1'},
      {text: "Língua", sortable: true, value: 'lingua', class: 'subtitle-1'},
      {text: "Duração", sortable: true, value: 'duracao', class: 'subtitle-1'},
      {text: "Popularidade", sortable: true, value: 'pop', class: 'subtitle-1'}
    ],
    filmes: []
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
    rowClicked: function(filme){
      //alert('Cliquei no filme: ' + JSON.stringify(filme))
      const idFilme = filme.f.split('#')[1];
      this.$router.push({ name: 'FilmeIndividual', params: { idFilme: idFilme }});
    }
  }
  
}
</script>
