import router from ".";
import { authStore } from "@/stores";

export const authMiddlware = () => {
    router.beforeEach((to, from, next) => {
        const isLoggedIn = localStorage.getItem('access_token');
        if (to.matched.some((record) => record.meta.requiresAuth)) {
            if (!isLoggedIn) {
                next({ name: 'login' });
            } else {
                const user = authStore.value.user;
                const userRole = user.role;
                if (to.meta.roles && !to.meta.roles.includes(userRole)) {
                    console.log('403');
                    next({ name: 'dashboard' });
                }
            }
        } else {
            if (isLoggedIn && to.name === 'login') {
                next({ name: 'dashboard' });
            }
        }
        next();
    });

    router.afterEach((to, from) => {
        console.log('afterEach: ', to, from);
    });
};