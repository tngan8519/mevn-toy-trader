<template>
  <div>
    <div v-if="loading">loading ...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="!loading && !error">
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4">
            <i class="fas fa-child"></i> <i class="fas fa-car"></i>
            <i class="fab fa-dribbble"></i> Explore toys
          </h1>
        </div>
      </div>
      <div id="toy">
        <div class="container">
          <div class="row">
            <div
              v-for="toy in toys"
              v-bind:key="toy._id"
              class="col-10 mx-auto my-3 col-md-6 col-lg-4"
            >
              <div class="card">
                <img
                  v-bind:src="'http://localhost:8000/' + toy.imgSrc"
                  class="card-img-top"
                  v-bind:alt="toy.name"
                />

                <div class="card-body">
                  <h5 class="card-title">{{ toy.name }}</h5>
                  <router-link
                    v-bind:to="'/toy/' + toy._id"
                    class="btn btn-primary"
                  >
                    More Info
                  </router-link>
                </div>
              </div>
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
  methods: mapActions(["toyBrowse"]),
  computed: { ...mapGetters(["toys", "loading", "error"]) },
  created() {
    this.toyBrowse();
  },
};
</script>

<style></style>
