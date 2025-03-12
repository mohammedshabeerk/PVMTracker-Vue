<template>
    <div>
        <div class="fk-content-wraper">
            <div class="position-relative ">
                <div>
        <div class="d-lg-flex">
            <div class="flex-fill">
                <div class="d-sm-flex justify-content-between pb-3 pb-md-0">
                    <div class="mb-4  min-w-200px">
                       
                    </div>
                </div>
            </div>
        </div>
        <div>

            <!-- Begin: Data table -->
            <div class="bg-white border rounded-lg overflow-hidden ">

                <DataTable :value="monthlyRecords" paginator :rows="perPage" :first="(currentPage - 1) * perPage" 
                   :filters="filter" responsiveLayout="scroll" class="m-0 fk-table">
            
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">Monthly Report</span>
                </div>
            </template>
            
            <Column field="plateNo" header="Plate Number" sortable></Column>
            <Column field="numServicesLastMonth" header="Number Of Services Last Month" sortable></Column>
            <Column field="totalCostLastMonth" header="Total Cost Last Month" sortable></Column>
            <Column field="lastServiceMileage" header="Last Service Mileage" sortable></Column>
            
            <Column field="lastServiceDate" header="Last Service Date" sortable>
                <template #body="slotProps">
                    <span>{{ moment(slotProps.data.lastServiceDate).format("MMM Do,YYYY") }}</span>
                </template>
            </Column>

            <template #empty>
                <div class="text-center py-10">No monthly Reports found</div>
            </template>
        </DataTable>
            </div>
           
        </div>
    </div>
            </div>
        </div>
    </div>
</template>

<script>
import homejs from "@/core/services/api/admin/home.js";
import DataTable from 'primevue/datatable';
    import Column from 'primevue/column';
  
export default {

    data() {
        return {
            monthlyRecords: [],
            perPage: 8,
            currentPage: 1,
            filter: null,
           
        }
    },
    name: "monthlyReports",
    components: {
    DataTable,
    Column,
    
  },
    created() {
    },
    mounted() {
        this.getMonthlyRecords();
    },
    updated() {
    },
    computed: {
        rows() {
            return this.monthlyRecords.length
        },
    },
    methods: {

        async getMonthlyRecords() {
            this.monthlyRecords = await homejs.getMonthlyRecords()
        },
        
    }
}
</script>
<style>
</style>