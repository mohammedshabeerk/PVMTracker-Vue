import store from "@/core/services/store";

export default {
    path: "/user",
    component: () => import ("@/view/layout/user/Layout"),
    redirect: to => {
      var isLoggIn = store.state.auth.isLoggIn;
      return isLoggIn ? { name: 'dashboard' } : { name: 'login' };
  },
    meta: { requiresAuth: true, isAdmin: false },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/view/pages/user/Dashboard.vue")
      },  
    ]
};
