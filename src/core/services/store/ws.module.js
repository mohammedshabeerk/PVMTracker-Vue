import Vue from "vue";
const state = {
    socket: {
        isConnected: false,
        message: '',
        reconnectError: false,
    }
};

const actions = {
    // sendMessage: function (context, message) {
    //     Vue.prototype.$socket.sendObj(message)
    //   }
};

const mutations = {
    SOCKET_ONOPEN(state, event) {
        Vue.prototype.$socket = event.currentTarget
        // console.log('working')
        state.socket.isConnected = true
    },
    SOCKET_ONCLOSE(state, event) {
        state.socket.isConnected = false
    },
    SOCKET_ONERROR(state, event) {
        // console.error(state, event)
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
        // console.log('message', message)
        state.socket.message = message
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
        // console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
        state.socket.reconnectError = true;
    },
};

export default {
    state,
    actions,
    mutations,
};
