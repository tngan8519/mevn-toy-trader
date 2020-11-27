<template>
  <div>
    <div v-if="loading">loading ...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="!loading && !error" class="containerDetail">
      <div class="card the">
        <div class="row no-gutters">
          <div class="col-md-7 col-lg-6 d-flex align-items-center">
            <img
              v-bind:src="'http://localhost:8000/' + toy.imgSrc"
              class="card-img"
              v-bind:alt="toy.name"
            />
          </div>
          <div class="col-md-4 offset-md-1 col-lg-4">
            <div class="card-body">
              <h5 class="card-title text-info">{{ toy.name }}</h5>
              <p class="card-text">{{ toy.rentPrice }} /week rent</p>
              <p class="card-text">{{ toy.salePrice }} /buy</p>
              <p class="card-text">or trade</p>
              <p class="card-text">
                <small class="text-muted">
                  Created by {{ toy.author.username }} -
                  {{ new Date(toy.createdAt).toUTCString() }}
                </small>
              </p>
              <div v-if="userInfo && toy.author._id === userInfo._id">
                <router-link
                  v-bind:to="'/toy/' + toy._id + '/edit'"
                  class="btn btn-warning"
                >
                  Edit
                </router-link>

                <button
                  v-on:click="handleDelete(toy._id)"
                  class="btn btn-danger"
                >
                  Delete
                </button>
              </div>
              <div v-if="loadingDelete">loading ...</div>
              <div v-if="errorDelete">{{ errorDelete }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  methods: {
    ...mapActions(["detailToy", "deleteToy"]),
    handleDelete(id) {
      this.deleteToy({ id: id, token: this.userInfo.token });
    },
  },
  computed: {
    ...mapGetters([
      "toy",
      "loading",
      "error",
      "message",
      "loadingDelete",
      "errorDelete",
      "userInfo",
    ]),
  },
  created() {
    this.detailToy(this.id);
  },
  watch: {
    message() {
      this.$router.push("/browse");
    },
  },
};
</script>

<style></style>
