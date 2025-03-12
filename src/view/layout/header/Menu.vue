<template>
  <ul class="menu-nav">
    <!-- <router-link v-if="currentUser.isAdmin=='SERVICE_ENGINEER'" :to="{ name: 'overview'}" v-slot="{ href, navigate, isActive, isExactActive }">
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <span class="menu-text">Service Tickets </span>
        </a>
      </li>
    </router-link> -->

    <!-- <router-link v-if="currentUser.isAdmin=='SERVICE_ENGINEER'" :to="{ name: 'addServiceTickets'}" v-slot="{ href, navigate, isActive, isExactActive }">
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <span class="menu-text"> Add Service Tickets </span>
        </a>
      </li>
    </router-link> -->

    <!-- <router-link v-if="currentUser.isAdmin=='DRIVER'" :to="{ name: 'MyServiceTickets'}" v-slot="{ href, navigate, isActive, isExactActive }">
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active'
        ]"
      >
        <a :href="href" class="menu-link" @click="navigate">
          <span class="menu-text">My Service Tickets</span>
        </a>
      </li>
    </router-link> -->
    



  
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "KTMenu",
  methods: {
    hasActiveChildren(match) {
      return this.$route["path"].indexOf(match) !== -1;
    }
  },
  computed: {
    ...mapGetters(["currentUser"]),

    
  }
};
</script>
