import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false }
    },
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('access_token')
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth && !token) {
        // Redirect to login if route requires auth and user is not authenticated
        next('/login')
    } else if (to.path === '/login' && token) {
        // Redirect to dashboard if user is already logged in
        next('/')
    } else {
        next()
    }
})

export default router
