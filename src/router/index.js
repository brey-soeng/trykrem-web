import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Login from '@/views/admin/login/index'
import Register from '@/views/admin/register/index'
import error401 from '@/views/admin/401/index'
import Layout from '@/layout'
import Profile from '@/views/admin/profile/index'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        name: 'Dashboard',
        path: '/dashboard',
        meta: {
          title: 'Home',
          // icon: 'index',
          affix: true,
          noCache: true
        },
        component: () => import('@/views/admin/dashboard/index')
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/register',
    component: Register,
    hidden: true
  },
  {
    path: '/401',
    component: error401,
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/admin/redirect/index')
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: Profile,
        name: 'Profile',
        meta: { title: 'Profile' }
      }
    ]
  }
]

const createRouter = () => new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
