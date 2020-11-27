<template>
  <div id="registerPage">
    <div class="post">
      <h1>Create a new account</h1>
      <div v-if="loadingUser">loading ...</div>
      <div v-if="errorUser">{{ errorUser }}</div>
      <form>
        <div class="form-group">
          <label for="name">User Name: </label>
          <input
            v-model="username"
            type="text"
            class="form-control"
            id="name"
            placeholder="Enter your user name"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password: </label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter your password"
            required
          />
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

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["register", "clear"]),
    handleSubmit(e) {
      e.preventDefault();
      this.register({ username: this.username, password: this.password });
    },
  },
  computed: {
    ...mapGetters(["loadingUser", "errorUser", "userInfo"]),
  },
  watch: {
    userInfo(newValue) {
      if (newValue) {
        this.$router.push("/");
      } else {
        this.clear();
      }
    },
  },
};
</script>

<style></style>
