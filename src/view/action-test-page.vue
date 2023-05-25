<template>
    <div class="action-page">
        <h1>action-page</h1>
        <button @click="act">click me</button>
    </div>
</template>
  
<script>
export default {
    name: 'ActionTestPage',
    components: {
    },
    props: {

    },
    mounted() {
    },
    methods:{
        act(){
            console.log('click action');
        }
    }
}
</script>
  
<style scoped></style>
  