<template>
  <div class="slide-bar">
    <router-link class="item" v-for="(item, index) in $router.options.routes" :key="index" :to="item.path">{{ item.name
    }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'SlideBar',
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.slide-bar {
  display: flex;
  flex-direction: column;
  width: 200px;
  text-align: left;
  overflow-y: auto;
}
</style>
