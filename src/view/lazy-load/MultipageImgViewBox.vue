<template>
  <div class="multipagei-mg-view-box">
    <div class="lazyload">
      <img class="image-item" v-for="(img, index) in images" :key="sc(img) + index" :id="sc(img)" v-lazy="img"
        lazy="loading" />
    </div>
    <a @click.prevent.stop="pre">上一页</a>
    第{{ num }}页
    <a @click.prevent.stop="next">下一页</a>
  </div>
</template>

<script>
let sc = s => (s || '').replace(/[:/.]/g, '');
export default {
  name: 'MultipageImgViewBox',
  components: {
  },
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      num: 0,
      account: 0,
      sc,
    }
  },
  created() {
    if (this.images?.length) this.num = 1;
  },
  computed: {
    t_src() {
      return sc(this.images[this.num-1]);
    }
  },
  methods: {
    pre() {
      this.account--;
      if (this.account <= 0) this.account = 0;
      this.num = this.account % this.images?.length + 1
      this.goToEl();
    },
    next() {
      if (this.num === this.images?.length) {
        this.account = 15;
        return;
      }
      this.account++;
      this.num = this.account % this.images?.length + 1
      this.goToEl();
    },
    goToEl() {
      var el = document.getElementById(this.t_src);
      el && el.scrollIntoView(
        {
          behavior: "smooth",  // 平滑过渡
          block: "start"  // 上边框与视窗顶部平齐。默认值
        }
      );
    }
  }
}
</script>

<style  scoped>
.multipagei-mg-view-box {
  width: 100%;
  height: 500px;
}

.lazyload {
  overflow: scroll;
  background-color: rgba(55, 55, 55, .6);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

img {
  display: block;
}

img[lazy=loading] {
  background: red;
}
img[lazy=error] {
  width:100px;
  height: 500px;
  background-color: #fff;
}

.image-item {
  width: 700px;
  margin: auto;

}
</style>
  