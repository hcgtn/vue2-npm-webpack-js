<template>
    <div class="get-ip">
        getIP
    </div>
</template>

<script>

// import ip from 'ip';
// import * as lite from 'caniuse-lite';
import UAParser from 'ua-parser-js';

export default {
  name: 'GetIp',
  components: {
  },
  props: {

  },
  mounted() {
    // const ipAddress = ip.address();
    // console.log('ipAddress>>>',ipAddress)
    // console.log(lite.features['flexbox']);
    // let f  = lite.features['flexbox'];
    // console.log(lite.feature(f));

    const parser = new UAParser();
    const result = parser.getResult();
    console.log(result.browser);
    console.log(result.device);
    console.log(result.os);
    console.log(result.os.version);
    console.log(result.engine.name);
    console.log(result.cpu.architecture);
    console.log(result);
  },
  methods: {

  },
};
</script>

<style scoped></style>
