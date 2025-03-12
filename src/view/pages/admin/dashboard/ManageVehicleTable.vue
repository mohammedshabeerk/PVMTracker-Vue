<template>
    <div>
        <div class="d-lg-flex">
            <div class="flex-fill">
                <div class="d-sm-flex justify-content-end pb-3 pb-md-0">

                        <b-button variant="outline-primary my-4"  @click="addVehicle()"
                            class="ml-auto d-flex text-nowrap align-items-center font-weight-bold font-size-lg">
                            <i class="fas fa-plus mr-2"></i> Add new
                        </b-button>
                </div>
            </div>
        </div>
    
   
        <DataTable  :value="vehicles" paginator :rows="perPage" :first="(currentPage - 1) * perPage" >
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">Vehicles</span>
            
                </div>
            </template>
        
            <!-- Plate Number Column -->
            <Column field="plateNo" header="Plate Number" :sortable="true">
                <template #body="slotProps">
                    {{ slotProps.data.plateNo }} <!-- Display plate number -->
                </template>
            </Column>
        
            <!-- Model Column -->
            <Column field="model" header="Model" :sortable="true">
                <template #body="slotProps">
                    {{ slotProps.data.vehicleModel }} <!-- Display car model -->
                </template>
            </Column>
        
            <!-- Manufacturing Year Column -->
            <Column field="manufacturingYear" header="Manufacturing Year" :sortable="true">
                <template #body="slotProps">
                    {{ slotProps.data.manufacturingYear }} <!-- Display manufacturing year -->
                </template>
            </Column>
        
            <!-- Driver Name Column -->
            <Column field="userId" header="Driver Name" :sortable="true">
                <template #body="slotProps">
                    {{ slotProps.data.userId.name }} <!-- Display driver name -->
                </template>
            </Column>
        
            <!-- Actions Column -->
            <Column header="Actions" thClass="datatable-actioncolum">
                <template  #body="slotProps" >
                    <!-- Add action buttons like Edit and Delete -->
                    <Button icon="pi pi-pencil" @click="edit(slotProps.data)" class="p-button-rounded p-button-outlined mr-2" />
                    <Button icon="pi pi-trash" @click="deleteData(slotProps.data)" class="p-button-rounded p-button-danger p-button-outlined" />
                </template>
            </Column>
            
        
            <!-- Footer Template -->
            <template v-if="vehicles!=null" #footer>
                In total, there are {{ vehicles.length }} Details.
            </template>
        </DataTable>
        


        <b-modal id="vehicleShow" v-model="showModal" title="Manage New Vehicle" hide-footer>
            <div class="fk-content-wraper">

              <div class="pb-5">
                <b-form @submit.prevent="save">
                  <div class="fk-post-form rounded-sm card-shadow-sm p-4 mb-4 bg-white">
                    <!-- Plate Number Input -->
                    <div class="form-group pb-4">
                      <h6 class="text-dark-50 font-weight-bolder">Plate Number</h6>
                      <b-form-input v-model="form.plateNo" :class="{ 'is-invalid': $v.form.plateNo.$error }" type="text"
                        placeholder="Enter Plate Number" class="bg-light border-2 min-h-45px rounded-lg">
                      </b-form-input>
                      <div v-if="!isValid && !form.plateNo" class="text-danger">
                         Number is required
                      </div>
                    </div>
                    <!-- Model Input -->
                    <div class="form-group pb-4">
                      <h6 class="text-dark-50 font-weight-bolder">Model</h6>
                      <b-form-input v-model="form.vehicleModel" :class="{ 'is-invalid': $v.form.vehicleModel.$error }" type="text"
                        placeholder="Enter Model" class="bg-light border-2 min-h-45px rounded-lg"></b-form-input>
                    </div>
                    <!-- Manufacturing Year Input -->
                    <div class="form-group pb-4">
                      <h6 class="text-dark-50 font-weight-bolder">Manufacturing Year</h6>
                      <b-form-input v-model="form.manufacturingYear" type="number"
                        :class="{ 'is-invalid': $v.form.manufacturingYear.$error }" placeholder="Enter Manufacturing Year"
                        class="bg-light border-2 min-h-45px rounded-lg"></b-form-input>
                      <div v-if="!isValid && !form.manufacturingYear" class="text-danger">
                        Manufacturing Year is required
                      </div>
                    </div>
                    <!-- Upcoming Service Date Input -->
                    <div class="form-group pb-4">
                      <h6 class="text-dark-50 font-weight-bolder">Service Date</h6>
                      <b-form-datepicker id="enddate1" :class="{ 'is-invalid': $v.form.upcomingServiceDate.$error }"
                        v-model="form.upcomingServiceDate" class="bg-light border-2 py-2 max-h-50px rounded fk-d-picker"
                        placeholder="Select Upcoming Service Date">
                      </b-form-datepicker>
                      <div v-if="!isValid && !form.upcomingServiceDate" class="text-danger">
                         Service Date is required
                      </div>
                    </div>
                    <!-- Driver Name Input -->
                    <div class="form-group">
                      <h6 class="text-dark-50 font-weight-bolder">Select Driver</h6>
                      <vue-select :options="users" label="name"
                        class="bg-light fk-vue-select borderless rounded min-h-50px pt-3" placeholder="Select Driver"
                        v-model="form.userId"></vue-select>
                    </div>
            
        
                    <b-row class="pt-5">
                      <b-col class="pb-5 text-right">
                        <b-button variant="outlined-grey" @click="cancel" class="mr-3" rounded>Cancel</b-button>
                        <b-button :disabled="saveDisabled" @click="save()" variant="outline-dark" rounded>   <i class="fas fa-plus mr-2"></i>
                            {{ form.plateNo ? "Update" : "Add Vehicle" }}</b-button>
                      </b-col>
                    </b-row>
                  </div>
                </b-form>
              </div>
            </div>
          </b-modal>
    </div>


