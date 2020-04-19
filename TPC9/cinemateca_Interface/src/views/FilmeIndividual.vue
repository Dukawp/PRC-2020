<template>
  <v-card class="ma-2">
    <v-card-title>{{ filme.titulo }}</v-card-title>
    <v-card-text>
      <div id="info">
        <ul>
          <li>Data Lançamento: {{ filme.data }}</li>
          <li>Popularidade: {{ filme.pop }}</li>
          <li>Duração(min): {{ filme.duracao }}</li>
        </ul>
        <p>{{ filme.res }}</p>
      </div>
      <div id="generos">
        <v-data-table
          :headers="hgeneros"
          :items="filme.generos"
        >
          <template v-slot:no-data>
            <v-alert :value="true" color="warning" icon="warning">
              Ainda não foi possivel carregar os géneros do filme {{ filme.titulo }}...
            </v-alert>
          </template>
          <v-template v-slot:items="props">
            <tr>
              <td>{{ props.item.gnome }}</td>
            </tr>
          </v-template>
        </v-data-table>
      </div>
      <div id="atores">
        <v-data-table
          :headers="hatores"
          :items="filme.atores"
        >
          <template v-slot:no-data>
            <v-alert :value="true" color="warning" icon="warning">
              Ainda não foi possivel carregar os atores do filme {{ filme.titulo }}...
            </v-alert>
          </template>
          <v-template v-slot:items="props">
            <tr>
              <td>{{ props.item.anome }}</td>
            </tr>
          </v-template>
        </v-data-table>
      </div>
    </v-card-text>
  </v-card>
</template>


<script>

import axios from 'axios'
const lhost = require("@/config/global").host;

export default {
  name: 'FilmeIndividual',
  props: ['idFilme'],   
  data: () => ({
    filme: {},
    hgeneros: [
      { text: 'Género', sortable: true, value: 'gnome', class: 'subtitle-1' },
    ],
    hatores: [
      { text: 'Nome', sortable: true, value: 'anome', class: 'subtitle-1' },
    ],
  }),
  created: async function() {
    try {
      let response = await axios.get(lhost + `/filmes/${this.idFilme}`);
      this.filme = response.data
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

