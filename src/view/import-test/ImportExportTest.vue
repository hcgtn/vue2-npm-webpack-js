<template>
  <div class="export-test">
    <p>倒入倒出实验 - fun </p>
  </div>
</template>

<script>
// 引入实验
// import * as all from './utils/servers';

// 函数式编程-按需引入
// import {bbb} from './utils/servers';
// console.log(bbb());

// 面向对象式编程,类型引入
// import Server from './utils/serversClass';
// console.log(Server.aaa());

// lodash 引入
import {get} from 'lodash';
console.log(get({a: 'aaaa'}, 'a', 'none'));

export default {
  name: 'ImportExportTest',
  components: {
  },
  props: {

  },
  mounted() {
  },
  methods: {

  },
};
</script>

<style scoped></style>
