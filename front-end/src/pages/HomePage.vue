<template>
  <div>
    <div
      class="main d-flex align-items-center justify-content-center text-capitalize"
    >
      <div>
        <div class="text-center py-3 title">
          <span class="welcome">welcome</span> to toy trader
        </div>
        <div class="d-flex justify-content-center">
          <router-link class="btn mx-2 btnOne" to="/post">
            post toy
          </router-link>
          <router-link class="btn mx-2 btnTwo" to="/browse">
            browse toy
          </router-link>
        </div>
      </div>
    </div>
    <div class="changeBcg">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
