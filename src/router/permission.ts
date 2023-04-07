/** @format */

import type { Router } from 'vue-router'
import { useAuthStoreWithout } from '@/store/modules/auth'

export function setupPageGuard(router: Router) {
    router.beforeEach(async (to, from, next) => {
        const authStore = useAuthStoreWithout()
        if (authStore.token) {
            if (to.path === '/login') next({ name: 'Root' })
            else next()
        } else {
            if (to.path === '/login') next()
            else next({ name: 'login' })
        }
    })
}
