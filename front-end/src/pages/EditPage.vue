<template>
  <div>
    <div v-if="loading">loading ...</div>
    <div v-if="error">{{ error }}</div>
    <div id="editToy">
      <div class="post">
        <h1>Edit {{ toy.name }}</h1>
        <form>
          <div class="form-group">
            <label for="name">Toy Name: </label>
            <input
              v-model="name"
              type="text"
              class="form-control"
              id="name"
              name="toyname"
            />
          </div>
          <div class="form-group">
            <label for="pic">Image: </label>

            <div>
              <img
                v-if="toy.imgSrc"
                v-bind:src="'http://localhost:8000/' + toy.imgSrc"
                alt=""
                width="50%"
              />
            </div>
            <input
              type="file"
              v-on:input="handleFile"
              class="form-control-file"
              id="pic"
              required
            />

            <img
              v-if="fileUpload"
              v-bind:src="'http://localhost:8000/' + fileUpload"
              class="post__img"
              alt=""
            />
          </div>

          <div class="form-group">
            <label for="rent">Rent price: </label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text">$</div>
              </div>
              <input
                v-model="rentPrice"
                type="number"
                class="form-control"
                id="rent"
                name="rentprice"
                min="0.01"
                step="0.01"
              />
              <div class="input-group-append">
                <div class="input-group-text">/ week rent</div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="sale">Sale price: </label>
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <div class="input-group-text">$</div>
              </div>
              <input
                v-model="salePrice"
                type="number"
                class="form-control"
                id="sale"
                name="saleprice"
                min="0.01"
                step="0.01"
              />
              <div class="input-group-append">
                <div class="input-group-text">/ buy</div>
              </div>
            </div>
          </div>
          <button
            v-on:click="handleSubmit"
            type="submit"
            class="btn btn-primary"
          >
            Submit
          </button>
          <div v-if="loadingEdit">loading ...</div>
          <div v-if="errorEdit">{{ errorEdit }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Axios from "../axios";
export default {
  data() {
    return {
      id: this.$route.params.id,
      name: "",
      rentPrice: "",
      salePrice: "",
      fileUpload: "",
    };
  },
  methods: {
    ...mapActions(["detailToy", "editToy", "toyUploadImage", "clearMessage"]),
    handleFile(e) {
      if (this.fileUpload) {
        Axios.post("/api/toys/deleteImage", {
          fileName: this.fileUpload,
        }).then((response) => console.log(response));
      }
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      this.toyUploadImage(formData);
    },
    handleSubmit(e) {
      e.preventDefault();

      this.editToy({
        id: this.id,
        name: this.name,
        fileUpload: this.fileUpload,
        rentPrice: this.rentPrice,
        salePrice: this.salePrice,
        token: this.userInfo.token,
      });
    },
  },
  computed: {
    ...mapGetters([
      "loading",
      "error",
      "toy",
      "loading",
      "error",
      "success",
      "src",
      "loadingEdit",
      "errorEdit",
      "userInfo",
    ]),
  },
  created() {
    this.detailToy(this.id);
    this.clearMessage();
  },

  watch: {
    toy(newValue) {
      if (Object.keys(newValue).length !== 0) {
        this.name = newValue.name;
        this.rentPrice = newValue.rentPrice;
        this.salePrice = newValue.salePrice;
      }
    },
    success(newValue) {
      if (newValue === true) {
        this.$router.push(`/toy/${this.id}`);
      }
    },
    src(newValue) {
      if (newValue) {
        this.fileUpload = newValue;
      }
    },
  },
};
</script>

<style></style>
