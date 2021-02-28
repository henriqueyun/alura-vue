import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource';

//disponibilza funções para realizar as reqs. da aplicação
Vue.use(VueResource);

new Vue({
  el: '#app',
  render: h => h(App)
})
