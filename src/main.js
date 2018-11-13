import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import store from "@/store";

Vue.use(VueRouter);
Vue.use(iView);

Vue.config.productionTip = false;
const router = new VueRouter({ routes });
if (process.env.NODE_ENV !== 'production') require('@/mock')

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
