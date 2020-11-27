<template>
  <div id="postPage">
    <div class="post">
      <h1>Create a new post</h1>
      <div v-if="loading">loading ...</div>
      <div v-if="error">{{ error }}</div>
      <form>
        <div class="form-group">
          <label for="name">Toy Name: </label>
          <input
            v-model="name"
            type="text"
            class="form-control"
            id="name"
            placeholder="Enter your toy name"
            required
          />
        </div>
        <div class="form-group">
          <label for="pic">Image: </label>

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
              placeholder="Enter rent price"
              min="0.01"
              step="0.01"
              required
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
              placeholder="Enter sale price"
              min="0.01"
              step="0.01"
              required
            />
            <div class="input-group-append">
              <div class="input-group-text">/ buy</div>
            </div>
          </div>
        </div>
        <button v-on:click="handleSubmit" type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Axios from "../axios";
export default {
  data() {
    return {
      name: "",
      rentPrice: "",
      salePrice: "",
      fileUpload: "",
    };
  },
  methods: {
    ...mapActions(["toyPost", "toyUploadImage", "clearMessage"]),
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
      console.log("bam");
      this.toyPost({
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
      "message",
      "success",
      "src",
      "userInfo",
    ]),
  },
  created() {
    this.clearMessage();
  },
  watch: {
    success(newValue) {
      if (newValue) {
        this.$router.push("/browse");
      }
    },
    src(newValue) {
      this.fileUpload = newValue;
    },
  },
};
</script>

<style></style>
