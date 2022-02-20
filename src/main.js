import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false;

Vue.use(Vuelidate);

const app = new Vue({
  render: h => h(App)
});

app.$mount('#app');
