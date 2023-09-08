# 简介
1. 基于 `vxe-table` 的 `vxe-grid` 表格组件封装
2. 主要功能如下
   - 前端数据渲染/后端请求渲染 
   - 分页/非分页
   - 前端分页/后端分页
   - 插槽配置/render配置
   - 大数据量虚拟滚动配置
   - 前端筛选/后端筛选
   - 冻结列配置
   - loading配置
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
## 前端渲染
## 后端渲染
## 前端分页
## 后端分页

# API
## props
## events
## slot
## methods
## props-column