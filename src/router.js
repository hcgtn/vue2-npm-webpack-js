import Router from 'vue-router';
export default ()=>{
    return new Router({
        mode:'hash',
        base:'cyc',
        routes:[
            {
                path:'/',
                redirect:'/home'
            },
            {
                path:'/home',
                name:'首页',
                component:()=>import(/* webpackChunkName: "home" */'./view/home.vue')
            },
            {
                path:'/act',
                name:'按钮操作',
                component:()=>import(/* webpackChunkName: "home" */'./view/action-test-page.vue')
            }
        ]
    })
}

