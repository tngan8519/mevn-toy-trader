<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark text-capitalize">
    <router-link class="navbar-brand" to="/">
      Toy Trader
    </router-link>
    <div class="d-flex justify-content-end">
      <router-link v-if="userInfo" class="nav-router-link disabled" to="/#">
        Hi {{ userInfo.username }}
      </router-link>
      <router-link
        v-if="userInfo"
        v-on:click="handleLogout"
        class="nav-router-link"
        to="/#"
      >
        Sign Out
      </router-link>

      <router-link v-if="userInfo" class="nav-router-link" to="/post">
        Post
      </router-link>

      <router-link v-if="!userInfo" class="nav-router-link" to="/login">
        Sign In
      </router-link>
      <router-link v-if="!userInfo" class="nav-router-link" to="/register">
        Register
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-router-link" to="/browse">
            Browse
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["signOut"]),
    handleLogout() {
      this.signOut();
    },
  },
  computed: mapGetters(["userInfo"]),
};
</script>

<style></style>
