import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes.js';
import './directives/Transform.js';
import VeeValidate from 'vee-validate';
import msg from './pt_BR';

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000/'
Vue.use(VueRouter);
Vue.use(VeeValidate, {
  locale: 'pt_BR', 
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
})

const router = new VueRouter({
  routes,
  mode: 'history'
});


// vue instance
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
