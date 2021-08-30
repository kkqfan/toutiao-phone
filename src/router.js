import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/login",
      name:"Login",
      component:() => import("@/views/login")
    },
    {
      path:"/",
      component:() => import("@/views/layout"),
      children:[
        {
          path:'', //默认子路由
          name:"home",
          component:()=>import("@/views/home")
        },
        {
          path:'/qa',
          name:"qa",
          component:()=>import("@/views/qa")
        },
        {
          path:'/video',
          name:"video",
          component:()=>import("@/views/video")
        },
        {
          path:'/my',
          name:"my",
          component:()=>import("@/views/my")
        },
      ]
    },
    {
      path:"/search",
      name:"search",
      component:()=>import ("@/views/search/")
    },
    {
      path:"/article/:articleId",
      name:"article",
      component:()=>import ("@/views/article/"),
      props:true  //将动态路由参数映射到组件的 props 中
    },{
      path:"/user/profile",
      name:"userProfile",
      component:()=>import ("@/views/user-profile/"),
    }
  ]
  //141193
})
