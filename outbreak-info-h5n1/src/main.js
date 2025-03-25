import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import IsolationSourceView from './views/IsolationSourceView.vue'
import HostView from './views/HostSourceView.vue'  // Import the new component

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IsolationSourceView
    },
    {
      path: '/isolations',
      name: 'isolations',
      component: IsolationSourceView
    },
    {
      path: '/hosts',  // Add the new route
      name: 'hosts',
      component: HostView
    }
  ]
})

const app = createApp(App)

app.use(router)

app.mount('#app')

router.push('/')