<template>
  <div class="jsx-page">
    {{ res }}
    <Input v-model="a" placeholder="输入数字" style="width: 300px" />
    <Input v-model="b" placeholder="输入数字" style="width: 300px" />
    <button @click="cal">计算</button>
  </div>
</template>

<script>
// import math from 'mathjs' ;
import {
  add,
} from 'mathjs';
export default {
  name: 'MathTest',
  components: {
  },
  props: {

  },
  mounted() {
    // const a = math.add(1.2,2.);
    console.log('a>>>>', add(1.2, 1.3));
  },
  data() {
    return {
      res: '',
      a: '',
      b: '',
    };
  },
  methods: {
    cal() {
      console.log(add(this.a, this.b));

      this.res = add(this.a, this.b);
    },

  },
};
</script>

<style scoped></style>
