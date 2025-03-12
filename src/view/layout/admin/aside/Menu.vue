<template>
    <ul class="menu-nav font-weight-bold mt-lg-15  mt-md-0 mb-0 pb-0" :class="color" >
        
    </ul>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { RouteNames } from "@/constants/common.constants";
import { LOGOUT } from "@/core/services/store/auth.module";

export default {
    name: "KTMenu",
    data(){
        return{
            
        }
    },
    computed: {
        
        ...mapGetters(["color"]),

    },
    mounted() {
    },
    methods: {
        hasActiveChildren(match) {
            return this.$route["path"].indexOf(match) !== -1;
        },
        
        onLogout() {
      this.$log.info('routenames',RouteNames);
      this.$store.dispatch(LOGOUT).then(() => this.$router.push({ name: RouteNames.LOGOUT }));
    },
    },
    
};
</script>
