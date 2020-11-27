import Axios from "../../axios";

const state = {
  loading: false,
  error: false,
  message: "",
  toys: [],
  toy: {},
  loadingDelete: false,
  errorDelete: false,
  suceess: false,
  src: "",
  loadingEdit: false,
  errorEdit: false,
};
const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  message: (state) => state.message,
  toys: (state) => state.toys,
  toy: (state) => state.toy,
  loadingDelete: (state) => state.loadingDelete,
  errorDelete: (state) => state.errorDelete,
  success: (state) => state.success,
  src: (state) => state.src,
  loadingEdit: (state) => state.loadingEdit,
  errorEdit: (state) => state.errorEdit,
};
const actions = {
  async toyBrowse({ commit }) {
    commit("TOY_BROWSE_REQUEST");
    try {
      const { data } = await Axios.get("/api/toys");
      commit("TOY_BROWSE_SUCCESS", data);
    } catch (error) {
      commit(
        "TOY_BROWSE_FAIL",
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  },
  async detailToy({ commit }, id) {
    commit("TOY_DETAIL_REQUEST", id);
    try {
      const { data } = await Axios.get(`/api/toys/${id}`);
      commit("TOY_DETAIL_SUCCESS", data);
    } catch (error) {
      commit(
        "TOY_DETAIL_FAIL",
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  },
  async toyPost({ commit }, { name, fileUpload, rentPrice, salePrice, token }) {
    commit("TOY_POST_REQUEST", name, fileUpload, rentPrice, salePrice, token);
    try {
      const { data } = await Axios.post(
        "/api/toys",
        { name, imgSrc: fileUpload, rentPrice, salePrice },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("TOY_POST_SUCCESS", data.toy);
    } catch (error) {
      commit(
        "TOY_POST_FAIL",
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  },
  async editToy(
    { commit },
    { id, name, fileUpload, rentPrice, salePrice, token }
  ) {
    commit("TOY_EDIT_REQUEST", name, fileUpload, rentPrice, salePrice, token);
    try {
      const { data } = await Axios.put(
        `/api/toys/${id}`,
        { name, imgSrc: fileUpload, rentPrice, salePrice },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("TOY_EDIT_SUCCESS", data.toy);
    } catch (error) {
      commit(
        "TOY_EDIT_FAIL",
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  },
  async deleteToy({ commit }, { id, token }) {
    commit("TOY_DELETE_REQUEST", id);
    try {
      const { data } = await Axios.delete(`/api/toys/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("TOY_DELETE_SUCCESS", data.message);
    } catch (error) {
      commit(
        "TOY_DELETE_FAIL",
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  },
  async toyUploadImage({ commit }, formData) {
    try {
      const response = await Axios.post("/api/toys/uploadImage", formData, {
        header: { "content-type": "multipart/form-data" },
      });
      if (response.data.success) {
        commit("TOY_IMAGE_UPLOAD", response.data.image);
      }
    } catch (error) {
      commit("TOY_IMAGE_UPLOAD_FAIL", "Failed to save the Image in Server");
    }
  },
  clearMessage({ commit }) {
    commit("CLEAR_MESSAGE");
  },
};
const mutations = {
  TOY_BROWSE_REQUEST: (state) => {
    state.loading = true;
  },
  TOY_BROWSE_SUCCESS: (state, payload) => {
    state.toys = payload;
    state.loading = false;
  },
  TOY_BROWSE_FAIL: (state, payload) => {
    state.error = payload;
    state.loading = false;
  },
  TOY_DETAIL_REQUEST: (state) => {
    state.loading = true;
  },
  TOY_DETAIL_SUCCESS: (state, payload) => {
    state.toy = payload;
    state.loading = false;
  },
  TOY_DETAIL_FAIL: (state, payload) => {
    state.error = payload;
    state.loading = false;
  },
  TOY_POST_REQUEST: (state) => {
    state.loading = true;
  },
  TOY_POST_SUCCESS: (state, payload) => {
    state.toy = payload;
    state.loading = false;
    state.success = true;
  },
  TOY_POST_FAIL: (state, payload) => {
    state.error = payload;
    state.loading = false;
  },
  TOY_EDIT_REQUEST: (state) => {
    state.loadingEdit = true;
  },
  TOY_EDIT_SUCCESS: (state, payload) => {
    state.toy = payload;
    state.loadingEdit = false;
    state.success = true;
  },
  TOY_EDIT_FAIL: (state, payload) => {
    state.errorEdit = payload;
    state.loadingEdit = false;
  },
  TOY_DELETE_REQUEST: (state) => {
    state.loadingDelete = true;
  },
  TOY_DELETE_SUCCESS: (state, payload) => {
    state.message = payload;
    state.loadingDelete = false;
  },
  TOY_DELETE_FAIL: (state, payload) => {
    state.errorDelete = payload;
    state.loadingDelete = false;
  },
  TOY_IMAGE_UPLOAD: (state, payload) => {
    state.src = payload;
  },
  TOY_IMAGE_UPLOAD_FAIL: (state, payload) => {
    state.message = payload;
  },
  CLEAR_MESSAGE: (state) => {
    state.message = "";
    state.success = false;
  },
};
export default { state, getters, actions, mutations };
