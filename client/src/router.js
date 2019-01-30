import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/login-register',
      name: 'loginregister',
      component: () => import('./views/login-register.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('./views/detail.vue')
    },
    {
      path: '/questions',
      name: 'questions',
      component: () => import('./views/questions.vue'),
      children: [{
        path: 'ask',
        name: 'askquestion',
        component: () => import('./components/home/askquestion.vue')
      }, {
        path: 'update/:id',
        name: 'updatequestion',
        component: () => import('./components/home/updatequestion.vue')
      }]
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/profile.vue')
    }
  ]
})
