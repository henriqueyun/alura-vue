<template>
  <div>
    <h1 class="centralizado">{{titulo}}</h1>
    <p v-show="mensagem" class="centralizado">{{mensagem}}</p>
    <input type="search" v-on:input="filtro = $event.target.value" placeholder="Filtre por titulo =)" class="filtro"/>
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva v-meu-transform:scale='1.2' v-bind:url="foto.url" v-bind:titulo="titulo"/>
          <meu-botao tipo="button" rotulo="REMOVER" :confirmacao="true" @botaoAtivado="remove(foto)" estilo="perigo"/>
          <router-link :to="{ name: 'alteracao', params: { id: foto._id }}">
            <meu-botao tipo="button" rotulo="ALTERAR" :confirmacao="false" estilo="padrao"/>
          </router-link>
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
  import Painel from '../shared/painel/Painel.vue';
  import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
  import Botao from '../shared/botao/Botao.vue';
  import FotoService from '../../domain/FotoService';

  import transform from '../../directives/Transform';

  export default {

    components: {
      'meu-painel' : Painel,
      'imagem-responsiva' : ImagemResponsiva,
      'meu-botao' : Botao
    },

    directives: {
      'meu-transform': transform
    },

    data() {
      return {
        titulo: 'Alurapic',
        fotos: [],
        filtro: '',
        mensagem: ''
      }
    },

    created() {
      this.service = new FotoService(this.$resource)
      this.service.listar()
        .then(fotos => this.fotos = fotos, err => this.mensagem = err.message)
    },

    computed: {
      fotosComFiltro() {
        if(this.filtro) {
          let exp = new RegExp(this.filtro.trim(), 'i');
          return this.fotos.filter(foto => exp.test(foto.titulo))
        } else {  
          return this.fotos;
        }
      }
    },

    methods: {
      remove(foto) {
        this.service.excluir(foto._id)
        .then(() => {
            let index = this.fotos.indexOf(foto);
            this.fotos.splice(index, 1);
            this.mensagem = 'Foto removida com sucesso' ;
          }, err => this.mensagem = err.message )}
    }
  }
</script>

<style>
  .centralizado {
    text-align: center;
  }

  .lista-fotos {
    list-style: none;
  }

  .lista-fotos .lista-fotos-item {
    width: auto;
    display: inline-block;
  }


  .filtro {
    display: block;
    width: 100%;
  }
</style>
