<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-light fixed-top bg-light">
      <router-link to="/">
      <a class="navbar-brand" >
       <img class="card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" style="width:120px; height: 30px;" src="../assets/logo.png" data-holder-rendered="true">
      </a>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div></div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent" >
      </div>
      <form class="form-inline my-1 my-lg-1" id="search-nav" v-if="this.$route.path!=='/login-register'" >
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          id="search-nav-b"
        >
        <button class="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
      </form>
      <!-- chart -->
      <div></div>
      <p style="margin-right:5px; margin-top:8px" v-if="this.$route.path!=='/login-register'&& this.loginStatus==true"><small>{{userLogin.name}}</small></p>
       <router-link  to="/profile">
      <a
        v-if="this.$route.path!=='/login-register'&& this.loginStatus==true"
        class="far fa-user-circle"
        data-toggle="tooltip"
        data-placement="top"
        title="profile"
        aria-hidden="true"
        style="margin-right:10px"
      ></a>
       </router-link>
      <a
        v-if="this.$route.path!=='/login-register'&& this.loginStatus==true"
        style="margin-right:5px; font-size:1.3rem"
        class="far fa-comments"
        aria-hidden="true"
        title="answer"
        data-toggle="popover"
        data-placement="bottom"
      ></a>
      <span v-if="this.$route.path!=='/login-register'&& this.loginStatus==true" class="badge badge-pill badge-warning" style="margin-right:20px;margin-left:5px">2</span>
      <div id="button-logout" v-show="this.loginStatus==true">
        <a class="btn btn-sm btn-outline-secondary" style="margin-right:10px;" @click = "logout()">logout</a>
      </div>
      <div id="button-login" v-if="this.loginStatus==false">
        <router-link to="/login-register">
        <a class="btn btn-sm btn-outline-secondary" style="margin-right:10px">login</a>
        </router-link>
         <router-link to="/login-register">
        <a class="btn btn-sm btn-outline-secondary" style="margin-right:20px">register</a>
         </router-link>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'isLogin'
    ]
    ),
    logout () {
      localStorage.removeItem('token')
      this.isLogin()
      this.$router.push('/')
    }
  },
  computed: mapState([
    'loginStatus', 'userLogin'
  ])
}
</script>
