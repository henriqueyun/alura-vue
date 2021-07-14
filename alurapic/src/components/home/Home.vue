<template>
  <div>
    <h1 class="centralizado">{{titulo}}</h1>
    <p v-show="mensagem" class="centralizado">{{mensagem}}</p>
    <input type="search" v-on:input="filtro = $event.target.value" placeholder="Filtre por titulo =)" class="filtro"></input>
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva v-meu-transform:scale='1.2' v-bind:url="foto.url" v-bind:titulo="titulo"/>
          <meu-botao tipo="button" rotulo="REMOVER" :confirmacao="true" @botaoAtivado="remove(foto)" estilo=""/>
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
  import Painel from '../shared/painel/Painel.vue';
  import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue'
  import Botao from '../shared/botao/Botao.vue'

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
      this.$http.get('http://localhost:3000/v1/fotos')
      .then(res => res.json())
      .then(fotos => this.fotos = fotos, err => console.log(err))
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
        console.log(this.foto)
        console.log(foto)
        this.$http.delete(`http://localhost:3000/v1/fotos/${foto._id}`)
        .then(() => this.mensagem = 'Foto removida com sucesso', (err) => {
          console.error(err);
          this.mensagem = 'Erro ao tentar remover a foto'
        })
      }

      
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
