// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import Index from './components/Index';
import Article from './components/Article';
import Contents from './components/Contents';

// 注册两个插件
Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [
  { path: '/index', component: Index },
  { path: '/article', component: Article },
  { path: '/contents', component: Contents },
  { path: '*', component: Index },
];

const router = new VueRouter({
  routes,
});

new Vue({
  router,
  el: '#app',
  render: h => h(App),
});