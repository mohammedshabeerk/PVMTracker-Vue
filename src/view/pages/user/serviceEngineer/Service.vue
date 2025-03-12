<template>
    <div> 
        <div class="d-lg-flex">
            <div class="flex-fill">
                <div class="d-sm-flex justify-content-end pb-3 pb-md-0">

                    <b-button variant="outline-primary my-4"  @click="addTicket()"
                        class="ml-auto d-flex text-nowrap align-items-center font-weight-bold font-size-lg">
                        <i class="fas fa-plus mr-2"></i> Add new
                    </b-button>
                </div>
            </div>
        </div>
        <!-- Begin: Data table -->
        <DataTable :value="serviceTickets" paginator :rows="perPage" :first="(currentPage - 1) * perPage" >
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
                    <!-- {{ slotProps.data.lastServiceDate }} -->
                    <span>{{ moment(slotProps.data.lastServiceDate).format("MMM D YYYY") }}</span>
                </template>
            </Column>

            <Column field="upcomingServiceDate" header="Upcoming Service Date" :sortable="true">
                <template #body="slotProps">
                    <span>{{ moment(slotProps.data.upcomingServiceDate).format("MMM D YYYY") }}</span>
                </template>
            </Column>

            <Column field="serviceEngineerName" header="Service Engineer Name" :sortable="true">
                <template #body="slotProps">
                    <span>{{ slotProps.data.serviceEngineerName}}</span>
                </template>
            </Column>

            <Column field="creationDate" header="Created Date" :sortable="true">
                <template #body="slotProps">
                    <span>{{ moment(slotProps.data.creationDate).format("MMM D YYYY") }}</span>
                </template>
            </Column>

            <Column header="Actions" thClass="datatable-actioncolum">
                <template  #body="slotProps" >
                    <!-- Add action buttons like Edit and Delete -->
                    <Button icon="pi pi-pencil" @click="edit(slotProps.data)" class="p-button-rounded p-button-outlined mr-2" />
                    <Button icon="pi pi-trash" @click="deleteData(slotProps.data)" class="p-button-rounded p-button-danger p-button-outlined" />
                </template>
            </Column>

            <!-- Footer Template -->
            <template v-if="serviceTickets != null" #footer>
                In total, there are {{ serviceTickets.length }} Details.
            </template>
        </DataTable>
        <!-- End: Data table -->
        <!-- Begin: Add Service ticket modal -->
        <b-modal id="showTicket" v-model="showModal" title="Manage Service Ticket" hide-footer>
            <div class="fk-content-wraper">

              <div class="pb-5">
                <b-form @submit.prevent="save">
                  <div class="fk-post-form rounded-sm card-shadow-sm p-4 mb-4 bg-white">
                    <!-- Driver Name Input -->
                    <div class="form-group">
                        <h6 class="text-dark-50 font-weight-bolder">Select Vehicle</h6>
                        <vue-select :options="vechicles" label="plateNo"
                          class="bg-light fk-vue-select borderless rounded min-h-50px pt-3" placeholder="Select vechicle"
                          v-model="form.vehicle" :reduce="vehicle => vehicle.id"></vue-select>
                      </div>
                     <!-- Model Input -->
                     <div class="form-group pb-4">
                        <h6 class="text-dark-50 font-weight-bolder">Service Description</h6>
                        <b-form-input v-model="form.serviceDescription" :class="{ 'is-invalid': $v.form.serviceDescription.$error }" type="text"
                          placeholder="Enter Service Description" class="bg-light border-2 min-h-45px rounded-lg"></b-form-input>
                      </div>
                    <!-- Model Input -->
                    <div class="form-group pb-4">
                      <h6 class="text-dark-50 font-weight-bolder">Last Service Mileage</h6>
                      <b-form-input v-model="form.lastServiceMileage" :class="{ 'is-invalid': $v.form.lastServiceMileage.$error }" type="number"
                        placeholder="Enter Last Service Mileage" class="bg-light border-2 min-h-45px rounded-lg"></b-form-input>
                    </div>
                    <!-- Upcoming Service Date Input -->
                   <div class="form-group pb-4">
                    <h6 class="text-dark-50 font-weight-bolder">Last Service Date</h6>
                    <b-form-datepicker id="lastServiceDate" :class="{ 'is-invalid': $v.form.lastServiceDate.$error }"
                      v-model="form.lastServiceDate" class="bg-light border-2 py-2 max-h-50px rounded fk-d-picker"
                      placeholder="Select Last Service Date">
                    </b-form-datepicker>
                    <div v-if="!isValid && !form.lastServiceDate" class="text-danger">
                       Last Service Date is required
                    </div>
                  </div>
                   <!-- Upcoming Service Date Input -->
                   <div class="form-group pb-4">
                    <h6 class="text-dark-50 font-weight-bolder">Upcoming Service Date</h6>
                    <b-form-datepicker id="upcomingServiceDate" :class="{ 'is-invalid': $v.form.upcomingServiceDate.$error }"
                      v-model="form.upcomingServiceDate" class="bg-light border-2 py-2 max-h-50px rounded fk-d-picker"
                      placeholder="Select Upcoming Service Date">
                    </b-form-datepicker>
                    <div v-if="!isValid && !form.upcomingServiceDate" class="text-danger">
                       Service Date is required
                    </div>
                  </div>
                  <!-- Manufacturing Year Input -->
                  <div class="form-group pb-4">
                    <h6 class="text-dark-50 font-weight-bolder">Service Cost</h6>
                    <b-form-input v-model="form.serviceCost" type="number"
                      :class="{ 'is-invalid': $v.form.serviceCost.$error }" placeholder="Enter Service Cost"
                      class="bg-light border-2 min-h-45px rounded-lg"></b-form-input>
                    <div v-if="!isValid && !form.serviceCost" class="text-danger">
                      Service Cost is required
                    </div>
                </div>
                    <!-- Manufacturing Year Input -->
                    <div class="form-group pb-4">
                        <h6 class="text-dark-50 font-weight-bolder">Service Engineer Name</h6>
                        <b-form-input v-model="form.serviceEngineerName" type="text"
                          :class="{ 'is-invalid': $v.form.serviceEngineerName.$error }" placeholder="Enter Service Engineer Name"
                          class="bg-light border-2 min-h-45px rounded-lg"></b-form-input>
                        <div v-if="!isValid && !form.serviceEngineerName" class="text-danger">
                          Service Engineer is required
                        </div>
                    </div>
                    <b-row class="pt-5">
                      <b-col class="pb-5 text-right">
                        <b-button variant="outlined-grey" @click="cancel" class="mr-3" rounded>Cancel</b-button>
                        <b-button :disabled="saveDisabled" @click="save()" variant="outline-dark" rounded>   <i class="fas fa-plus mr-2"></i>
                            {{ form.id ? "Update Ticket" : "Add Ticket" }}</b-button>
                      </b-col>
                    </b-row>
                  </div>
                </b-form>
              </div>
            </div>
          </b-modal>
          <!--End: dd Service ticket modal -->
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

