<template>
  <ConsultaFilme :idFilme="$route.params.id"/>
</template>

<script>
// @ is an alias to /src
import ConsultaFilme from '@/components/ConsultaFilme.vue'

export default {
  name: 'Consulta filme',
  components: {
    ConsultaFilme
  }
}
</script>
