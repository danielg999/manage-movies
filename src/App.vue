<template>
  <div id="app">
    <div>
      <section>
        <button v-on:click="setSelectedOption('show-movies')">
          Show movies
        </button>
        <button v-if="!action" v-on:click="setSelectedOption('manage-movie')">
          Add movie
        </button>
      </section>
      <base-card>
        <component
          :is="selectedOption"
          :action="action"
          :movie-id="movieId"
        ></component>
      </base-card>
    </div>
  </div>
</template>

<script>
import BaseCard from "./components/UI/BaseCard.vue";
import ShowMovies from "./components/movies/ShowMovies.vue";
import ManageMovie from "./components/movies/ManageMovie.vue";

export default {
  components: { BaseCard, ShowMovies, ManageMovie },
  data() {
    return {
      selectedOption: "show-movies",
      action: null,
      movieId: null,
    };
  },
  methods: {
    setSelectedOption(selectedOption, action, movieId = null) {
      this.action = action;
      this.selectedOption = selectedOption;
      this.movieId = movieId;
    },
    errorHandling(error) {
      let errorMessage = "";
      if (!error.response) {
        errorMessage = "Error: Network Error";
      } else if (error.response.statusText) {
        errorMessage = error.response.statusText;
      } else {
        errorMessage = "Error: Please contact the administrator.";
      }
      alert(errorMessage);
    },
  },
  provide() {
    return {
      setSelectedOption: this.setSelectedOption,
      action: this.action,
      errorHandling: this.errorHandling,
    };
  },
};
</script>

<style scoped>
button {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
}

button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.flat:hover,
.flat:active {
  background-color: #edd2ff;
}
</style>
