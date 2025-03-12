<template>
    <div class="h-100 d-md-flex px-10 px-md-4 align-items-center login">
        <div class="row align-items-center d-block d-md-flex h-100 w-100 mx-auto">
            <div class="mx-auto">
                <div class="login login-1 row h-auto h-md-100 pt-4 my-0 align-items-center" :class="{
                    'login-signin-on': this.state == 'signin',
                    'login-signup-on': this.state == 'signup',
                    'login-forgot-on': this.state == 'forgot',
                }" id="kt_login">
                    <!--begin::Aside-->
                   
                    <!--end::Aside-->
                    <!--begin::Content-->
                    <div class="login-content form-area justify-content-center mx-auto position-relative w-100 p-15 max-w-500px bg-white rounded">
                            <!--begin::Signin-->
                            <div class="w-100 colum">
                                <form class="form" novalidate="novalidate" id="kt_login_signin_form">
                                  
                                    <div class="pb-10 pb-md-20 d-flex justify-content-center align-items-center">
                                        
                                    </div>
                                    <div class="text-center">
                                       <span class="d-block fs-30px fs-md-36px text-black">Admin Sign in</span>
                                       <span class="text-gray opacity-70 fs-14px fs-lg-16px">Please enter your details</span>
                                    </div>
                                    <div class="mb-4 p-3 bg-light-danger rounded-lg border border-danger text-danger text-center form-error-message" 
                                :class="showErrMsg || 'd-none'">
                                <i class="fa fa-exclamation-circle fa-sm text-danger"></i>
                                {{errMsg}}
                            </div>
                                    <div class="form-group pb-4">
                                        <label class="fs-12px font-weight-bold gray-800">Username</label>
                                        <div id="example-input-group-1" label="" label-for="example-input-1">
                                            <input class="form-control  px-0 bg-white  fs-16px rounded-0 border-0 border-bottom"
                                                type="text" name="username" placeholder="Enter admin username"
                                                ref="username" v-model="form.email" />
                                        </div>
                                    </div>
                                    <div class="form-group mb-8">
                                        <label class="fs-12px font-weight-bold gray-800">Password</label>

                                        <div id="example-input-group-2" label="" label-for="example-input-2">
                                            <input class="form-control  px-0 bg-white  fs-16px rounded-0 border-0 border-bottom"
                                                type="password" name="password" ref="password" v-model="form.password"
                                                placeholder="Enter admin password" autocomplete="off" />
                                        </div>
                                    </div>
                                    <div class="pb-4 d-none">
                                        <router-link :to="{ name: `forgotpassword`}">
                                    <span class="text-warning font-weight-bold">Forgot Password2?</span>
                                </router-link>
                                    </div>
                                    <div class="pb-lg-0 pb-5 text-center">
                                        <button ref="kt_login_signin_submit"
                                            class="btn btn-dark  rounded-pill font-weight-bold fs-16px  py-3 px-18 my-3 ">Sign  In</button>
                                    </div>
                                   
                                </form>
                            </div>
                            <!--end::Signin-->
                           
                      
                        <!--end::Content footer-->
                    </div>
                        <div class="mb-10 pt-10 w-100 d-flex text-center">
                            <div class="mx-auto">
                            <span class="gray-800 d-block text-left pb-2">Powered by </span>
                          Service Tracker
                        </div>
                        </div>
                    <!--end::Content-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import formValidation from "@/assets/plugins/formvalidation/dist/es6/core/Core";

// FormValidation plugins
//import Trigger from "@/assets/plugins/formvalidation/dist/es6/plugins/Trigger";
import Bootstrap from "@/assets/plugins/formvalidation/dist/es6/plugins/Bootstrap";
import SubmitButton from "@/assets/plugins/formvalidation/dist/es6/plugins/SubmitButton";

import KTUtil from "@/assets/js/components/util";
import { mapGetters, mapState } from "vuex";
import { LOGIN, LOGOUT, CHANGE_LOGIN_MODE } from "@/core/services/store/auth.module";
import Swal from "sweetalert2";

import { LoginMode } from "@/constants/common.constants";
// import {NameConstants} from "../../../../public/client/name.constants.js";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
    name: "login-1",
    data() {
        return {
            state: "signin",
            // Remove this dummy login info
            form: {
                email: "",
                password: "",
            },
            publicPath: "",
            errMsg: 'Unknown Error',
            showErrMsg: false
        };
    },
    computed: {
        ...mapState({
            errors: (state) => state.auth.errors,
        }),
        ...mapGetters(["currentUser"]),
    },
    created() { },
    mounted() {

        var is_admin = LoginMode.ADMIN;
        this.$store.dispatch(CHANGE_LOGIN_MODE, is_admin)
        this.$store.dispatch(SET_BREADCRUMB, [
            { title: "Admin Login" }
        ]);
        //  document.title=`${NameConstants.CLIENT} | AdminLogin`
        const signin_form = KTUtil.getById("kt_login_signin_form");
        // const signup_form = KTUtil.getById("kt_login_signup_form");
        // const forgot_form = KTUtil.getById("kt_login_forgot_form");

        this.fv = formValidation(signin_form, {
            fields: {
                username: {
                    validators: {
                        notEmpty: {
                            message: "Username is required",
                        },
                    },
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: "Password is required",
                        },
                    },
                },
            },
            plugins: {
                // trigger: new Trigger(),
                submitButton: new SubmitButton(),
                bootstrap: new Bootstrap(),
            },
        });

        // this.fv2 = formValidation(forgot_form, {
        //     fields: {
        //         email: {
        //             validators: {
        //                 notEmpty: {
        //                     message: "Email is required",
        //                 },
        //                 emailAddress: {
        //                     message: "The value is not a valid email address",
        //                 },
        //             },
        //         },
        //     },
        //     plugins: {
        //         //  trigger: new Trigger(),
        //         submitButton: new SubmitButton(),
        //         bootstrap: new Bootstrap(),
        //     },
        // });

        this.fv.on("core.form.valid", () => {
            var username = this.form.email;
            var password = this.form.password;
            var is_admin = LoginMode.ADMIN;
            // clear existing errors
            this.$store.dispatch(LOGOUT);

            // set spinner to submit button
            const submitButton = this.$refs["kt_login_signin_submit"];
            submitButton.classList.add("spinner", "spinner-light", "spinner-right");

            // dummy delay
            setTimeout(() => {
                // send login request

                this.$store
                    .dispatch(LOGIN, { username, password })
                    .then(
                        (result) => {
                            this.$log.info("result", result);
                            if (result.data.role === "ADMIN") {
                                this.$router.push({ name: "home" });
                            }
                        },
                        (error) => {
                            this.errMsg = error.response.status == 401 ? 'Warning: Username not found.' : error.response.data.message
                            this.showErrMsg = true
                        })
                    .catch(() => {
                        if (error.response && error.response.status === 401) {
                            this.errMsg = 'Warning: Username not found.';
                        } else {
                            this.errMsg = error.response?.data?.message || 'Warning: No match for Username or Password.';
                        }
                        this.showErrMsg = true;
                    });
                submitButton.classList.remove("spinner", "spinner-light", "spinner-right");
            }, 500);
        });

        this.fv.on("core.form.invalid", () => {
            Swal.fire({
                title: "",
                text: "Please, provide correct data!",
                icon: "error",
                confirmButtonClass: "btn btn-secondary",
                heightAuto: false,
            });
        });
    },
    methods: {
        showForm(form) {
            this.state = form;
            var form_name = "kt_login_" + form + "_form";
            KTUtil.animateClass(KTUtil.getById(form_name), "animate__animated animate__backInUp");
        },
    },
};
</script>
