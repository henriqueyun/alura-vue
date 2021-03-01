<template lang="html">
  <button @click="disparaAcao()" class="botao" :class="estiloDoBotao" :type="tipo">{{rotulo}}</button>
</template>

<script>
export default {
  props: {
    tipo: {
      required: true,
      type: String
    },
    rotulo: {
      required: true,
      type: String
    },
    confirmacao: {
      required: false,
      type: Boolean
    },
    estilo: {
      required: false,
      type: String
    }
  },
  methods: {
    disparaAcao() {
      if(this.confirmacao) {
        if(confirm('Deseja remover a imagem?'))
        this.$emit('botaoAtivado');
      } else {
        this.$emit('botaoAtivado');
      }
    }
  },

  computed: {
    estiloDoBotao() {
      if(this.estilo == 'padrao' || this.estilo == '') return 'botao-padrao';
      if(this.estilo == 'perigo') return 'botao-perigo';
    }
  }

}
</script>

<style lang="css" scoped>
  .botao {
      display: inline-block;
      padding: 10px;
      border-radius: 3px;
      margin: 10px;
      font-size: 1.2em;
  }

  .botao-perigo {
      background: firebrick;
      color: white;
  }

  .botao-padrao {
      background: darkcyan;
      color: white;
  }
</style>
