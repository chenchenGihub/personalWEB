import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '我是1', done: true },
      { id: 2, text: '我是2', done: false },
      { id: 3, text: '我是3', done: false },
      { id: 4, text: '我是4', done: false },
    ],
    count:10
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {

  },
  getters:{
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
