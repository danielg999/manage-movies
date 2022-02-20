<template>
  <section>
    <p v-if="isLoading">Loading...</p>
    <p v-else-if="!isLoading && error">{{ error }}</p>
    <p v-else-if="!isLoading && (!movies || movies.length === 0)">
      No stored movies found. Start adding some movies first.
    </p>
    <table v-else>
      <thead>
        <tr>
          <td>Title</td>
          <td>Year</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in movies" :key="movie.id">
          <td>{{ movie.name }}</td>
          <td>{{ movie.year === 0 ? "" : movie.year }}</td>
          <td>
            <button class="editButton" @click="editMovie(movie.id)">
              Edit
            </button>
            <button class="previewButton" @click="previewMovie(movie.id)">
              Preview
            </button>
            <button class="deleteButton" @click="deleteMovie(movie.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import axios from "axios";
export default {
  props: ["action"],
  inject: ["setSelectedOption", "errorHandling"],
  data() {
    return {
      movies: [],
      isLoading: false,
      error: null,
    };
  },
  methods: {
    loadMovies() {
      const sendGetRequest = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/movie/`);
          this.setSelectedOption("show-movies", null);
          const data = response.data;

          this.isLoading = false;
          const results = [];

          for (const dataId in data) {
            results.push({
              id: data[dataId].id,
              name: data[dataId].name,
              year: data[dataId].year,
            });
          }

          this.movies = results;
        } catch (error) {
          this.errorHandling(error);
        }
      };

      sendGetRequest();
    },

    editMovie(movieId) {
      this.setSelectedOption("manage-movie", "edit", movieId);
      console.log(this.action, movieId);
    },

    previewMovie(movieId) {
      this.setSelectedOption("manage-movie", "preview", movieId);
      console.log(this.action, movieId);
    },

    deleteMovie(movieId) {
      if (!confirm("Press OK button to delete")) {
        return;
      }

      const sendDeleteRequest = async () => {
        try {
          await axios.delete(`http://localhost:8080/api/movie/${movieId}`);
          this.loadMovies();
          this.setSelectedOption("show-movies", null);
        } catch (error) {
          this.errorHandling(error);
        }
      };

      sendDeleteRequest();
    },
  },

  mounted() {
    this.loadMovies();
  },
};
</script>


<style scoped>
button {
  padding: 0.75rem 1.5rem;
  font-family: inherit;
  border: 1px solid #000000;
  color: white;
  cursor: pointer;
}
table {
  border-collapse: collapse;
  font-family: Tahoma, Geneva, sans-serif;
}
table td {
  padding: 15px;
}
table thead td {
  background-color: #54585d;
  color: #ffffff;
  font-weight: bold;
  font-size: 13px;
  border: 1px solid #54585d;
}
table tbody td {
  color: #636363;
  border: 1px solid #dddfe1;
}
table tbody tr {
  background-color: #f9fafb;
}
table tbody tr:nth-child(odd) {
  background-color: #ffffff;
}
.deleteButton {
  background-color: rgb(255, 35, 35);
}
.deleteButton:hover,
.deleteButton:active {
  background-color: rgb(255, 45, 45);
}
.previewButton {
  background-color: rgb(248, 187, 34);
}
.previewButton:hover,
.previewButton:active {
  background-color: rgb(248, 197, 44);
}
.editButton {
  background-color: rgb(15, 127, 255);
}
.editButton:hover,
.editButton:active {
  background-color: rgb(25, 137, 255);
}
.flatButtonTable {
  background-color: transparent;
  color: #3a0061;
  border: none;
}
.flat:hover,
.flat:active {
  background-color: #edd2ff;
}
</style>