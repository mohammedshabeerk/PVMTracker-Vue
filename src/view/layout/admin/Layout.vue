<template>
  <div class="d-flex flex-column flex-root" v-if="isLoggIn">
    <!-- begin:: Header Mobile -->
    <KTHeaderMobile></KTHeaderMobile>
    <!-- end:: Header Mobile -->


    <!-- begin::Body -->
    <div class="d-flex flex-row flex-column-fluid page">
      <!-- begin:: Aside Left -->
      <KTAside v-if="asideEnabled"></KTAside>
      <!-- end:: Aside Left -->

      <div id="kt_wrapper" class="d-flex flex-column flex-row-fluid wrapper">
        <!-- begin:: Header -->
        <KTHeader></KTHeader>
        <!-- end:: Header -->

        <!-- begin:: Content -->
        <div
          id="kt_content"
          class="content-admin d-flex flex-column flex-column-fluid"
        >
          <!-- begin:: Content Head -->

          <!-- begin:: Content Head -->
          <KTSubheader
            v-if="subheaderDisplay"
            v-bind:breadcrumbs="breadcrumbs"
            v-bind:title="pageTitle"
          />
          <!-- end:: Content Head -->

          <!-- begin:: Content Body -->
          <div class="">
            <div class="p-0 container-fluid'" >
              <transition name="fade-in">
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
import KTAside from "@/view/layout/admin/aside/Aside.vue";
import KTHeader from "@/view/layout/admin/header/Header.vue";
import KTHeaderMobile from "@/view/layout/admin/header/HeaderMobile.vue";
import HtmlClass from "@/core/services/htmlclass.service";

export default {
  name: "Layout",
  data(){
    return{
      comments: {},
    }
  },
  components: {
    KTAside,
    KTHeader,
    KTHeaderMobile,

  },
  beforeMount() {
    // show page loading

    // initialize html element classes
    HtmlClass.init(this.layoutConfig());
  },
  mounted() {
    
    // check if current user is authenticated
    if (!this.isLoggIn) {
      this.$router.push({ name: "login" });
    }

   
  },
  beforeDestroy() {
    this.$disconnect()
  },
  methods: {
    
  },
  computed: {
    ...mapGetters([
      "isLoggIn",
      "breadcrumbs",
      "pageTitle",
      "layoutConfig",
      "currentUser"
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
      return true;
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
