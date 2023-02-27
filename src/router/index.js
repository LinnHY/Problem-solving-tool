import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home'), // 路由懒加载，只有当path:'/'被访问的时候才加载Home组件
    },
]

export default new Router({
    mode: 'history', // 路由工作在history模式
    base: process.env.BASE_URL,
    routes,
})
