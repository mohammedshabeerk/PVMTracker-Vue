<template>
  <div>
      <div class="fk-content-wraper">
          <!--!begin: filter  -->
          <!--!begin: filter  -->
          <div class="position-relative ">
                  <ManageVehicleTable :vehicles="filteredvehicles"  @vehicle-saved="getVechicles()"></ManageVehicleTable>
          </div>
      </div>
  </div>
</template>

<script>
import ManageVehicleTable from "@/view/pages/admin/dashboard/ManageVehicleTable.vue";
import vehiclejs from "@/core/services/api/admin/home.js";
export default {

  data() {
      return {
          
          vehicles: [],
      }
  },
  name: "ManageUser-admin",
  components: {
      ManageVehicleTable
  },
  created() {
  },
  mounted() {
      this.getVechicles();
  },
  updated() {
  },
  computed: {
      filteredvehicles: function () {
          var vehicles = this.vehicles
          
          var i=0;
          vehicles.forEach(object => {i++
              object.slno = i;
          });
          return vehicles;
      }
  },
  methods: {

      async getVechicles() {
          this.vehicles = await vehiclejs.getVechicles()
          console.log("Updated vehicle list:"); // Check if new data is received

      },
      
  }

}
</script>
<style>


</style>