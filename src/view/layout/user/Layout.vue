<template>
  <div class="d-flex flex-column flex-root" v-if="isLoggIn">
    <!-- begin:: Header Mobile -->

    <KTHeaderMobile></KTHeaderMobile>

    
    <!-- end:: Header Mobile -->


    <!-- begin::Body -->
    <div class="d-flex flex-row flex-column-fluid page">
      <!-- begin:: Aside Left -->
      <!-- <KTAside v-if="asideEnabled"></KTAside> -->
      <!-- end:: Aside Left -->

      <div id="kt_wrapper" class="d-flex flex-column flex-row-fluid wrapper pt-xl-20 pt-0">
        <!-- begin:: Header -->
        <KTHeader></KTHeader>
        <!-- end:: Header -->

        <!-- begin:: Content -->
        <div
          id="kt_content"
          class="d-flex flex-column pb-0 flex-column-fluid fk-content"
        >
          <!-- begin:: Content Head -->

          <!-- begin:: Content Head -->
          <!-- <KTSubheader
            v-if="subheaderDisplay"
            v-bind:breadcrumbs="breadcrumbs"
            v-bind:title="pageTitle"
          /> -->
          <!-- end:: Content Head -->

          <!-- begin:: Content Body -->
          <div class="d-flex flex-column-fluid">
            <div
              :class="{
                'container-fluid p-0': contentFluid,
                container: !contentFluid
              }"
            >
              <transition name="fade">
                <router-view />
              </transition>
            </div>
          </div>
        </div>
        <!-- <KTFooter></KTFooter> -->
        
    
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import KTHeader from "@/view/layout/header/Header.vue";
import KTHeaderMobile from "@/view/layout/header/HeaderMobile.vue";

import HtmlClass from "@/core/services/htmlclass.service";
import {
  ADD_BODY_CLASSNAME,
  REMOVE_BODY_CLASSNAME
} from "@/core/services/store/htmlclass.module.js";

export default {
  name: "Layout",
  components: {

    KTHeader,
    KTHeaderMobile,

  },
  beforeMount() {
    // show page loading
    this.$store.dispatch(ADD_BODY_CLASSNAME, "page-loading");

    // initialize html element classes
    HtmlClass.init(this.layoutConfig());
  },
  mounted() {
    // check if current user is authenticated
    if (!this.isLoggIn) {
      this.$router.push({ name: "login" });
    }

    
  },
  computed: {
    ...mapGetters([
      "isLoggIn",
      "breadcrumbs",
      "pageTitle",
      "layoutConfig"
    ]),

    /**
     * Check if the page loader is enabled
     * @returns {boolean}
     */
    loaderEnabled() {
      return !/false/.test(this.layoutConfig("loader.type"));
    },

    /**
     * Check if container width is fluid
     * @returns {boolean}
     */
    contentFluid() {
      return this.layoutConfig("content.width") === "fluid";
    },

    /**
     * Page loader logo image using require() function
     * @returns {string}
     */
    loaderLogo() {
      return process.env.BASE_URL + this.layoutConfig("loader.logo");
    },

    /**
     * Check if the left aside menu is enabled
     * @returns {boolean}
     */
    asideEnabled() {
      return !!this.layoutConfig("aside.self.display");
    },

    /**
     * Set the right toolbar display
     * @returns {boolean}
     */
    toolbarDisplay() {
      // return !!this.layoutConfig("toolbar.display");
      return true;
    },

    /**
     * Set the subheader display
     * @returns {boolean}
     */
    subheaderDisplay() {
      return !!this.layoutConfig("subheader.display");
    }
  }
};
</script>

