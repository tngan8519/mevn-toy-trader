import Vuex from "vuex";
import toy from "./modules/toy";
import user from "./modules/user";

const store = new Vuex.Store({
  modules: { toy, user },
});

export default store;
