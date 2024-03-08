<template>
    <div class="action-page">
        <h1>action-page</h1>
        <button @click="act">click me</button>
        <select name="选择环境" id="x" @change="changeEnv">
            <option value="test">测试</option>
            <option value="person1">Person1</option>
            <option value="person2">Person2</option>
            <option value="serve">Serve</option>
        </select>
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
  methods: {
    act() {
      this.$HttpTool.post('xxx/', {name: 'abc'});
      console.log('click action');
    },
    changeEnv($event) {
      this.$HttpTool.changeBaseUrl($event.target.value);
    },
  },
};
</script>

<style scoped></style>
