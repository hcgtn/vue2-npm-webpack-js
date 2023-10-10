
<template>
  <span :class="['xxx', big ? 'big' : '']">{{ value }}</span>
</template>


<script>

export default {
  name: 'EmwAmount',
  props: {
    value: {
      type: String,
      default: ''
    },
    big: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style scoped>
.xxx {
  color: green
}

.big {
  font-size: 24px;
}
</style>