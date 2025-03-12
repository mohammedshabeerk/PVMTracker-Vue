<template>
    <div class="login container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-white">
        <div class="d-flex mx-0 px-0 w-100 justify-content-center align-items-center">
            <!-- Form Section -->
            <div class="d-flex justify-content-center align-items-center">
                <div class="form-area mx-auto bg-white p-5 rounded shadow-lg">
                    <form class="form colum min-w-500px p-10 rounded mx-auto text-center border" novalidate="novalidate"
                        id="kt_login_signin_form">
                        <div class="fs-24px font-weight-bold">PMV Service Tracker</div>
                        <div class="fs-16px text-muted pb-4">Please enter your details</div>

                        <div class="mb-6 p-3 bg-light-danger rounded-lg border border-danger text-danger text-center form-error-message"
                            :class="showErrMsg || 'd-none'">
                            <i class="fa fa-exclamation-circle fa-sm text-danger"></i>
                            {{ errMsg }}
                        </div>
                        <div class="form-group mb-6">
                            <label class="fs-12px font-weight-bold text-muted w-100 text-left">Username <sup
                                    class="text-danger">*</sup></label>
                            <input class="form-control fs-16px rounded border" type="text" name="username"
                                placeholder="Enter username" ref="username" v-model="form.email" />
                        </div>
                        <div class="form-group mb-6">
                            <label class="fs-12px font-weight-bold text-muted w-100 text-left">Password</label>
                            <input class="form-control fs-16px rounded border" type="password" name="password"
                                ref="password" v-model="form.password" placeholder="Enter password"
                                autocomplete="off" />
                        </div>
                        <div class="text-center mt-8">
                            <button ref="kt_login_signin_submit"
                                class="btn btn-block btn-dark rounded-pill font-weight-bold fs-16px py-3 px-5">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    /* Ensure the background extends across the full viewport */
    .login {
        min-height: 100vh;
        background-color: white;
    }
</style>
<!-- Load login custom page styles -->

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
                errMsg: 'Unknown Error',
                showErrMsg: false,
                publicPath: process.env.BASE_URL
            };
        },
        computed: {
            ...mapState({
                errors: (state) => state.auth.errors,
            }),
            ...mapGetters(["currentUser"]),
        },
        mounted() {
            var is_admin = LoginMode.USER;
            this.$store.dispatch(CHANGE_LOGIN_MODE, is_admin)
            this.$store.dispatch(SET_BREADCRUMB, [
                { title: "Login" }
            ]);

            // document.title=`${NameConstants.CLIENT} | Login`
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

            this.fv.on("core.form.valid", () => {
                var username = this.form.email;
                var password = this.form.password;
                var is_admin = LoginMode.USER;
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
                        // go to which page after successfully login
                        .then(
                            (result) => {
                                this.$log.info("result", result);
                                if (result.data.role === "ADMIN") {
                                    this.errMsg = 'Warning: No match for Username or Password.';
                                    this.showErrMsg = true;
                                    return; // Stop further execution
                                }

                                if (result.data.role === "SERVICE_ENGINEER") {
                                    this.$router.push({ name: "dashboard" });
                                } else {
                                    this.$router.push({ name: "dashboard" });
                                }
                            },
                            (error) => {
                                this.errMsg = error.response.status == 401 ? 'Warning: Username not found.' : error.response.data.message
                                this.showErrMsg = true
                            })
                        .catch(() => {
                            this.errMsg = 'Warning: No match for Username or Password.'
                            this.showErrMsg = true
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