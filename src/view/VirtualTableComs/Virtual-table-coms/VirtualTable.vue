<template>
  <div class="virtual-table">
    <vxe-grid ref="vxe-grid" v-bind="{ ...gridOptions, scrollY, scrollX, ...$attrs }" v-on="$listeners">

      <div slot="empty">空白数据定制模版</div>

      <template v-for="defaultName in defaultSlots" v-slot:[defaultName]="{ row, column, rowIndex, columnIndex }">
        <!-- 默认插槽空值处理 -->
        <template v-if="columns[columnIndex]?.slotDefaultType === 'default'">
          <template v-if="!tableCellEmpty(row[column.property])">
            <EmwAmount v-if="defaultName === 'EmwAmount'" :key="`default_${defaultName}_EmwAmount`" slot="EmwAmount"
              v-bind="{ value: row[column.property], ...columns[columnIndex].defaultSlotProps }">
            </EmwAmount>
            <slot v-else :name="defaultName" :row="row" :column="column" :rowIndex="rowIndex" :columnIndex="columnIndex"
              :cellValue="row[column.property]"></slot>
          </template>
          <span v-else :key="`default_${defaultName}_empty`">{{ '--' }}</span>
        </template>
        <!-- 如果为自定义插槽类型没有空值处理 -->
        <template v-else>
          <slot :name="defaultName" :row="row" :column="column" :rowIndex="rowIndex" :columnIndex="columnIndex"
            :cellValue="row[column.property]"></slot>
        </template>
      </template>

      <template v-for="headerName in headerSlots" v-slot:[headerName]="{ row, column, rowIndex, columnIndex }">
        <slot :name="headerName" :row="row" :column="column" :rowIndex="rowIndex" :columnIndex="columnIndex"></slot>
      </template>

      <template v-for="footerName in footerSlots" v-slot:[footerName]="{ row, column, rowIndex, columnIndex }">
        <slot :name="footerName" :row="row" :column="column" :rowIndex="rowIndex" :columnIndex="columnIndex"></slot>
      </template>

      <template #pager>
        <vxe-pager v-if="ifPage && gridOptions?.data?.length" background
          :layouts="['Total', 'Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump']"
          :current-page.sync="tablePage.currentPage" :page-size.sync="tablePage.pageSize" :total="tablePage.total"
          :page-sizes="tablePage.pageSizes" align="center" @page-change="handlePageChange">
          <div slot="right">{{ `共${totalPageNum}页` }}</div>
        </vxe-pager>
        <div class="foot-total-tag" v-if="ifPage && footTotalTag && gridOptions?.data?.length">{{
          `共${tablePage.total || 0}条记录` }}</div>
      </template>

    </vxe-grid>
  </div>
</template>
<script>

const getObjectByKeys = (obj, keys) => {
  const len = keys.length;
  if (len === 0) return obj;
  const tK = keys.shift();
  if (tK in obj) {
    return getObjectByKeys(obj[tK], keys);
  } else {
    return undefined;
  }
}
const splitStrByChar = (str, tag = '.') => {
  return str?.split(tag) || [];
}

const tableCellEmpty = (v) => {
  return v === '' || v === undefined || v === null;
}

/**
 * 为了让虚拟滚动表格更好适应项目
 * 在虚拟滚动表格插槽中植入一些高频组件
 * 配置插槽时直接用
 * columns:{
 *  defaultSlotProps:{...组件的props}
 *  slots:{
 *    default:'EmwAmount'
 *  }
 * }
 */
