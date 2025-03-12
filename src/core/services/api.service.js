import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/jwt.service";
import i18nService from "@/core/services/i18n.service.js";
import Swal from "sweetalert2";
import Constants from "@/config/config.js";
import { LOGOUT, LOGINMODE } from "@/core/services/store/auth.module";
import router from "@/router";
import store from "@/core/services/store";

import { RouteNames } from "@/constants/common.constants";

/**
 * Service to call HTTP request via Axios
 */
var tokn = null;

var handleServerError = function (error) {
    switch (error?.response?.data?.code) {
        case 408:
        case 401:
            store.dispatch(LOGOUT).then(() => router.push({ name: RouteNames.LOGOUT }));
            break;
    }
};

var getHeaders = function() {
    return {
        Authorization: `Bearer ${JwtService.getToken()}`,
        "Accept-Language": i18nService.getActiveLanguage().code
    }
}

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = Constants.API_BASE_URL;
        //
    },

    /**
     * Set the default HTTP request headers
     */

    query(resource, params) {
        return Vue.axios.get(resource, params).catch(() => {
            // throw new Error(`[KT] ApiService ${error}`);
        });
    },

    /**
     * Send the GET HTTP request
     * @param resource
     * @param slug
     * @returns {*}
     */
    get(resource, config) {
        return Vue.axios.get("/" + resource, {
                // headers: getHeaders(),
                ...config,
            })
            .catch((error) => {
                handleServerError(error);
                throw error;
            });
    },

    /**
     * Set the POST HTTP request
     * @param resource
     * @param params
     * @returns {*}
     */
    post(resource, params) {
        return Vue.axios
            .post("/" + resource, params, {
                headers: getHeaders(),
            })
            .catch((error) => {
                handleServerError(error);
                throw error;
            });
    },
    /**
     * Send the PUT HTTP request
     * @param resource
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */
    put(resource, params) {
        return Vue.axios
            .put("/" + resource, params, {
                headers: getHeaders(),
            })
            .catch((error) => {
                handleServerError(error);
                throw error;
            });
    },

    /**
     * Send the DELETE HTTP request
     * @param resource
     * @returns {*}
     */
    delete(resource) {
        return Vue.axios
            .delete("/" + resource, {
                headers: getHeaders(),
            })
            .catch((error) => {
                handleServerError(error);
                throw error;
            });
    },
    deleteBody(resource, params) {
        return Vue.axios
            .delete("/" + resource, {
                data: params,
                headers: getHeaders(),
            })
            .catch((error) => {
                handleServerError(error);
                throw error;
            });
    },

    authenticate(resource, credtionals) {
        
        const params = new URLSearchParams();
        params.append("grant_type", "password");
        params.append("user_name", credtionals.email);
        params.append("password", credtionals.password);
        params.append("is_admin", credtionals.is_admin);

        return Vue.axios
            .post(`/${resource}`, params, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })
            .catch((error) => {
              
                var status = error.response.data.code;
                var message = error.response.data.message;
                switch (status) {
                    case 400:
                        break;
                    default:
                        Swal.fire({
                            title: "",
                            text: message,
                            icon: "error",
                            confirmButtonClass: "btn btn-secondary",
                            heightAuto: false,
                        });
                        throw `${error}`;
                }
                throw error;
            });
    },
};

export default ApiService;
