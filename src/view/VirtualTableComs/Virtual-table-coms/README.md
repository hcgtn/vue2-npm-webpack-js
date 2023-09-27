# 简介
1. 基于 `vxe-table` 的 `vxe-grid` 表格组件封装
2. 主要功能如下
  - 外部请求 非分页
  - 外部请求 前端分页
  - 外部请求 后端分页
  - 内部请求 非分页
  - 内部请求 前端分页
  - 内部请求 后端分页
  - render渲染
  - slot渲染
  - 空数据：三个方面限制
    1. formatter
    2. slots slot
    3. slots render
  -  数据自定义格式化
  -  冻结列配置
  -  虚拟滚动配置
  -  筛选配置（前端筛选，后端筛选）待扩展
  -  其他功能参考 https://vxetable.cn/#/grid/api 自行扩展
# 约定
## 主要约定如下
- 非分页请求参数约定
``` json
{
  "body":{
    // ...params
  },
  "head":{}
}
```
- 非分页返回参数约定
``` json
{
  "head":{},
  "body":{
    "data":[
      // {},
    ]
  }
}
```
- 分页请求参数约定
``` json
{
  "body":{
    "pageNum":1,
    "pageSize":10
    // ...other params
  },
  "head":{}
}
```
- 分页返回参数
``` json
{
  "head":{},
  "body":{
    "data":[
      // {},
    ],
    "total":1000,
    "pageSize":10
  }
}
```
# 示例
``` vue
<template>
  <div class="virtual">
    虚拟表格测试
    <button @click="searchData">外部查询</button>
    <button @click="update">内部查询</button>
    <button @click="reset">重置</button>

    <!-- 1. 外部请求 非分页 -->
    <!-- <VirtualTable ref="virtualTable" :columns="columns" :data="dataList" getDataListFromBodyKeysStr="data" @change="tableChange">
    </VirtualTable> -->

    <!-- 2. 外部请求 前端分页 -->
    <!-- <VirtualTable ref="virtualTable" :columns="columns" :data="dataList" getDataListFromBodyKeysStr="data" frontPage @change="tableChange">
    </VirtualTable>  -->

    <!-- 3. 外部请求 后端分页 -->
    <!-- <VirtualTable ref="virtualTable" :columns="columns" :data="dataList" getDataListFromBodyKeysStr="data"
      :otherParams="{ name: 'virtualTable' }" endPage @change="tableChange">
    </VirtualTable> -->

    <!-- 4. 内部请求 非分页 -->
    <!-- <VirtualTable ref="virtualTable" :columns="columns" :apiRequestPromiseFun="tablePageListApi" 
       :otherParams="{ name: 'virtualTable' }" :autoRequest="true"
      @change="tableChange">
    </VirtualTable> -->

    <!-- 5. 内部请求 前端分页 -->
    <!-- <VirtualTable ref="virtualTable" :columns="columns" :apiRequestPromiseFun="tablePageListApi" frontPage
       :otherParams="{ name: 'virtualTable' }" :autoRequest="true"
      @change="tableChange">
    </VirtualTable> -->

    <!-- 6. 内部请求 后端分页 -->
    <!-- <VirtualTable ref="virtualTable" :columns="columns" :apiRequestPromiseFun="tablePageListApi" endPage
      :otherParams="{ name: 'virtualTable' }" :autoRequest="true" @change="tableChange">
    </VirtualTable> -->

    <!-- 7. 插槽渲染 -->
    <!-- <VirtualTable ref="virtualTable" :columns="columns" :apiRequestPromiseFun="tablePageListApi" endPage
      :otherParams="{ name: 'virtualTable' }" :autoRequest="true" :showFooter="true" :footerMethod="footerMethod"
      @change="tableChange">
      <template #cell-empty="data"> {{ data.row }} </template>
      <template #name-header="data"> {{ 'name' + data.columnIndex }} </template>
      <template #name-footer="data"> {{ 'footer>>' + JSON.stringify(Object.keys(data)) }} </template>
    </VirtualTable> -->

    <!-- 8. render渲染 -->
    <!-- 略... 查看 https://vxetable.cn/#/grid/api -->

    <!-- 9. 空数据拦截-三种空数据拦截 formatter/slots/render -->
    <!-- <VirtualTable ref="virtualTable" :columns="columns" :apiRequestPromiseFun="tablePageListApi" endPage
      :otherParams="{ name: 'virtualTable' }" :autoRequest="true" @change="tableChange">
      <template #amount10slot="data">
        {{ `slot定义插槽：${data.cellValue}` }}
      </template>
    </VirtualTable> -->

    <!-- 9. 字典转义-三种数据字典结构 -->
    <!-- <VirtualTable ref="virtualTable" :columns="columns" :apiRequestPromiseFun="tablePageListApi" endPage
      :otherParams="{ name: 'virtualTable' }" :autoRequest="true" @change="tableChange">
    </VirtualTable> -->

    <!-- 10. 冻结列配置 fixed / 虚拟滚动配置 scrollX scrollY [已经默认开启] -->
    <VirtualTable ref="virtualTable" :columns="columns" :apiRequestPromiseFun="tablePageListApi" endPage
      :otherParams="{ name: 'virtualTable' }" :autoRequest="true" @change="tableChange">
    </VirtualTable>
  </div>
</template>


<script>
/**
 * [虚拟滚动表格二次封装组件-功能目录]
 * 1. 外部请求 非分页
 * 2. 外部请求 前端分页
 * 3. 外部请求 后端分页
 * 4. 内部请求 非分页
 * 5. 内部请求 前端分页
 * 6. 内部请求 后端分页
 * 7. render渲染
 * 8. slot渲染
 * 9. 空数据：三个方面限制
 *    1. formatter
 *    2. slots slot
 *    3. slots render
 * 10. 数据自定义格式化
 * 11. 冻结列配置
 * 12. 虚拟滚动配置
 * 13. 筛选配置（前端筛选，后端筛选）待扩展
 * ... 其他功能参考 https://vxetable.cn/#/grid/api 自行扩展
 */

import VirtualTable from './Virtual-table-coms';
/**
 * 转义字典配置
 */
const types1 = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
}
const types2 = {
  A: { text: '一', value: '1' },
  B: { text: '二', value: '2' },
  C: { text: '三', value: '3' },
  D: { text: '四', value: '4' },
}
const types3 = [
  { text: '1111', value: '1' },
  { text: '2222', value: '2' },
  { text: '333', value: '3' },
  { text: '4444', value: '4' },
]
const formatEmpty = (v) => {
  if (v === '' || v === null || v === undefined || isNaN(v)) {
    return '--';
  } else {
    return v;
  }
}
export default {
  name: 'VirtualTable-test',
  components: {
    VirtualTable
  },
  props: {
  },
  mounted() {
    // let res = this.$HttpTool.post('table-list/', { name: 'abc' });
    // let res2 = this.$HttpTool.post('table-page-list/', { name: 'abc' });
    // console.log(res)
    // console.log(res2)
  },
  data() {
    return {
      rowConfig: {
        useKey: true,
        keyField: 'uuid',
      },
      dataList: [],
      columns: [
        {
          field: "id",
          title: "字段名id",
          minWidth: '150px',
          slots: {
            default: ({ row }) => {
              return [<div style={{ color: 'red' }}>{row.id}</div>]
            },
            header: () => {
              return [<span>{"自定义表头字段名ID"}</span>]
            }
          },
          fixed: "left"
        },
        { field: "uuid", title: "字段名uuid" },
        {
          field: "name", title: "字段名name",
          // 自定义格式化渲染
          formatter: ({ cellValue: v }) => {
            return 'formatter>>>' + formatEmpty(v);
          },
          slots: {
            // slot 渲染
            // default: ({ row, column }) => {
            //   const v = row[column.property];
            //   return 'slots>>>'+formatEmpty(v)
            // }
            // 插槽渲染
            // default: 'cell-empty',
            // header: 'name-header',
            // footer: 'name-footer',
          }
        },
        { field: "amount1", title: "字段名amount1", formatterType: 'options', formatterOptions: types1, minWidth: '150px' },
        { field: "amount2", title: "字段名amount2", formatterType: 'options', formatterOptions: types1, minWidth: '150px' },
        { field: "amount3", title: "字段名amount3", minWidth: '150px' },
        { field: "amount4", title: "字段名amount4", formatterType: 'options', formatterOptions: types2, minWidth: '150px' },
        { field: "amount5", title: "字段名amount5", formatterType: 'options', formatterOptions: types2, minWidth: '150px' },
        { field: "amount6", title: "字段名amount6", formatterType: 'options', formatterOptions: types3, minWidth: '150px' },
        { field: "amount7", title: "字段名amount7", formatterType: 'options', formatterOptions: types3, minWidth: '150px' },
        {
          field: "amount8", title: "字段名amount8", formatterType: 'custom', formatter: ({ cellValue: v }) => {
            return '自定义格式化' + v;
          }
        },
        {
          field: "amount9",
          title: "字段名amount9--",
          minWidth: '150px',
          // slotDefaultType:'custom',
          slots: {
            default: ({ ...p }) => {
              const { row, column } = { ...p };
              // console.log({ row, column })
              // console.log(this.columns[columnIndex])
              const v = row[column.property];
              return 'slots-render>>>' + formatEmpty(v)
            }
          }
        },
        {
          field: "amount10", title: "字段名amount10",
          minWidth: '150px',
          // slotDefaultType:'custom',
          slots: {
            default: 'amount10slot'
          }
        },
        { field: "amount11", title: "字段名amount11" },
        { field: "amount12", title: "字段名amount12" },
        { field: "amount13", title: "字段名amount13" },
        { field: "amount14", title: "字段名amount14" },
        { field: "amount15", title: "字段名amount15" },
        { field: "amount16", title: "字段名amount16" },
        { field: "amount17", title: "字段名amount17" },
        { field: "amount18", title: "字段名amount18" },
        { field: "amount19", title: "字段名amount19" },
        { field: "amount20", title: "字段名amount20" },
        { field: "amount21", title: "字段名amount21" },
        { field: "amount22", title: "字段名amount22" },
        { field: "amount23", title: "字段名amount23" },
        { field: "amount24", title: "字段名amount24" },
        { field: "amount25", title: "字段名amount25" },
        { field: "amount26", title: "字段名amount26" },
        { field: "amount27", title: "字段名amount27" },
        { field: "amount28", title: "字段名amount28" },
        { field: "amount29", title: "字段名amount29" },
        { field: "amount30", title: "字段名amount30", minWidth: '150px', fixed: "right" },
      ]
    };
  },
  methods: {
    footerMethod({ columns, data }) {
      return [
        columns.map(column => {
          if (['sex', 'num'].includes(column.field)) {
            return data
          }
          return null
        })
      ]
    },
    tableChange(d, p, r) {
      console.log(d, p, r);
      {/* this.tableUpdateData(v); // 外部数据传入，后端分页，需要在这里再次查询 */ }
    },
    searchData() {
      console.log('查询表格');
      this.tableUpdateData({ name: '外部请求非分页' });
    },
    async tableUpdateData(p) {
      try {
        this.$refs['virtualTable'].setLoading(true);
        // let res = await this.$HttpTool.post('table-list/', p);
        let res = await this.$HttpTool.post('table-page-list/', p);
        this.dataList = res.data.body;
        console.log(this.dataList)
      } catch (e) {
        console.error(e)
      } finally {
        this.$refs['virtualTable'].setLoading(false);
      }
    },
    tableListApi(p) {
      return this.$HttpTool.post('table-list/', p);
    },
    tablePageListApi(p) {
      return this.$HttpTool.post('table-page-list/', p);
    },
    update() {
      console.log('update')
      this.$refs['virtualTable'].requestList(); // 主动跟新
    },
    reset() {
      console.log('resetTable')
      this.$refs['virtualTable'].resetTable(); // 主动重置
    }
  }
}
</script>

<style scoped>
.virtual {
  min-width: 1200px;
}
</style>
```