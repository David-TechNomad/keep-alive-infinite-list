<template>
  <div class="about">
    about me!!!
    <input type="text" v-model="x" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      x: ""
    };
  }
};
</script>

<style scoped>
.about {
  padding: 30px;
  text-align: center;
}
</style>