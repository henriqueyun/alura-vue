import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes.js';
import './directives/Transform.js'

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000/'
Vue.use(VueRouter);

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
