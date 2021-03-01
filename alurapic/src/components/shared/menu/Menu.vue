<template lang="html">
  <nav>
    <ul>
      <li v-for="rota of rotas">
        <router-link :to="rota.path ? rota.path : '/'">
          {{rota.titulo}}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    rotas: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="css" scoped>
</style>
