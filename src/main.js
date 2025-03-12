import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import VueNativeSock from 'vue-native-websocket'
import store from "@/core/services/store";
import ApiService from "@/core/services/api.service";
import { VERIFY_AUTH } from "@/core/services/store/auth.module";
import { RESET_LAYOUT_CONFIG } from "@/core/services/store/config.module";

Vue.config.productionTip = false;
const isProduction = process.env.NODE_ENV === "production";

// Global 3rd party plugins
import "popper.js";
import "tooltip.js";
import PerfectScrollbar from "perfect-scrollbar";
window.PerfectScrollbar = PerfectScrollbar;
import ClipboardJS from "clipboard";
window.ClipboardJS = ClipboardJS;

// Vue 3rd party plugins
import i18n from "@/core/plugins/vue-i18n";
import "@/core/plugins/portal-vue";
import "@/core/plugins/bootstrap-vue";
import "@/core/plugins/perfect-scrollbar";
import "@/core/plugins/highlight-js";
import "@/core/plugins/inline-svg";
import "@/core/plugins/apexcharts";
import "@/core/plugins/treeselect";
import "@/core/plugins/metronic";
import "@mdi/font/css/materialdesignicons.css";
import "@/core/plugins/formvalidation";
//prime view

import PrimeVue from 'primevue/config';

import vSelect from 'vue-select'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
Vue.use(PrimeVue);
Vue.use(DataTable)
Vue.use(Column)


import ToastService from 'primevue/toastservice';
Vue.use(ToastService);
import "primevue/resources/themes/saga-blue/theme.css" ;      //theme
import "primevue/resources/primevue.min.css" ;                //core css
import "primeicons/primeicons.css" ;                          //icons

Vue.component('vue-select', vSelect)
import 'vue-select/dist/vue-select.css';

import VueStar from 'vue-star'
Vue.component('VueStar', VueStar)

import VueLogger from "vuejs-logger";
const options = {
    isEnabled: true,
    logLevel: "info",
    stringifyArguments: false,
    showLogLevel: true,
    showMethodName: true,
    separator: "|",
    showConsoleColors: true
};
Vue.use(VueLogger, options);

import moment from 'moment'

Vue.prototype.moment = moment


// API service init
ApiService.init();

// ws implimentation
Vue.use(VueNativeSock, '',{ connectManually: true,store: store, format: 'json' })
router.beforeEach((to, from, next) => {
  // Ensure we checked auth before each page load.
  Promise.all([store.dispatch(VERIFY_AUTH)]).then(next);

  // reset config to initial state
  store.dispatch(RESET_LAYOUT_CONFIG);

  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
