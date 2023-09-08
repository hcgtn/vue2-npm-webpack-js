<template>
  <div class="virtual">
    虚拟表格测试
    <button @click="searchData">查询</button>
    <VirtualTable ref="aaa" :columns="columns" :data="dataList"></VirtualTable>
  </div>
</template>

<script>
/**
 * [虚拟表格构建流程]
 // 1. 规定分页与非分页数据结构,并访问请求成功
 // 2. 下载安装 vxeTable 插件并引入成功 vex-grid,配置一个简单的表格
 * 3. 利用数据渲染 vxe-grid 实现更新查询方法,参数加入
      1. 代理loading查询
      - 2. 外部loading查询 /分页/非分页 插槽/render 
      3. 分页查询
      4. 非分页查询
      5. render渲染
      6. slot渲染
      7. 表头slot渲染
      8. 表头render渲染
      9. 参数传递配置
      10. 数据key配置
      11. 前端分页
      12. 后端分页
 * 4. 非分页机制加入,参数传递正确
 * 5. 前端渲染&后端渲染
 * 6. loading机制加入
 * 7. 空白页显示加入
 * 8. 冻结列配置测试
 * 9. 空数据默认测试
 * 10. 超出悬浮测
 * 11. 插槽机制渲染加入
 * 12. render机制渲染加入
 * 13. 虚拟表格配置加入
 * 14. 前端分页/后端分页
 * 15. 前端筛选/后端筛选
 * 16. 字典转义
 * 17. 字符串格式化
 * 
 */
import VirtualTable from './Virtual-table-coms';
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
        { field: "id", title: "字段名id" },
        { field: "uuid", title: "字段名uuid" },
        { field: "name", title: "字段名name" },
        { field: "amount1", title: "字段名amount1" },
        { field: "amount2", title: "字段名amount2" },
        { field: "amount3", title: "字段名amount3" },
        { field: "amount4", title: "字段名amount4" },
        { field: "amount5", title: "字段名amount5" },
        { field: "amount6", title: "字段名amount6" },
        { field: "amount7", title: "字段名amount7" },
        { field: "amount8", title: "字段名amount8" },
        { field: "amount9", title: "字段名amount9" },
        { field: "amount10", title: "字段名amount10" },
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
        { field: "amount30", title: "字段名amount30" },
      ]
    };
  },
  methods: {
    searchData() {
      console.log('查询表格');
      this.tableUpdateData();
    },
    async tableUpdateData() {
      try {
        this.$refs['aaa'].setLoading(true);
        let res = await this.$HttpTool.post('table-list/', { name: 'abc' });
        this.dataList = res.data.body.data;
      } catch (e) {
        console.error(e)
      } finally {
        this.$refs['aaa'].setLoading(false);
      }
    },
    tableListApi() {
      return this.$HttpTool.post('table-list/', { name: 'abc' });
    },
    tablePageListApi() {
      return this.$HttpTool.post('table-page-list/', { name: 'abc' });
    }
  }
}
</script>

<style scoped>
.virtual {
  min-width: 1200px;
}
</style>