import Swal from "sweetalert2";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

import homejs from "@/core/services/api/admin/home.js";
import ticketjs from "@/core/services/api/user/serviceTickets.js";
import { set } from "vue";

export default {
    props: {
        serviceTickets: Array,
    },
    components: {
        DataTable,
        Column,
        Button
    },
    name: "overview",
    mixins: [validationMixin],
    data() {
        return {
            perPage: 8,
            currentPage: 1,
            saveDisabled: false,
            isValid: true,  
            vechicles:[],
            showModal:false,
            form: {
                id:null,
                lastServiceMileage: null,
                lastServiceDate: null,
                serviceDescription: null,
                serviceCost: null,
                upcomingServiceDate: null,
                serviceEngineerName: null,
                vehicle:null,
             },
        }
    },
    mounted() {
       
        this.getVechicles();
    },
  
    validations: {
        form: {
            serviceEngineerName: {
                required
            },
            lastServiceMileage: {
                required
            },
            lastServiceDate: {
                required
            },
            serviceDescription: {
                required,
            },
            serviceCost: {
                required,
            },
            upcomingServiceDate: {
                required,
            }
        }
    },
    computed: {
    },
    methods: {
        async getVechicles() {
            this.vechicles = await homejs.getVechicles();
        },
        addTicket(){
            this.clearData()
            this.showModal =true
        },
        async save() { 
            this.saveDisabled = true
            this.$v.$touch();
            if (this.$v.$invalid) {
                console.log(this.form);
                console.log("Form is invalid ");
                this.saveDisabled = false
                this.isValid = false;
                return;
            } else {
                this.isValid = true;
                var response =null

                const selectedVehicle = this.vechicles.find(vehicle => vehicle.id === this.form.vehicle);
                    const requestObj = { 
                    ...this.form,             
                    vehicle: selectedVehicle  
                    };
                if(this.form.id){
                    response = await ticketjs.update(requestObj);
                }else
                    response = await ticketjs.save(requestObj);
                this.showModal =false
                if (response) {
                Swal.fire({
                    title: response.message,
                    icon: "success",
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1000
                })
                this.showModal =false
                this.$emit("ticket-saved");
                console.log("Event emitted: ticket-saved");
                this.clearData()
                }else{
                    Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1000
                })
                }
            }
        },
        async edit(data) { 
            this.saveDisabled = false
            console.log(data)
            this.form = {
                id: data.id,
                lastServiceMileage: data.lastServiceMileage,
                lastServiceDate:data.lastServiceDate,
                serviceDescription: data.serviceDescription,
                serviceCost: data.serviceCost,
                serviceEngineerName: data.serviceEngineerName,
                upcomingServiceDate: data.upcomingServiceDate,
                vehicle: data.vehicle.id,
            };
            console.log(this.form)
            this.showModal =true
           
        },
        async deleteData(data) {
            console.log("call delete");
            
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                var response = await ticketjs.delete(data.id);
                if (response) {
                    Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1000,
                    });
                    this.$emit("ticket-saved");
                    console.log("Event emitted: ticket-deleted");
                }
                }
            });
        },
        cancel() {
            this.showModal =false
            this.clearData()
        },
        clearData(){
            this.form = {
                id:null,
                lastServiceMileage: null,
                lastServiceDate: null,
                serviceDescription: null,
                serviceCost: null,
                upcomingServiceDate: null,
                serviceEngineerName: null,
            };
            this.form.vehicle = null;
        }
    }
};
</script>
