import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/api.js'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    loginStatus: false,
    userLogin: {
      id: '',
      name: '',
      img: '',
      tags: ''
    },
    user: {},
    questions: [],
    ownquestions: [],
    singleQuestion: {
      id: '',
      title: '',
      description: '',
      up_vote: [],
      down_vote: []
    },
    answers: [],
    answer: {
      description: ''
    },
    up_votes: [],
    down_votes: []
  },
  mutations: {
    mtloginStatus (state, userLogin) {
      state.loginStatus = userLogin.status
      state.userLogin.id = userLogin.user.id
      state.userLogin.name = userLogin.user.name
      state.userLogin.img = userLogin.user.img
    },
    mtgetQuestions (state, questions) {
      state.questions = questions
    },
    mtgetOwnQuestions (state, questions) {
      state.ownquestions = questions
    },
    mtgetSingleQuestions (state, questions) {
      state.singleQuestion = questions
    },
    mtgetAnswer (state, answer) {
      state.answers = answer
    },
    mtgetSingleAnswer (state, answer) {
      state.answer = answer
    },
    mtgetUser (state, user) {
      state.user = user
    }
  },
  actions: {
    isLogin ({ commit }) {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'get',
        url: '/validate',
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          commit('mtloginStatus', {
            status: true,
            user: data
          })
          this.dispatch('getUser')
        })
        .catch(({ response }) => {
          commit('mtloginStatus', { status: false })
        })
    },
    getQuestions ({ commit }) {
      axios({
        method: 'get',
        url: '/questions'
      })
        .then(({ data }) => {
          commit('mtgetQuestions', data)
        })
        .catch(({ response }) => {
          commit('mtgetQuestions')
        })
    },
    getOwnQuestions ({ commit }) {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'get',
        url: `/questions/${this.state.userLogin.id}`,
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          commit('mtgetOwnQuestions', data)
        })
        .catch(({ response }) => {
          commit('mtgetOwnQuestions')
        })
    },
    getSinglequestion ({ commit }, id) {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: `/questions/single/${id}`,
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          commit('mtgetSingleQuestions', data)
        })
    },
    deleteQuestion ({ commit }, id) {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'Delete',
        url: `/questions/${id}`,
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          this.dispatch('getOwnQuestions')
          this.dispatch('getQuestions')
        })
    },
    getAnswer ({ commit }, id) {
      axios({
        method: 'GET',
        url: `/answers/${id}`
      })
        .then(({ data }) => {
          commit('mtgetAnswer', data)
        })
    },
    getSingleAnswer ({ commit }, id) {
      axios({
        method: 'GET',
        url: `/answers/single/${id}`
      })
        .then(({ data }) => {
          commit('mtgetSingleAnswer', data)
        })
    },
    questionsUpVote ({ commit }, id) {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'PUT',
        url: `/votes/question_up/${id}`,
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          this.dispatch('getSinglequestion', data._id)
        })
    },
    questionsDownVote ({ commit }, id) {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'PUT',
        url: `/votes/question_down/${id}`,
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          this.dispatch('getSinglequestion', data._id)
        })
    },
    answerUpVote ({ commit }, id) {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'PUT',
        url: `/votes/answer_up/${id}`,
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          this.dispatch('getAnswer', data.question_id)
        })
    },
    answerDownVote ({ commit }, id) {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'PUT',
        url: `/votes/answer_down/${id}`,
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          this.dispatch('getAnswer', data.question_id)
        })
    },
    getUser ({ commit }, id) {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'GET',
        url: `/user`,
        headers: {
          token: accessToken
        }
      })
        .then(({ data }) => {
          commit('mtgetUser', data)
        })
    },
    get_watch_tag ({ commit }, tag) {
      console.log(tag)
      axios({
        method: 'POST',
        url: '/watch_tag',
        data: {
          tag: tag
        }
      })
        .then(({ data }) => {
          commit('mtgetQuestions', data)
        })
        .catch(({ response }) => {
          commit('mtgetQuestions')
        })
    }
  }
})
