<template>
  <!-- begin:: Header -->
  <div
    id="kt_header"
    ref="kt_header"
    class="header fk-user-header"
    v-bind:class="headerClasses"
  >
    <div
      class="d-flex align-items-center justify-content-between"
      v-bind:class="{ 'container-fluid': widthFluid, container: !widthFluid }"
    >
      <div class="d-flex align-items-end mr-3">
        <div class="header-logo pb-1 pt-1">
          <router-link to="/">
            <h4>PMV Service Tracker</h4>
          </router-link>
        </div>
        <!-- begin:: Header Menu -->
        <div
          class="header-menu-wrapper header-menu-wrapper-left"
          ref="kt_header_menu_wrapper"
        >
          <div
            v-if="headerMenuEnabled"
            id="kt_header_menu"
            ref="kt_header_menu"
            class="header-menu header-menu-mobile"
            v-bind:class="headerMenuClasses"
          >
            <!-- example static menu here -->
            <!-- <KTMenu></KTMenu> -->
          </div>
        </div>
        <!-- end:: Header Menu -->
      </div>

      <KTTopbar></KTTopbar>
    </div>
  </div>
  <!-- end:: Header -->
</template>

<script>
import { mapGetters } from "vuex";
import KTTopbar from "@/view/layout/header/Topbar.vue";
import KTLayoutHeader from "@/assets/js/layout/base/header.js";
import KTLayoutHeaderMenu from "@/assets/js/layout/base/header-menu.js";


export default {
  name: "KTHeader",
  components: {
    KTTopbar,

  },
  props:{
    notificationList:Array
  },
  mounted() {
    // Init Desktop & Mobile Headers
    KTLayoutHeader.init("kt_header", "kt_header_mobile");

    // Init Header Menu
    KTLayoutHeaderMenu.init(
      this.$refs["kt_header_menu"],
      this.$refs["kt_header_menu_wrapper"]
    );
  },
  computed: {
    ...mapGetters(["layoutConfig", "getClasses"]),

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
    },

    /**
     * Check if header container is fluid
     */
    widthFluid() {
      return this.layoutConfig("header.self.width") === "fluid";
    }
  }
};
</script>
<style scoped>
  .header-logo h4 {
    color: black;
  }
</style>
