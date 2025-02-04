console.log('router/index.js')
import { createRouter, createWebHashHistory, Route } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'
import DefaultLayoutStandAlone from '@/standalone/layouts/DefaultLayoutStandAlone'

/*define const other in here*/

console.log(process.env.VUE_APP_STANDALONE_SINGLE_SPA)

const routes = [
  {
    path: '/',
    name: 'Home',
    component:
      process.env.VUE_APP_STANDALONE_SINGLE_SPA === 'true'
        ? DefaultLayoutStandAlone
        : DefaultLayout,
    redirect:
      process.env.VUE_APP_STANDALONE_SINGLE_SPA !== 'true' &&
      (!localStorage.id_token || localStorage.id_token == '')
        ? () => {
            window.location.href = process.env.dc + '/#/sc/login'
            // return '/redirectingToLogin' // not important since redirecting
          }
        : '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/abnormality/Dashboard.vue'),
      },
      {
        path: '/input-problem',
        name: 'InputProblem',
        component: () => import('@/views/abnormality/InputProblem.vue'),
      },

      /*define other in here*/
    ],
  },
  {
    path: '/404',
    name: 'Page404',
    component: () => import('@/views/pages/Page404'),
  },
  {
    path: '/500',
    name: 'Page500',
    component: () => import('@/views/pages/Page500'),
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
