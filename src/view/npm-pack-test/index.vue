<template>
    <div class="npm-pack-test">
        <JSONEditor class="jsoneditor-warp" @change="jsonEiditorChange" />
    </div>
</template>
  
<script>
import JSONEditor from './JSONEditor';
export default {
    name: 'NpmTest',
    components: {
        JSONEditor
    },
    props: {

    },
    mounted() {

    },
    methods: {
        jsonEiditorChange(v) {
            console.log('jsonEiditorChange>>>>>', v)
        }
    }
}
</script>
  
<style scoped lang="less">
.npm-pack-test {
    .jsoneditor-warp{
        height: 200px;
        width:500px
    }
}
</style>
  