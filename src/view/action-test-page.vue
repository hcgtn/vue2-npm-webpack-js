<template>
    <div class="action-page">
        <h1>action-page</h1>
        <button @click="act">click me</button>
        <!-- <button @click="changeAct">change name</button> -->
    </div>
</template>
  
<script>
// const createProxy = require('../../dynamic_proxy');
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
            this.$HttpTool.post('xxx/',{name:'abc'});
            console.log('click action');
        },
        // changeAct(){
        //     createProxy().changeActive('Person1');
        // }
    }
}
</script>
  
<style scoped></style>
  