import Vue from 'vue'
import App from './App.vue'
import './mockjs'
import "./utils/element"
import 'element-ui/lib/theme-chalk/index.css';
import api from "./services/api";
Vue.prototype.$api = api;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
