<template>
  <div>
    <div v-if="currentUser.isAdmin === 'SERVICE_ENGINEER'">
      <Service :serviceTickets="serviceTickets" @ticket-saved="getServiceTickets()"></Service>
    </div>
    <div v-else-if="currentUser.isAdmin === 'DRIVER'">
      <Driverview :serviceTickets="serviceTickets"></Driverview>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Service from "@/view/pages/user/serviceEngineer/Service.vue";
import Driverview from "@/view/pages/user/driverView/MyServiceTickets.vue";
import ticketjs from "@/core/services/api/user/serviceTickets.js";
export default {
  name: "dashboard",
  components: {
    Service,
    Driverview
  },
  data() {
    return {
        serviceTickets:[],
    }
  },
  mounted() {
    this.getServiceTickets();
  },
  methods: {
    async getServiceTickets() {
        this.serviceTickets = await ticketjs.getServiceTickets()
    },
  },
  computed: {
    ...mapGetters(["currentUser"]), 
  }
};
</script>
