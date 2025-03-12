<template>
  <div
    id="kt_header_mobile"
    class="header-mobile align-items-center bg-header-mobile  {"
    v-bind:class="headerClasses" 
  >
    <!--begin::Logo-->
    <div class="d-flex justify-content-between align-items-center pt-3 w-100">
      <a href="/">
    </a>
     <!--end::Logo-->
     <div class="d-flex align-items-center">
      <!--begin: Search -->
      <div class=" rounded-pill  ml-auto">
      <b-input-group class="fk-search rounded-pill h-30px max-w-150px mr-5  ml-auto">
      <b-input-group-prepend>
        <span class="input-group-text bg-transparent border-0 h-30px"><img src="@/custom/media/svg/magnifying-glass-solid.svg" width="15" class="opacity-40"></span>
      </b-input-group-prepend>
      <b-form-input class="border-0 bg-transparent pl-0 py-1 h-30px" size="lg" placeholder="search">
      </b-form-input>
      </b-input-group>
    </div>
    <!--end: Search -->
 
    <!--begin: User Bar -->
    <div class="user-mobile d-flex d-lg-none">
    <KTQuickUser></KTQuickUser>
  </div>
    <!--end: User Bar -->
   
    <!--begin::Toolbar-->
    <div class="d-flex align-items-center">
      <!--begin::Aside Mobile Toggle-->
      <button
        v-if="asideEnabled"
        class="btn p-0 burger-icon burger-icon-left"
        id="kt_aside_mobile_toggle"
      >
        <span></span>
      </button>
      <!--end::Aside Mobile Toggle-->
      <!--begin::Header Menu Mobile Toggle-->
      <button
        class="btn p-0 burger-icon ml-4"
        id="kt_header_mobile_toggle"
        ref="kt_header_mobile_toggle"
      >
        <span></span>
      </button>
      <!--end::Header Menu Mobile Toggle-->
      <!--begin::Topbar Mobile Toggle-->
      <button
        class="btn btn-icon btn-hover-transparent-white p-0 ml-3 d-none"
        id="kt_header_mobile_topbar_toggle"
        ref="kt_header_mobile_topbar_toggle"
      >
        <span class="svg-icon svg-icon-xl">
          <!--begin::Svg Icon | path:svg/icons/General/User.svg-->
          <inline-svg class="svg-icon" src="media/svg/icons/General/User.svg" />
          <!--end::Svg Icon-->
        </span>
      </button>
      <!--end::Topbar Mobile Toggle-->
    </div>

  </div>
    <!--end::Toolbar-->
  </div>
    <!--begin: sidebar notification -->
    <!--end: sidebar notification -->
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import KTLayoutHeaderTopbar from "@/assets/js/layout/base/header-topbar.js";
import KTQuickUser from "@/view/layout/extras/offcanvas/QuickUser.vue";
export default {
  name: "KTHeaderMobile",
  components: {   KTQuickUser,},
  data() {
    return {
      
      languageFlag: "",
    };
  },
  
  mounted() {
    // Init Header Topbar For Mobile Mode
    KTLayoutHeaderTopbar.init(this.$refs["kt_header_mobile_topbar_toggle"]);
    
  },
  
  methods: {


onLanguageChanged() {
  this.languageFlag = this.languages.find(val => {
    return val.lang === i18nService.getActiveLanguage();
  }).flag;
}, 

},
  computed: {
    ...mapGetters(["layoutConfig", "getClasses","currentUser"]),

    /**
     * Get header logo
     * @returns {string}
     */
    headerLogo() {
      return process.env.BASE_URL + this.layoutConfig("self.logo.sticky");
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
  } ,
  
};
</script>
<style>
 .user-mobile .topbar-item.pl-5{padding-left: 0px!important;}
 .bg-header-mobile{background-color: #F5F3EF;}
</style>
