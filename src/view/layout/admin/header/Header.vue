<template>
  <!-- begin:: Header -->
  <div
    id="kt_header"
    ref="kt_header"
    class="header  h-auto fk-custom-header-admin mt-lg-0 mt-17"
    v-bind:class="[headerClasses,color]"
  >
    <div class="container-fluid d-flex justify-content-between px-0 ml-auto align-items-center">
      <Subheader :breadcrumbs="breadcrumbs"></Subheader>
    
      <!-- begin:: Header Menu -->
       
      <!-- end:: Header Menu -->
      <KTTopbar></KTTopbar>
   
    </div>
  </div>
  <!-- end:: Header -->
</template>

<script>
import { mapGetters } from "vuex";
import KTTopbar from "@/view/layout/admin/header/Topbar.vue";
import KTLayoutHeader from "@/assets/js/layout/base/header.js";
import KTLayoutHeaderMenu from "@/assets/js/layout/base/header-menu.js";
import Subheader from "@/view/layout/admin/header/Subheader.vue";
// import KTMenu from "@/view/layout/header/Menu.vue";

export default {
  name: "KTHeader",
  props:{
    notificationList:Array
  },
  components: {
    KTTopbar,
    Subheader
},
  mounted() {
    // Init Desktop & Mobile Headers
    KTLayoutHeader.init("kt_header", "kt_header_mobile");

    // Init Header Menu
    KTLayoutHeaderMenu.init(
      this.$refs["kt_header_menu"],
      this.$refs["kt_header_menu_wrapper"]
    );

    const headerRef = this.$refs["kt_header"];

    headerRef.querySelectorAll("a[class='menu-link']").forEach(item => {
      item.addEventListener("click", () => {
        KTLayoutHeaderMenu.getOffcanvas().hide();
      });
    });
  },
  computed: {
    ...mapGetters(["layoutConfig", "getClasses", "color","breadcrumbs"]),

    /**
     * Check if the header menu is enabled
     * @returns {boolean}
     */
    headerMenuEnabled() {
      return !!this.layoutConfig("header.menu.self.display");
    },

    /**
     * Get extra classes for header based on the options
     * @returns {null|*}
     */
    headerClasses() {
      const classes = this.getClasses("header");
      if (typeof classes !== "undefined") {
        return classes.join(" ");
      }
      return null;
    },

    /**
     * Get extra classes for header menu based on the options
     * @returns {null|*}
     */
    headerMenuClasses() {
      const classes = this.getClasses("header_menu");
      if (typeof classes !== "undefined") {
        return classes.join(" ");
      }
      return null;
    }
  }
};
</script>
