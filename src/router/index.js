import Vue from "vue";
import Router from "vue-router";

import store from "@/core/services/store";
import { SET_PREVIOUS_ROUTE } from "@/core/services/store/breadcrumbs.module";
import { RouteNames, LoginMode } from "@/constants/common.constants.js";

import userRoutes from "./user.js";
import adminRoutes from "./admin";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        userRoutes,
        adminRoutes,
        {
            path: "/",
            redirect: () => {
                var isLoggIn = store.state.auth.isLoggIn;
                if(isLoggIn) {
                    var mode = store.state.auth.loginMode;
                    return mode==LoginMode.ADMIN?{ name: 'home' }:{ name: 'dashboard' }
                }
                return { name: 'login' };
            },
            meta: { requiresAuth: false },
        },
       
        {
            name: "login",
            path: "/login",
            component: () => import("@/view/pages/auth/Login"),
            meta: { requiresAuth: false },
        },
        
        {
            name: "admin-login",
            path: "/admin/login",
            component: () => import("@/view/pages/auth/AdminLogin"),
            meta: { requiresAuth: false },
        },
        {
            path: "/onLogout",
            name: RouteNames.LOGOUT,
            redirect: () => {
                var mode = store.state.auth.loginMode;
                console.log(`mode:${mode}`);
                
                if(mode==LoginMode.ADMIN) {
                    return { name: 'admin-login' };
                }
                return { name: 'login' };
            },
            meta: { requiresAuth: false },
        },
        {
            path: "*",
            redirect: "/error/404",
            meta: { requiresAuth: false },
        },
        {
            path: "/error/403",
            name: "403",
            meta: { requiresAuth: false },
            component: () => import("@/view/pages/error/403.vue"),
        },
        {
            path: "/error/403/notadmin",
            name: "403NA",
            meta: { requiresAuth: false },
            component: () => import("@/view/pages/error/403NotAdmin.vue"),
        },
        {
            path: "/error/404",
            name: "404",
            meta: { requiresAuth: false },
            component: () => import("@/view/pages/error/404.vue"),
        }

    ]
});

router.beforeEach((to, from, next) => {
    if(to.hash=='' &&from.hash=='')
        store.dispatch(SET_PREVIOUS_ROUTE,{ title: from.name, route: from.fullPath });
    if(to.matched.some(r => r.meta.requiresAuth==true)) {
        // check if logged in
        var isLoggIn = store.state.auth.isLoggIn;
        if(!isLoggIn) {
            next({name: RouteNames.LOGOUT});
        } else {
            var mode = store.state.auth.loginMode;
            var isAdminPage = to.matched.some(r => r.meta.isAdmin);
            next();
        }
    }  
     next();
});

  export default router;
