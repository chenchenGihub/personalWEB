import Vue from 'vue'
import Vuex from 'vuex';

import { TEST_MUTATION } from './mutation_type';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '我是1', done: true },
      { id: 2, text: '我是2', done: false },
      { id: 3, text: '我是3', done: false },
      { id: 4, text: '我是4', done: false },
    ],
    count: 10
  },
  mutations: {
    increment(state,payload) {
      console.log(payload);
      
      state.count+=payload.value
    },
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [TEST_MUTATION](state) {
      // mutate state
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
