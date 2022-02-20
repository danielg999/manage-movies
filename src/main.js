import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import BaseCard from "./components/UI/BaseCard.vue";
import ShowMovies from "./components/movies/ShowMovies.vue";
import ManageMovie from "./components/movies/ManageMovie.vue";
Vue.config.productionTip = false;

Vue.use(Vuelidate);

const app = new Vue({
  render: h => h(App),
  components: {
    BaseCard, ShowMovies, ManageMovie
  }
});

app.$mount('#app');
