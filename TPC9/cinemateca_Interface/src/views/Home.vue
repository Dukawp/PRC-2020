<template>
  <v-app>
    <v-content>
      <ListaFilmes />
    </v-content>
  </v-app>
</template>

<script>
import ListaFilmes from '../components/ListaFilmes';

export default {
  name: 'Home',

  components: {
    ListaFilmes,
  }
};
</script>
