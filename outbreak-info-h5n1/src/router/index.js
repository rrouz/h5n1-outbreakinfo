import { createRouter, createWebHistory } from 'vue-router'
import IsolationSourceView from '../views/IsolationSourceView.vue'
import HostSourceView from '../views/HostSourceView.vue'
import ReleaseDateView from '../views/ReleaseDateView.vue'
import DMSView from '../views/DMSView.vue'
import MutationView from '../views/MutationView.vue'
import PrevalenceView from '../views/PrevalenceView.vue'

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
    },
    {
        path: '/mutations',
        name: 'Mutations',
        component: MutationView
    },
    {
        path: '/prevalence',
        name: 'Prevalence',
        component: PrevalenceView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router