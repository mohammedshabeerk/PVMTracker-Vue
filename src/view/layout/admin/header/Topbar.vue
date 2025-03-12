<template>
  <!-- begin:: Header Topbar -->
  <div class="topbar d-none d-lg-flex 12">
    <!--begin: Search -->
    <!-- <b-input-group class="fk-search rounded-pill h-35px max-w-275px mr-5 mt-2">
      <b-input-group-prepend>
        <span class="input-group-text bg-transparent border-0 h-35px"><img
            src="@/custom/media/svg/magnifying-glass-solid.svg" width="15" class="opacity-40"></span>
      </b-input-group-prepend>
      <b-form-input class="border-0 bg-transparent pl-0 py-1 h-35px" size="lg" placeholder="search...">
      </b-form-input>
    </b-input-group> -->
    <!--end: Search -->

    <!--begin: Notifications -->
    

    <!--end: Notifications -->


    <!--begin: User Bar -->
    <div class="d-flex">
      <KTQuickUser></KTQuickUser>
    </div>
    <!--end: User Bar -->

    
  </div>
  <!-- end:: Header Topbar -->

</template>


<style lang="scss">
.topbar {
  .dropdown-toggle {
    padding: 0;

    &:hover {
      text-decoration: none;
    }

    &.dropdown-toggle-no-caret {
      &:after {
        content: none;
      }
    }
  }

  .dropdown-menu {
    margin: 0;
    padding: 0;
    outline: none;

    .b-dropdown-text {
      padding: 0;
    }
  }
}
</style>

<script>


import KTQuickUser from "@/view/layout/extras/offcanvas/QuickUser.vue";
import i18nService from "@/core/services/i18n.service.js";

export default {
  name: "KTTopbar",
  data() {
    return {
      languageFlag: "",
      languages: i18nService.languages
    };
  },
 
  components: {
    KTQuickUser,
  },
  mounted() {
    
  },
  
  methods: {

    onLanguageChanged() {
      this.languageFlag = this.languages.find(val => {
        return val.lang === i18nService.getActiveLanguage();
      }).flag;
    }, 
    
  },
  computed: {
    getLanguageFlag() {
      return this.onLanguageChanged();
    }
  },
  wacth: {
    
  }
};
</script>
