import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    scores: [],
  },
  mutations: {
    addScore(state, score) {
      console.log('SCORE');
      state.scores.push(score);
    }
  },
  actions: {
  },
  modules: {
  }
})
