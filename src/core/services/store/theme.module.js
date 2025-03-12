// mutation types
export const SET_COLOR = "setColor";

export default {
  state: {
    color: null,
  },
  getters: {
    /**
     * Get list of color for current page
     * @param state
     * @returns {*}
     */
    color(state) {
      return state.color;
    },                                                                  

  },
  actions: {
    /**
     * Set the color list
     * @param state
     * @param payload
     */
    [SET_COLOR](state, payload) {
      state.commit(SET_COLOR, payload);
    },

  },
  mutations: {
    [SET_COLOR](state, payload) {
      state.color = payload;
    },
  }
};
