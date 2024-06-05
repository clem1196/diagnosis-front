import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory('#'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    //Diagnosis
    {
      path: '/diagnosis',
      name: 'diagnosisList',
      component: () =>
        import(/* webpackChunkName: "diagnosisList" */ '@/components/diagnosis/diagnosisList.vue')
    },

    {
      path: '/diagnosis/detail/:id',
      name: 'diagnosisDetail',
      component: () =>
        import(
          /* webpackChunkName: "diagnosisDetail" */ '../components/diagnosis/diagnosisDetail.vue'
        )
    },
    {
      path: '/diagnosis/:name',
      name: 'diagnosisPatientDetail',
      component: () =>
        import(
          /* webpackChunkName: "diagnosisPatientDetail" */ '../components/diagnosis/diagnosisList.vue'
        )
    },
    {
      path: '/diagnosis/add',
      name: 'diagnosisAdd',
      component: () =>
        import(/* webpackChunkName: "diagnosisAdd" */ '../components/diagnosis/diagnosisList.vue')
    },
    {
      path: '/diagnosis/edit/:id',
      name: 'diagnosisEdit',
      component: () =>
        import(/* webpackChunkName: "diagnosisEdit" */ '../components/diagnosis/diagnosisList.vue')
    },
    {
      path: '/diagnosis/delete/:id',
      name: 'diagnosisDelete',
      component: () =>
        import(
          /* webpackChunkName: "diagnosisDelete" */ '../components/deleteComponent/removeComponent.vue'
        )
    },
    {
      path: '/diagnosis/graphics/:name',
      name: 'diagnosisGraphics',
      component: () =>
        import(
          /* webpackChunkName: "diagnosisGraphics" */ '../components/diagnosis/diagnosisList.vue'
        )
    }
  ]
})

export default router
