<template>
    <div>
        <DataTable :value="myTickets" paginator :rows="perPage" :first="(currentPage - 1) * perPage" class="h-100 w-100">
            <template #header>
                <div class="d-flex justify-content-between align-items-center p-2">
                    <span class="text-xl text-900 font-bold">My Service Tickets</span>
                </div>
            </template>
            <Column field="plateNo" header="Plate Number" :sortable="true">
                <template #body="slotProps">
                    {{ slotProps.data.vehicle.plateNo }} 
                </template>
            </Column>

            <Column field="lastServiceMileage" header="Last Service Mileage" :sortable="true">
                <template #body="slotProps">
                    {{ slotProps.data.lastServiceMileage }} 
                </template>
            </Column>

            <Column field="serviceDescription" header="Service Description" :sortable="true">
                <template #body="slotProps">
                    {{ slotProps.data.serviceDescription }}
                </template>
            </Column>

            <Column field="lastServiceDate" header="Last Service Date" :sortable="true">
                <template #body="slotProps">
                    <span>{{ moment(slotProps.data.lastServiceDate).format("MMM D YYYY") }}</span> 
                </template>
            </Column>

            <Column field="upcomingServiceDate" header="Upcoming Service Date" :sortable="true">
                <template #body="slotProps">
                    <span>{{ moment(slotProps.data.upcomingServiceDate).format("MMM D YYYY") }}</span> 
                </template>
            </Column>

            <!-- Footer Template -->
            <template v-if="serviceTickets != null" #footer>
                In total, there are {{ serviceTickets.length }} Details.
            </template>
        </DataTable>
    </div>
</template>


<script>
import { mapGetters } from "vuex";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

import apiJs from "@/core/services/api/user/serviceTickets.js";
import { set } from "vue";

export default {
    props: {
        serviceTickets: Array,
    },
    components: {
        DataTable,
        Column
    },
    name: "myservice",
    data() {
        return {
            perPage: 8,
            currentPage: 1,
        }
    },
    mounted() {
    },
    updated() {
    },
    computed: {
        ...mapGetters([ "currentUser" ]),
        myTickets: function () {
            var serviceTickets = this.serviceTickets
            var myTickets = serviceTickets.filter((item) => item.vehicle.userId.id === this.currentUser.userId);
            return myTickets;
        }
    },
    methods: {
    }
};
</script>
<style>

</style>
