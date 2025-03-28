import { createRouter, createWebHistory } from 'vue-router'
import IsolationSourceView from '../views/IsolationSourceView.vue'
import HostSourceView from '../views/HostSourceView.vue'
import ReleaseDateView from '../views/ReleaseDateView.vue'
import DMSView from '../views/DMSView.vue'

const routes = [
    {
        path: '/',
        name: 'ReleaseDate',
        component: ReleaseDateView
    },
    {
        path: '/isolation-source',
        name: 'IsolationSource',
        component: IsolationSourceView
    },
    {
        path: '/host-source',
        name: 'HostSource',
        component: HostSourceView
    },
    {
        path: '/dms',
        name: 'DMS',
        component: DMSView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router