<template>
  <div id="kt_header_mobile" class="header-mobile align-items-center bg-light" v-bind:class="headerClasses">
    <!--begin::Logo-->
    <a href="/">
    </a>
    <!--end::Logo-->



    <!--begin::Toolbar-->
    <div class="d-flex align-items-center">
      
      <!--begin::Quick user-->
      <!-- <button class="rounded-circle bg-secondary p-2 ml-3 mr-3 border-0 w-30px h-30px" id="kt_header_mobile_topbar_toggle"
        ref="kt_header_mobile_topbar_toggle">
        <img src="@/custom/media/icons/User.svg" width="20" />
      </button> -->
      <KTQuickUser></KTQuickUser>
      <!--end::Quick user-->
      <!--begin::Aside Mobile Toggle-->
      <button class="btn p-0 burger-icon-left ml-3 fs-20px" id="kt_aside_mobile_toggle">
        <!-- <img src="@/custom/media/icons/burger.svg" width="40"> -->
        <i class="fa fa-bars" aria-hidden="true"></i>
      </button>
      <!--end::Aside Mobile Toggle-->
    </div>
    <!--end::Toolbar-->
    
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import KTLayoutHeaderTopbar from "@/assets/js/layout/base/header-topbar.js";
import KTQuickUser from "@/view/layout/extras/offcanvas/QuickUser.vue";
export default {
  name: "KTHeaderMobile",
  components: { KTQuickUser,},
 
  mounted() {
    // Init Header Topbar For Mobile Mode
    KTLayoutHeaderTopbar.init(this.$refs["kt_header_mobile_topbar_toggle"]);
  },
  computed: {
    ...mapGetters(["layoutConfig", "getClasses"]),

    /**
     * Get header logo
     * @returns {string}
     */
    headerLogo() {
      return process.env.BASE_URL + this.layoutConfig("self.logo.dark");
    },

    /**
     * Get classes for mobile header
     * @returns {null|*}
     */
    headerClasses() {
      const classes = this.getClasses("header_mobile");
      if (typeof classes !== "undefined") {
        return classes.join(" ");
      }
      return null;
    },

    /**
     * Check if the left aside menu is enabled
     * @returns {boolean}
     */
    asideEnabled() {
      return !!this.layoutConfig("aside.self.display");
    }
  }
};
</script>
