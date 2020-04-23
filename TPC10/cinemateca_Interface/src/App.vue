<template>
  <v-app>
      <v-content>
        <router-view/>
        <div width="100%" class="ma-4 indigo darken-4 white--text" dark>
          Cinemateca PRC2020
          {{ new Date().getFullYear()}}
          prc2020@di.uminho.pt
        </div>
      </v-content>
  </v-app>
</template>
