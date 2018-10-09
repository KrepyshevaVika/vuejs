import Vue from 'vue';
import Vuex from 'vuex';
import { getTopNodes, getNodeChildren } from './services/service';
import { updateState } from './handleUpdateState/recursions';

const GET_SUCCESS = 'GET_SUCCESS';
const SHOW_CHILD_SUCCESS = 'SHOW_CHILD_SUCCESS';
const MESSAGE_ERROR = 'MESSAGE_ERROR';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nodes: [],
    messageError: ""
  },
  mutations: {
    [GET_SUCCESS] (state, nodes) {
      state.nodes = nodes;
    },
    [MESSAGE_ERROR] (state, msgError) {
      state.messageError = msgError;
    },
    [SHOW_CHILD_SUCCESS] (state, payload) {
      let oldNodes = state.nodes.slice();
      //let mewState = updateState(oldNodes, payload.nodes, payload.targerId);
      //console.log(mewState);
      state.nodes = updateState(oldNodes, payload.nodes, payload.targerId);
      state.messageError = "";
    }
  },
  actions: {
    getTop({ commit }) {
      getTopNodes().then((data) => {
        commit('GET_SUCCESS', data);
      }).catch((error) => {
        commit('MESSAGE_ERROR', error);
      });
    },
    getChild({ commit }, id) {
      getNodeChildren(id).then((data) => {
        commit('SHOW_CHILD_SUCCESS', { nodes: data, targerId: id });
      }).catch((error) => {
        commit('MESSAGE_ERROR', error);
      });
    }
  }

})
