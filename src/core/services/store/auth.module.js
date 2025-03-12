import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

import Swal from "sweetalert2";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "login";
export const LOGOUT = "logout";
// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setUser";
export const SET_ERROR = "setError";

export const GET_USER_PROFILE = "currentUser";
export const GET_IS_AUTHENTICATED = "isLoggIn";
export const LOGINMODE = "loginmode";
export const CHANGE_LOGIN_MODE='changeLoginMode'

const state = {
    errors: null,
    user: JwtService.getUser() || {},
    isLoggIn: !!JwtService.getToken(),
    loginMode: JwtService.getLoginMode()
};

const getters = {
    [GET_USER_PROFILE](state) {
        return state.user;
    },
    [LOGINMODE](state) {
        return state.user?.isAdmin;
    },
    [GET_IS_AUTHENTICATED](state) {
        return state.isLoggIn;
    },
};

const actions = {
    [LOGIN](context, credentials) {
        var vm = this._vm;
        return new Promise((resolve,reject) => {
            ApiService.post("auth/login", credentials)
                .then(function (response) {
                    
                    context.commit(SET_AUTH, response);
                    resolve(response);
                })
                .catch((error) => {
            
                    reject(error)
                
                });
        });
    },
    [LOGOUT](context) {
        context.commit(PURGE_AUTH);
        // window.onload()
    },
    [VERIFY_AUTH](context) {
        if (!JwtService.getToken()) {
            context.commit(PURGE_AUTH);
        }
    },
    [CHANGE_LOGIN_MODE](context,isAdmin) {
        state.loginMode = isAdmin;
        JwtService.saveLoginMode(isAdmin);
    },
};

const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_AUTH](state, response) {
        state.isLoggIn = true;
        var user = {
            name: response.data.name,
            username: response.data.username,
            userId:response.data.id,
            email: response.data.email,
            isAdmin: response.data.role,
        };
        state.errors = {};
        state.user = user;
        JwtService.saveToken(response.data.token);
        JwtService.saveUser(user);

        state.loginMode = response.data.role;
        JwtService.saveLoginMode(response.data.role);
    },
    [PURGE_AUTH](state) {
        state.isLoggIn = false;
        state.user = {};
        state.errors = {};
        JwtService.destroyToken();
    },
};

export default {
    state,
    actions,
    mutations,
    getters,
};
