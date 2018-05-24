import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const $axios = axios.create({
  baseURL: 'http://35.198.236.79/'
})

export default new Vuex.Store({
  state: {
    user: {
      id: localStorage.getItem('id'),
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      username: localStorage.getItem('username')
    },
    books: [],
    book: null
  },
  mutations: {
    getBooks: function (state, payload) {
      state.books = payload.map(val => val)
    },
    clearUser: function (state) {
      state.user.id = ''
      state.user.name = ''
      state.user.email = ''
      state.user.username = ''
    },
    updateUser: function (state) {
      state.user.id = localStorage.getItem('id')
      state.user.name = localStorage.getItem('name')
      state.user.email = localStorage.getItem('email')
      state.user.username = localStorage.getItem('username')
    }
  },
  actions: {
    emitLogin: function (context, payload) {
      $axios({
        method: 'post',
        url: 'api//users/signin',
        data: {
          username: payload.username,
          password: payload.password
        }
      }).then(response => {
        // console.log(`Response Login : ${JSON.stringify(response)}`)
        localStorage.setItem('token', response.data.data.token)
        localStorage.setItem('id', response.data.data.id)
        localStorage.setItem('name', response.data.data.name)
        localStorage.setItem('username', response.data.data.username)
        localStorage.setItem('email', response.data.data.email)
        context.commit('updateUser')
      })
    },
    emitSignup: function (context, payload) {
      $axios({
        method: 'post',
        url: 'api/users/signup',
        data: {
          username: payload.username,
          email: payload.email,
          password: payload.password,
          name: payload.name
        }
      }).then(response => {
        // console.log(`Response Signup : ${JSON.stringify(response)}`)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('id', response.data.id)
        localStorage.setItem('name', response.data.name)
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('email', response.data.email)
        context.commit('updateUser')
      })
    },
    getBooks: function (context) {
      $axios({
        method: 'get',
        url: '/books'
      }).then(response => {
        context.commit('getBooks', response.data.data)
      })
    },
    emitPost: function (context, payload) {
      $axios({
        method: 'post',
        url: '/books',
        data: {
          title: payload.title,
          author: context.state.user.id,
          content: payload.content
        }
      }).then(response => {
        context.dispatch('getBooks')
      })
    },
    clearUser: function (context) {
      context.commit('clearUser')
    }
  }
})
