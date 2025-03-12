import store from "@/core/services/store";
export default {
    path: "/admin",
    redirect: to => {
        var isLoggIn = store.state.auth.isLoggIn;
        return isLoggIn ? { name: 'home' } : { name: 'admin-login' };
    },
    component: () =>
        import("@/view/layout/admin/Layout"),
    meta: { requiresAuth: true, isAdmin: 'ADMIN' },
    children: [
        {
            path: "home",
            name: "home",
            component: () =>
                import("@/view/pages/admin/dashboard/Home.vue")
        },
        {
            path: "monthlyReports",
            name: "monthlyReports",
            component: () =>
                import("@/view/pages/admin/monthlyReportView/MonthlyReport.vue")
        },
       


    ]
}