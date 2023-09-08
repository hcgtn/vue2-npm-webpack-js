<template>
  <div id="app">
    <SlideBar />
    <router-view></router-view>
  </div>
</template>

<script>

import SlideBar from '@/components/slide-bar.vue';

export default {
  name: 'App',
  components: {
    SlideBar
  },
  data() {
    return {
    }
  },
  mounted() {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}
</style>
