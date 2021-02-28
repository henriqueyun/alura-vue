<template>
  <div id="app">
    <h1>{{titulo}}</h1>
    <ul v-for="foto of fotos">
      <li><img :src="foto.url" :alt='foto.legenda'></img></li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        titulo: 'Alurapic',
        fotos: []
      }
    },
    created() {
      this.$http.get('http://localhost:3000/v1/fotos')
      .then(res => res.json())
      .then(fotos => this.fotos = fotos, err => console.log(err))
    }
  }
</script>

<style>

</style>
