<template>
  <div class="register-login" style="margin-top: 10rem">
  <div class="row">
      <div class="col-md-5 mx-auto ">
        <div>
            <div v-if="this.success_status==true" class="alert alert-success text-center" role="alert">
              {{success_message}}
            </div>
            <div v-if="this.failed_status==true" class="alert alert-danger text-center" role="alert">
              {{failed_message}}
            </div>
            </div>
      </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-6">
          <div class="col-12 p-0 text-center">
            <h5 class="font-weight-light mb-3">Login | Please input your data</h5>
            <div class="row">
              <div class="col-md-8 mx-auto">
                <form v-on:submit.prevent="login">
                  <div class="form-group">
                    <label for="exampleInputEmail1" class="text-left">Email address</label>
                    <input
                      v-model="user_login.email"
                      type="email"
                      class="form-control"
                      aria-describedby="emailHelp"
                      placeholder="enter email"
                    >
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Password</label>
                    <input
                      v-model="user_login.password"
                      type="password"
                      class="form-control"
                      aria-describedby="emailHelp"
                      placeholder="enter password"
                    >
                  </div>
                  <button type="submit" class="btn btn-primary btn-block">Login</button>
                </form>
                <br>
                <h6>
                  <a>
                    <hr>
                    <hr>
                  </a>
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="col-12 p-0 text-center">
            <h5 class="font-weight-light mb-3">Register | Please input your data</h5>
            <div class="row">
              <div class="col-md-8 mx-auto">
                <form v-on:submit.prevent="register">
                  <div class="form-group">
                    <label for="exampleInputEmail1" class="text-left">Name</label>
                    <input
                      v-model="user.name"
                      type="text"
                      class="form-control"
                      aria-describedby="emailHelp"
                      placeholder="name"
                    >
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1" class="text-left">Email address</label>
                    <input
                    v-model="user.email"
                      type="email"
                      class="form-control"
                      aria-describedby="emailHelp"
                      placeholder="enter email"
                    >
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Password</label>
                    <input
                      v-model="user.password"
                      type="password"
                      class="form-control"
                      aria-describedby="emailHelp"
                      placeholder="enter password"
                    >
                  </div>
                  <button type="submit" class="btn btn-primary btn-block">Register</button>
                </form>
                <br>
                <h6>
                  <a>
                    <hr>
                    <hr>
                  </a>
                </h6>
              </div>
            </div>
          </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from '@/api/api.js'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      success_message: '',
      failed_message: '',
      success_status: false,
      failed_status: false,
      user_login: {
        email: '',
        password: ''
      },
      user: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'isLogin'
    ]
    ),
    register () {
      axios({
        method: 'post',
        url: '/register',
        data: this.user
      })
        .then(({ data }) => {
          this.user.name = ''
          this.user.email = ''
          this.user.password = ''
          this.success_status = true
          this.success_message = data.message
          setTimeout(() => {
            this.success_status = false
          }, 3000)
        })
        .catch(({ response }) => {
          this.failed_status = true
          this.failed_message = response.data.message
          setTimeout(() => {
            this.failed_status = false
          }, 3000)
        })
    },
    login () {
      axios({
        method: 'post',
        url: '/login',
        data: this.user_login
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.access_token)
          this.user_login.email = ''
          this.user_login.password = ''
          this.success_status = true
          this.success_message = data.message
          setTimeout(() => {
            this.success_status = false
            this.isLogin()
            this.$router.push('/')
          }, 3000)
        })
        .catch(({ response }) => {
          this.failed_status = true
          this.failed_message = response.data.message
          setTimeout(() => {
            this.failed_status = false
          }, 3000)
        })
    }
  }
}
</script>