const CommonComNames = ['EmwAmount'];
import EmwAmount from '../EmwAmount.vue'
export default {
  components: {
    EmwAmount
  },
  props: {
    /**
     * 外部传入展示数据
     * 支持数组和对象，如果为对象要使用 getDataListFromBodyKeysStr 取值
     * 最终传给表格的data一定是数组格式
     */
    data: {
      type: [Array, Object],
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
      type: [Function, undefined],
      // default: () => Promise.resolve(true)
      default: undefined
    },
    /**
     * 有些时候后端数给的并不规范,如果需要表格内部查询,就必须保证取得正确的key
     * 默认为body.data ,但有些时候 可能是层级比较深的数据 比如说 body.fundsA.list
     * 那么这个字符串应该取 “fundA.list”
     * 前端上送的分页参数也是依据后端制定的，所以如果是前度分页，
     * 那么抛出的分页参数默认为 keysStr 是由 ‘.’ 分割的最后一端字符串
     * 如 'data.body.pageSize' => pageSize 
     */
    getDataListFromBodyKeysStr: {
      type: String,
      default: 'data.body.data'
    },
    getPageNumFromBodyKeysStr: {
      type: String,
      default: 'data.body.pageNum'
    },
    getPageSizeFromBodyKeysStr: {
      type: String,
      default: 'data.body.pageSize'
    },
    getTotalFromBodyKeysStr: {
      type: String,
      default: 'data.body.total'
    },
    /**
     * 是否前端分页
     * 前端处理分页,展示分页组件
     * 后端数据结构不变
     */
    frontPage: {
      type: Boolean,
      default: false
    },
    /**
     * 是否后端分页
     * 后端处理分页,要与前端约定好数据结构
     * 展示分页组件
     */
    endPage: {
      type: Boolean,
      default: false
    },
    /**
     * 非分页时是否展示记录数量
     */
    footTotalTag: {
      type: Boolean,
      default: true
    },
    /**
     * 默认初始化分页设置
     * 一般也就配置 pageSize 和 pageSizes
     */
    pageOptions: {
      type: Object,
      default: () => ({
        pageSize: 23,
        pageSizes: [10, 23, 30, 50, 60, 100, 200]
      })
    },
    /**
     * 除了分页参数以外的其他参数
     */
    otherParams: {
      type: [Object, null],
      default: () => null
    },
    /**
     * 当内部请求时是否自动请求
     * 如果手动请求请使用 requestList
     */
    autoRequest: {
      type: Boolean,
      default: true
    },
    /**
     * 虚拟滚动配置
     * 默认开启
     */
    scrollY: {
      type: Object,
      default: () => ({
        enabled: true,
        gt: 30,
        oSize: 0
      })
    },
    scrollX: {
      type: Object,
      default: () => ({
        enabled: true,
        gt: 20,
        oSize: 0
      })
    },
    /**
     * 外部筛选函数配置
     * 适用于前端自己的筛选显示
     * 外部要配置筛选调教
     * 配合 outerFilterUpdate 对外api使用
     */
    filterGridOptionsDataMethod: {
      type: Function,
      default: () => true
    },
    /**
     * 外部列表处理函数配置
     * 有些接口返回数据不理想，需要表格自动处理成理想的数据列表
     * 最好要求后端处理返回理想的数据，实在不行出此下策
     */
    mapGridOptionsDataListFactory: {
      type: Function,
      default: i => i
    }
  },
  watch: {
    data(v) {
      this.outerRequestDataTableInit(v);
    },
    columns: {
      handler(val) {
        /**
         * 列配置变化,表格变化
         */
        this.gridOptions.columns = val || [];
        this.columnsInit();
      },
      immediate: true
    },
    loading(val) {
      /**
       * 外部配置loading,表格进入加载状态
       */
      // console.log('loading change>>', val);
      this.gridOptions.loading = val;
    }
  },
  computed: {
    /**
     * 根据 page 参数在返回体中的取值字符串获取分页参数
     * 分页参数默认配置 pageSize pageNum, total
     */
    pageNumKey() {
      return this.getPageNumFromBodyKeysStr?.split('.')?.pop() || 'pageNum';
    },
    pageSizeKey() {
      return this.getPageSizeFromBodyKeysStr?.split('.')?.pop() || 'pageSize';
    },
    totalKey() {
      return this.getTotalFromBodyKeysStr?.split('.')?.pop() || 'total';
    },
    ifPage() {
      return this.frontPage || this.endPage;
    },
    totalPageNum() {
      return Math.ceil(this.tablePage?.total / this.tablePage?.pageSize);
    },
    /**
     * 获取数据模式
     * 1. 外部传入data数据
     *    如果data为数组，那么直接渲染表格
     *    如果data为对象，需要传入 getDataListFromBodyKeysStr 由内部取值
     * 2. 内部请求获取列表数据
     *    需要传入 getDataListFromBodyKeysStr 取值，getDataListFromBodyKeysStr默认为 ‘data’
     */
    getDataModal() {
      return typeof this.apiRequestPromiseFun === 'function' ? 'inter_request_data' : 'exter_props_data'
    },
    pageRequestParams() {
      const { currentPage, pageSize } = this.tablePage;
      return { [this.pageNumKey]: currentPage, [this.pageSizeKey]: pageSize, ...this.otherParams };
    },
    /**
     * 插槽名获取 start
     */
    defaultSlots() {
      return this.slotsFilter('default')
    },
    headerSlots() {
      return this.slotsFilter('header')
    },
    footerSlots() {
      return this.slotsFilter('footer')
    },
    /**
     * 插槽名获取 end
     */

  },
  data() {
    return {
      // 内部请求数据
      inerRequestData: null,
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
        align: 'center',// 表头位置居中
        showHeaderOverflow: true,//表头单行,悬浮显示
        columns: [],
        data: []
      }
    }
  },
  created() {
    this.resetTablePage();
    // 内部请求数据
    if (this.getDataModal === 'inter_request_data' && this.autoRequest) {
      this.requestList();
    }
  },
  mounted() {
    // this.throwCurrentPageParams();
  },
  methods: {
    outerRequestDataTableInit(v) {
      // 外部传入数据
      /**
       * 直接传入数据渲染时
       * 数据变动,表格的数据重新刷新
       * 如果外部传入的是数组，那就直接取
       * 如果外部传入的非数组，就要依赖 getDataListFromBodyKeysStr 取值
       */
      if (!v) return;
      const list = this.tableListData(v);
      !this.frontPage && (this.gridOptions.data = list);
      this.tablePage.total = list.length;
      /**
       * 如果是前端分页需要做数据处理
       */
      this.frontPage && this.seqDataMethod(v);
      this.throwCurrentPageParams();
    },
    interRequestDataTableInit() {
      // 内部请求数据
      /**
       * 内部请求数据渲染
       */
      if (this.inerRequestData === null) return;
      const list = this.tableListData(this.inerRequestData);
      this.gridOptions.data = list;
      if (this.frontPage) {
        this.tablePage.total = list.length;
        this.seqDataMethod(this.inerRequestData);
      }
      if (this.endPage) {
        this.tablePage.total = getObjectByKeys(this.inerRequestData, splitStrByChar(this.getTotalFromBodyKeysStr)) || 0;
      }
      this.throwCurrentPageParams();
    },
    /**
     * 对外API
     * 当配置了 filterGridOptionsDataMethod 时
     * 主动触发筛选数据
     * 无论是内部请求还是外部请求，都不做请求，直接进行数据筛选
     * 但一定要重置分页参数
     */
    outerFilterUpdate() {
      this.resetTablePage();
      if (this.getDataModal === 'inter_request_data') {
        // 内部请求
        this.interRequestDataTableInit();
      } else {
        // 外部请求
        this.outerRequestDataTableInit(this.data);
      }
      this.$refs['vxe-grid'].updateData();
    },
    tableCellEmpty,
    columnsInit() {
      /**
       * 空数据默认格式化
       */
      this.formatEmptyColumns();
      /**
       * 扩展通用组件自定义参数
       */
      this.addSlotPropsColumns();
    },
    formatEmptyColumns() {
      this.columns.forEach(col => {
        /**
         * 没有插槽设置的时候采用的是 formatter 渲染
         * 涉及相关配置项
         * 原生 formatter [function]
         * 拓展 formatterOptions [Object/Array] 下文有注释
         * 拓展 formatterType [enum: 'default'/'custom'/'options']
         */
        if (!col?.slots?.default) {
          const f = col?.formatter;
          /**
           *  格式化类型枚举 
           *  默认 default （如果空值显示 ‘--’）
           *  自定义 custom （不会添加空值 ‘--’ 机制）
           *  枚举 options （根据字典转义码值）
           */
          const formatterOptions = col?.formatterOptions;
          const type = col?.formatterType || 'default';
          const emptyF = ({ cellValue: v }) => tableCellEmpty(v) ? '--' : v;

          if (typeof f === 'function') {
            // 如果定义了格式化，则对格式化函数进行一次包装
            if (type === 'default') {
              col.formatter = ({ ...p }) => {
                const { cellValue: v } = p;
                return tableCellEmpty(v) ? '--' : f({ ...p });
              }
            } else if (type === 'custom') {
              // 如果是自定义直接返回
              col.formatter = ({ ...p }) => {
                return f({ ...p });
              }
            }
          } else if (!f) {
            if (type !== 'options') {
              // 如果没有设置格式化，则设置默认值
              col.formatter = emptyF;
            } else {
              // 定义了options 就根据options进行 码-值 转义
              if (Array.isArray(formatterOptions)) {
                // formatterOptions 兼容 
                // [
                //   {value:<code>,text:<label>},
                //   {value:<code>,text:<label>},
                //   ...
                // ] 
                // 数据格式
                col.formatter = ({ ...p }) => {
                  const { cellValue: v } = p;
                  // console.log(v, formatterOptions)
                  return formatterOptions.find(i => i?.value === v)?.text || '--';
                }
              } else if (typeof formatterOptions === 'object') {
                const keys = Object.keys(formatterOptions);
                col.formatter = ({ ...p }) => {
                  const { cellValue: v } = p;
                  if (tableCellEmpty(v) || !keys.includes(v)) {
                    // return JSON.stringify(keys);
                    return '--';
                  } else {
                    if (typeof formatterOptions[v] === 'object') {
                      // formatterOptions 兼容 
                      // { 
                      //   <code1>:{text:<label>,value:<code>},
                      //   <code2>:{text:<label>,value:<code>},
                      //    ...
                      // } 
                      // 数据格式
                      return formatterOptions[v]?.text || '--';
                    } else {
                      // formatterOptions 兼容 
                      // { 
                      //   <code1>:value1,
                      //   <code2>:value2,
                      //    ...
                      // } 
                      // 数据格式
                      return formatterOptions[v] || '--';
                    }
                  }
                }
              }
            }
          }
        }
        /**
         * 有render函数时涉及配置参数
         * 拓展 slotDefaultType [enum: 'default'/'custom']
         * 当 default 时 数据为空默认 ‘--’
         * 当为 custom 时 自定义
         */
        const slotDefaultType = col?.slotDefaultType || 'default';
        col.slotDefaultType = slotDefaultType; // 这里赋值，模版需要做判断
        if (typeof col?.slots?.default === 'function' && slotDefaultType === 'default') {
          const render_f = col?.slots?.default;
          col.slots.default = ({ ...p }) => {
            const { row, column } = p;
            const v = row[column.property];
            return tableCellEmpty(v) ? '--' : render_f({ ...p });
          }
        }
        /**
         * 有插槽，如果数据为空，数据默认 ‘--’
         */
        // if(typeof col?.slots?.default === 'string' && slotDefaultType === 'default'){
        // 具体实现在模版里实现
        // }

        // if(slotDefaultType === 'custom'){
        // 不做任何操作
        // }
      });
    },
    addSlotPropsColumns(){
      this.columns.forEach(col=>{
        /**
         * 如果配置有通用插槽组件的话，默认props为 defaultSlotProps
         */
        if(CommonComNames.includes(col?.slots?.default)){
          col.defaultSlotProps = col?.defaultSlotProps || {}
        }
      })
    },
    slotsFilter(slotType) {
      return this.columns.filter(i => i?.slots && i?.slots[slotType] && typeof i?.slots[slotType] === 'string').map(x => x?.slots[slotType]);
    },
    async requestList() {
      if (this.getDataModal === 'exter_props_data') throw new Error('参数错误，未配置内部请求api');
      this.gridOptions.loading = true;
      try {
        const params = this.endPage ? this.pageRequestParams : this.otherParams;
        this.inerRequestData = await this.apiRequestPromiseFun(params);
        this.interRequestDataTableInit();
      } catch (e) {
        this.resetTable();
        console.log(e);
      } finally {
        this.gridOptions.loading = false;
      }
    },
    resetTable() {
      this.gridOptions.data = [];
      this.inerRequestData = null;
      this.setLoading(false);
      this.resetTablePage();
      this.autoRequest && this.getDataModal === 'inter_request_data' && this.requestList();
    },
    tableListData(v) {
      const originList = Array.isArray(v) ? v : (getObjectByKeys(v, splitStrByChar(this.getDataListFromBodyKeysStr)) || []);
      return originList.filter(this.filterGridOptionsDataMethod).map(this.mapGridOptionsDataListFactory);
    },
    resetTablePage(p = {}) {
      this.tablePage = {
        total: 0,
        currentPage: 1,
        pageSize: this.pageOptions.pageSize[0],
        pageSizes: this.pageOptions.pageSizes,
        ...this.pageOptions,
        ...p
      }
    },
    seqDataMethod(data) {
      this.gridOptions.data = this.tableListData(data).filter((item, rowIndex) => {
        const s = (this.tablePage.currentPage - 1) * this.tablePage.pageSize;
        const e = this.tablePage.currentPage * this.tablePage.pageSize;
        return s <= rowIndex && rowIndex < e;
      });
      // console.log(this.gridOptions.data)
    },
    throwCurrentPageParams() {
      const tableData = this.gridOptions.data;
      let requestParams;
      let pageParams;
      // 分页-前端分页
      if (this.ifPage && this.frontPage) {
        requestParams = this.otherParams;
        pageParams = this.tablePage;
      }
      // 分页-后端分页
      if (this.ifPage && this.endPage) {
        requestParams = this.pageRequestParams;
        pageParams = this.tablePage;
      }
      // 非分页
      if (!this.ifPage) {
        requestParams = this.otherParams;
        pageParams = null;
      }
      this.$emit('change', tableData, requestParams, pageParams);
    },
    async handlePageChange({ currentPage, pageSize }) {
      // console.log({ currentPage, pageSize })
      this.tablePage.currentPage = currentPage;
      this.tablePage.pageSize = pageSize;
      if (this.getDataModal === 'exter_props_data') {
        // 如果是后端分页，外部传入数据的话，直接抛出分页参数即可
        this.frontPage && this.seqDataMethod(this.data);
        this.throwCurrentPageParams();
      } else if (this.getDataModal === 'inter_request_data') {
        if (this.frontPage) {
          this.seqDataMethod(this.inerRequestData);
          this.throwCurrentPageParams();
        }
        // 如果是内部请求数据又是后端分页，那么必须在request响应结果后才能跑出change事件
        this.endPage && await this.requestList();
      }
    },
    getGridTable() {
      return this.$refs['vxe-grid'];
    },
    /**
     * 
     * @param {外部设置loading} loading
     * 支持两种设置loading的模式，还可以直接传入props:loading设置 
     */
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