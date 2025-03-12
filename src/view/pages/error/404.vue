<template>
    <div class="d-flex flex-column flex-root">
        <div class="error error-5 d-flex flex-row-fluid bgi-size-cover bgi-position-center" :style="{ backgroundImage: `url(${backgroundImage})`, }" >
            <!-- begin:: Content -->
            <div class="container d-flex flex-row-fluid flex-column justify-content-md-center align-items-start p-12">
                <h1 class="error-title font-weight-boldest text-info mt-10 mt-md-0 mb-12">403</h1>
                <p class="font-weight-boldest display-4">Page Not Found</p>
                <p class="font-size-h3"> We cant find what you are looking for. </p>
                <router-link to="/" class="btn btn-light-primary font-weight-bold mr-2 mt-10">Go to Homepage</router-link>
            </div>
            <!-- end:: Content -->
        </div>
    </div>
</template>

<style lang="scss">
@import "@/assets/sass/pages/error/error-5.scss";
</style>

<script>
export default {
    name: "Error-5",
    mounted() {},
    computed: {
        backgroundImage() {
            return process.env.BASE_URL + "media/error/bg5.jpg";
        },
    },
};
</script>