</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

import { mapGetters } from "vuex";
import homeJs from "@/core/services/api/admin/home.js";
import Swal from "sweetalert2";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
export default {
    props: {
        vehicles: Array,
    },
    components: {
    DataTable,
    Column,
    Button
  },
  mixins: [validationMixin],
    data() {
        
        return {
            stickyHeader: true,
            showModal:false,
            perPage: 8,
            currentPage: 1,
            form: {
              id:null,
                plateNo: null,
                vehicleModel: null,
                manufacturingYear: null,
                upcomingServiceDate: null,
                userId:null,
             },


      users: [],
      saveDisabled: false,
      isValid: true,
     
        }
    },
    validations: {
      form: {
        plateNo: {
          required
        },

        vehicleModel: {
          required
        },
        manufacturingYear: {
          required
        },
        upcomingServiceDate: {
          required
        },
        userId: {
            required,
        },
    }
  },
    computed: {
       
    },

    mounted() {
    this.getUsers()
   
  },
    methods: {
      async getUsers() {
      var data = await homeJs.getUsers();
      this.users = data.filter((item) => item.role === "DRIVER");
    },
    addVehicle(){
      this.clearData()
      this.showModal =true
    },
    async save() { 
      this.saveDisabled = true
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Form is invalid");
        this.saveDisabled = false
        this.isValid = false;
        return;
      } else {
        this.isValid = true;
        var response =null
        if(this.form.id){
           response = await homeJs.update(this.form);
        }else
         response = await homeJs.save(this.form);
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
          this.$emit("vehicle-saved");
          console.log("Event emitted: vehicle-saved");
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
        plateNo: data.plateNo,
        vehicleModel: data.vehicleModel,
        manufacturingYear: data.manufacturingYear,
        upcomingServiceDate: data.upcomingServiceDate,
        userId: data.userId,
      };
      this.showModal =true
    console.log(thi);
    
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
          var response = await homeJs.delete(data.id);
          if (response) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              showConfirmButton: false,
              showCancelButton: false,
              timer: 1000,
            });
            this.$emit("vehicle-saved");
            console.log("Event emitted: vehicle-deleted");
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
        plateNo: null,
        vehicleModel: null,
        manufacturingYear: null,
        upcomingServiceDate: null,

      };
      this.form.userId = null;
    }

  },
}
</script>
<style>

</style>
