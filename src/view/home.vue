<template>
    <div class="app">
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>
  
<script>
import HelloWorld from '../components/hello-world';
export default {
    name: 'HomePage',
    components: {
        HelloWorld
    },
    props: {

    },
    mounted() {
    }
}
</script>
  
<style scoped>
    .app{
        display: flex;
    }
</style>
  