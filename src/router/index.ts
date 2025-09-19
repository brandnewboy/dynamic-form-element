import { createWebHashHistory, createRouter, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/form',
    },
    {
        path: '/form',
        component: () => import('@/views/EGFormBuilder.vue'),
        meta: {
            title: '动态构建表单'
        }
    },
    {
        path: '/table',
        component: () => import('@/views/EGTableBuilder.vue'),
        meta: {
            title: '动态构建表单&数据表格'
        }
    },
]

export const menuRoutes = { ...routes.filter(item => item.path !== '/') }

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})