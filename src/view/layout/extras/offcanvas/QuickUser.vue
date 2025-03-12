<template>
  <div class="topbar-item pl-5">
    <b-dropdown
        size="sm"
        variant="link"
        toggle-class="btn btn-icon btn-clean btn-dropdown btn-lg mr-1 text-decoration-none"
        no-caret
        right
        no-flip
      >
        <template v-slot:button-content>
          <span class="symbol symbol-40 symbol-circle border border-white">
          <span class="symbol-label fk-user-symbol-icon " 
          :class="currentUser.name.charAt(0).toUpperCase()">
            <!-- <img src="@/custom/media/blank.png" class="img-fluid rounded-circle"> -->
            {{ currentUser.name.charAt(0).toUpperCase() }}
          </span></span>
        </template>
        <b-dropdown-text tag="div" class="min-w-md-200px p-4">
          <div class="">
             
          <div class="d-flex flex-column">
            <router-link :to="{ name: 'profile'}"  class="font-weight-bold fs-14px gray-800 text-hover-primary">
             {{ currentUser.name }}
            </router-link>
          
             
            <div class="text-muted mt-1 fs-10px">{{ currentUser.email }}</div>
            
          </div>
        </div>
          <div class=" pt-3">
            <b-button variant="dark" pill size="sm" class="lh-1 px-4 py-2" @click="onLogout">
              Sign out
            </b-button>
          </div>
        
        </b-dropdown-text>
      </b-dropdown>

  </div>
</template>

<style lang="scss" scoped>
#kt_quick_user {
  overflow: hidden;
}
</style>

<script>
import {LOGOUT } from "@/core/services/store/auth.module";
import { mapGetters } from "vuex";
import { RouteNames} from "@/constants/common.constants.js";
import KTLayoutQuickUser from "@/assets/js/layout/extended/quick-user.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";

export default {
  name: "KTQuickUser",
  data() {
    return {
      variant:null,
     
    };
  },
  mounted() {
    // Init Quick User Panel
    KTLayoutQuickUser.init(this.$refs["kt_quick_user"]);
  },
  methods: {
    onLogout() {
      this.$log.info('routenames',RouteNames);
      this.$store.dispatch(LOGOUT).then(() => this.$router.push({ name: RouteNames.LOGOUT }));
    },
    closeOffcanvas() {
      new KTOffcanvas(KTLayoutQuickUser.getElement()).hide();
    }
  },
  computed: {
    ...mapGetters([
      "currentUser"
    ]),
    picture() {
      return process.env.BASE_URL + "media/users/300_21.jpg";
    }
  }
};
</script>
