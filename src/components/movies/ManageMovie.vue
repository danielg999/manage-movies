<template>
  <section>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="name">Movie</label>
        <input
          placeholder="Enter a movie name..."
          :disabled="setDisabled"
          type="textbox"
          id="name"
          name="name"
          v-model.trim="enteredName"
        />
      </div>
      <div class="form-control">
        <label for="year">Year</label>
        <input
          :placeholder="setPlaceholder"
          :disabled="setDisabled"
          type="number"
          id="year"
          name="year"
          v-model="enteredYear"
        />
      </div>
      <div class="form-control">
        <button v-if="action === 'edit'" type="submit" :disabled="isLoading">
          Modify
        </button>
        <button v-else-if="!action" type="submit" :disabled="isLoading">
          Insert
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import axios from "axios";
import { required, maxLength, between } from "vuelidate/lib/validators";
export default {
  props: ["action", "movieId"],

  inject: ["setSelectedOption", "errorHandling"],

  data() {
    return {
      enteredName: "",
      enteredYear: "",
      isLoading: false,
    };
  },

  validations: {
    enteredName: {
      required,
      maxLength: maxLength(200),
    },
    enteredYear: {
      between: between(1900, 2100),
    },
  },

  methods: {
    submitForm() {
      if (this.$v.enteredName.$invalid || this.$v.enteredYear.$invalid) {
        alert("Please complete the form fields correctly.");
        return;
      }

      if (this.action === "edit") {
        this.updateMovie();
      } else {
        this.insertMovie();
      }
    },
    insertMovie() {
      this.isLoading = true;
      const sendPostRequest = async () => {
        try {
          axios.post(
            `http://localhost:8080/api/movie/`,
            this.enteredYear
              ? {
                  name: this.enteredName,
                  year: this.enteredYear,
                }
              : { name: this.enteredName }
          );

          this.isLoading = false;
          this.enteredName = "";
          this.enteredYear = "";
        } catch (error) {
          this.isLoading = false;
          this.errorHandling(error);
        }
      };

      sendPostRequest();
    },
    updateMovie() {
      const id = this.movieId;
      this.isLoading = true;
      const sendPutRequest = async () => {
        try {
          await axios.put(
            `http://localhost:8080/api/movie/${id}`,
            this.enteredYear
              ? {
                  name: this.enteredName,
                  year: this.enteredYear,
                }
              : { name: this.enteredName }
          );
          this.isLoading = false;
        } catch (error) {
          this.isLoading = false;
          this.errorHandling(error);
        }
      };

      sendPutRequest();
    },
    loadMovie() {
      const id = this.movieId;
      this.isLoading = true;

      const sendGetRequest = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/movie/${id}`
          );
          this.isLoading = false;
          const data = response.data;
          this.enteredName = data.name;
          this.enteredYear = data.year === 0 ? "" : data.year;
        } catch (error) {
          this.isLoading = false;
          this.errorHandling(error);
        }
      };

      sendGetRequest();
    },
  },

  computed: {
    visibility() {
      return {
        "mode-add": this.action === null,
        "mode-edit": this.action === "edit",
        "mode-preview": this.action === "preview",
      };
    },
    setDisabled() {
      return this.action === "preview";
    },
    setPlaceholder() {
      return this.action === "preview" ? "" : "Enter the production year...";
    },
  },

  beforeMount() {
    if (this.action === "edit" || this.action === "preview") {
      this.loadMovie();
    }
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
button:disabled {
  background-color: #727272;
  border-color: #535353;
}
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 95%;
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.form-control {
  margin: 1rem 0;
  justify-content: center;
}

.form-control input {
  border-radius: 5px;
  border-color: #5b0097;
}
</style>