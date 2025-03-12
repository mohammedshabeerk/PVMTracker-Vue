<template>
    <div class="sidebar d-flex flex-column bg-light shadow-sm p-6 ">
        <router-link :to="{ name: 'home' }" v-slot="{ href, navigate, isActive, isExactActive }">
            <a :href="href" class="nav-link d-flex align-items-center p-6 my-6 rounded" @click="navigate"
                :class="[isActive ? 'active bg-primary text-white' : 'text-dark']">
                <i class="fas fa-home mx-4"></i>
                <span class="fw-bold">Dashboard</span>
            </a>
        </router-link>

        <router-link :to="{ name: 'monthlyReports' }" v-slot="{ href, navigate, isActive, isExactActive }">
            <a :href="href" class="nav-link d-flex align-items-center p-6 my-3 rounded" @click="navigate"
                :class="[isActive ? 'active bg-primary text-white' : 'text-dark']">
                <i class="fas fa-book mx-4"></i>
                <span class="fw-bold">Monthly Reports</span>
            </a>
        </router-link>
    </div>
</template>

<style scoped>
.sidebar {
    height: 100vh;
    width: 250px;
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: auto;
}
.nav-link {
    transition: background 0.3s, color 0.3s;
}
.nav-link:hover {
    background: #007bff;
    color: white;
}
</style>

<script>
export default {
    name: "KTMenuAdmin",
    data() {
        return {
           
        }
    },
    mounted() {
    },
    methods: {
        hasActiveChildren(match) {
            return this.$route["path"].indexOf(match) !== -1;
        },
        
    },
};
</script>
