<template>
  <div class="virtual-table">
    <vxe-grid ref="vxe-grid" v-bind="{ ...gridOptions, ...$attrs }" v-on="$listeners">
      <template #pager>
        <vxe-pager v-if="ifFrontPage || ifEndPage" background
          :layouts="['Total', 'Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump']"
          :current-page.sync="tablePage.currentPage" :page-size.sync="tablePage.pageSize" :total="tablePage.total"
          :page-sizes="tablePage.pageSizes" align="center" @page-change="handlePageChange">
          <div slot="right">{{ `共${totalPageNum}页` }}</div>
        </vxe-pager>
        <div class="foot-total-tag" v-else-if="footTotalTag">{{ `共${gridOptions.data.length}条记录` }}</div>
      </template>
    </vxe-grid>
  </div>
</template>
<script>

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * 当需要表格内部查询数据需要传入一个查询函数
     * 返回一个promise,查询成功后会抛出 on-change 事件返回查询结果(body)
     */
    apiRequestPromiseFun: {
      type: Function,
      default: () => Promise.resolve(true)
    },
    /**
     * 有些时候后端数给的并不规范,如果需要表格内部查询,就必须保证取得正确的key
     * 默认为body.data ,但有些时候 可能是层级比较深的数据 比如说 body.fundsA.list
     * 那么这个字符串应该取 “fundA.list”
     */
    getDataListFromBodyKeysStr: {
      type: String,
      default: 'data'
    },
    /**
     * 是否前端分页
     * 前端处理分页,展示分页组件
     * 后端数据结构不变
     */
    ifFrontPage: {
      type: Boolean,
      default: false
    },
    /**
     * 是否后端分页
     * 后端处理分页,要与前端约定好数据结构
     * 展示分页组件
     */
    ifEndPage: {
      type: Boolean,
      default: false
    },
    /**
     * 非分页时是否展示记录数量
     */
    footTotalTag: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    data(val) {
      this.resetTablePage();
      /**
       * 直接传入数据渲染时
       * 数据变动,表格的数据重新刷新
       */
      this.gridOptions.data = val || [];
      this.tablePage.total = val.length;
      /**
       * 如果是前端分页需要做数据处理
       */
      this.ifFrontPage && this.seqDataMethod();
    },
    columns: {
      handler(val) {
        /**
         * 列配置变化,表格变化
         */
        this.gridOptions.columns = val || [];
      },
      immediate: true
    },
    loading(val) {
      /**
       * 外部配置loading,表格进入加载状态
       */
      console.log('loading change>>', val);
      this.gridOptions.loading = val;
    }
  },
  computed: {
    totalPageNum() {
      return Math.ceil(this.data.length / this.tablePage.pageSize);
    }
  },
  data() {
    return {
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 30, 50, 100, 200]
      },
      gridOptions: {
        border: false,
        resizable: true,
        showOverflow: true,
        loading: false,
        height: 560,
        'empty-text': "--",
        'emptyText': "--",
        align: 'center',// 表头位置居中
        showHeaderOverflow: true,//表头单行,悬浮显示
        columns: [],
        data: []
      }
    }
  },
  created() { },
  mounted() {

  },
  methods: {
    resetTablePage(p = {}) {
      this.tablePage = {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 30, 50, 100, 200]
        , ...p
      }
    },
    seqDataMethod() {
      this.gridOptions.data = this.data.filter((item, rowIndex) => {
        const s = (this.tablePage.currentPage - 1) * this.tablePage.pageSize;
        const e = this.tablePage.currentPage * this.tablePage.pageSize;
        return s <= rowIndex && rowIndex < e;
      })
    },
    handlePageChange({ currentPage, pageSize }) {
      console.log({ currentPage, pageSize })
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.seqDataMethod();
    },
    getGridTable() {
      return this.$refs['vxe-grid'];
    },
    setLoading(loading) {
      this.gridOptions.loading = loading;
    }
  }
}

</script>

<style lang="less" scoped>
.virtual-table {
  width: 100%;

  .vxe-pager .vxe-pager--right-wrapper {
    &>div {
      line-height: 2.2;
    }

    margin: 0;
  }

  .foot-total-tag {
    text-align: right;
  }
}
</style>