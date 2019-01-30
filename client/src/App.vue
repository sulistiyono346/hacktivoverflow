<template>
  <div id="app">
    <div class="row">
      <navbar></navbar>
    </div>
    <div v-if="this.$route.path!=='/login-register'">
     <div class="row" style="margin-top: 5rem">
       <div class="col-md-2">
       <div class="list-group" style="position:fixed" >
        <router-link  to="/">
        <a class="list-group-item" style="border-style: hidden;">
            <i class="fa fa-comment-o" style="color:#000000"></i> Home
        </a>
        </router-link>
        <router-link  to="/questions">
         <a  class="list-group-item" style="border-style: hidden">
            <i class="fa fa-search"></i> Questions
        </a>
        </router-link>
      </div>
    </div>
    <div class="col-md-7 border-left">
      <router-view/>
    </div>
    <div class="col-md-3">
        <div class="card" style="position:fixed">
          <div class="card-header">
            <i class="fas fa-tags"></i>
            Watched Tags
          </div>
          <div class="card-body">
            <div class="row"> 
              <div class="col-md-2" v-for="tag in user.tags" :key="tag" >
                <div  class="col-md-1"><span class="badge badge-secondary"><a @click="watch_tag(tag)">{{tag}}</a></span><a @click="remove_watch_tag(tag)" class="far fa-times-circle"></a></div>
              </div>
                </div>
          </div>
        </div>
    </div>
    </div>
  </div>
  <div v-if="this.$route.path=='/login-register'">
     <router-view/>
  </div>
  </div>
</template>
<script>
// @ is an alias to /src
import navbar from '@/components/navbar.vue'
import { mapActions, mapState } from 'vuex'
import axios from '@/api/api.js'
export default {
  name: 'App',
  components: {
    navbar
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'isLogin', 'getQuestions', 'getUser',  'get_watch_tag'
    ]),
    watch_tag (tag) {
      this.get_watch_tag (tag)
    },
    remove_watch_tag (tag) {   
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'PUT',
        url: '/tags_remove',
        headers: {
          token: accessToken
        },
        data: {
          tag: tag
        }
    })
    .then((result) => {
      this.getUser()
    }).catch((err) => {
      console.log(err);
    });
  }
  },
  computed: mapState([
    'user'
  ]),
  created () {
    this.isLogin()
    this.getQuestions()
  }
}
</script>
<style>
/* login  */
.text-grey {
    color: #606f7b;
  }

  .text-blue {
    color: blue;
  }
  .card {
    border: none;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    /* border-radius: 0.25rem; */
  }

  .list-none {
    list-style: none;
    padding: 0;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .display-none {
    display: none;
  }
  /* login */

  #sidebar .list-group-item {
    border-radius: 0;
    background-color: #333;
    color: #ccc;
    border-left: 0;
    border-right: 0;
    border-color: #2c2c2c;
    white-space: nowrap;
}

/* highlight active menu */
#sidebar .list-group-item:not(.collapsed) {
    background-color: #222;
}

/* closed state */
#sidebar .list-group .list-group-item[aria-expanded="false"]::after {
  content: " \f0d7";
  font-family: FontAwesome;
  display: inline;
  text-align: right;
  padding-left: 5px;
}

/* open state */
#sidebar .list-group .list-group-item[aria-expanded="true"] {
  background-color: rgb(238, 224, 224);
}
#sidebar .list-group .list-group-item[aria-expanded="true"]::after {
  content: " \f0da";
  font-family: FontAwesome;
  display: inline;
  text-align: right;
  padding-left: 5px;
}

/* level 1*/
#sidebar .list-group .collapse .list-group-item  {
  padding-left: 20px;
}
/* level 2*/
#sidebar .list-group .collapse > .collapse .list-group-item {
  padding-left: 30px;
}
/* level 3*/
#sidebar .list-group .collapse > .collapse > .collapse .list-group-item {
  padding-left: 40px;
}
@media (max-width:48em) {
    /* overlay sub levels on small screens */
    #sidebar .list-group .collapse.in, #sidebar .list-group .collapsing {
        position: absolute;
        z-index: 1;
        width: 190px;
    }
    #sidebar .list-group > .list-group-item {
        text-align: center;
        padding: .75rem .5rem;
    }
    /* hide caret icons of top level when collapsed */
    #sidebar .list-group > .list-group-item[aria-expanded="true"]::after,
    #sidebar .list-group > .list-group-item[aria-expanded="false"]::after {
        display:none;
    }
}
/* change transition animation to width when entire sidebar is toggled */
#sidebar.collapse {
  -webkit-transition-timing-function: ease;
       -o-transition-timing-function: ease;
          transition-timing-function: ease;
  -webkit-transition-duration: .2s;
       -o-transition-duration: .2s;
          transition-duration: .2s;
}
#sidebar.collapsing {
  opacity: 0.8;
  width: 0;
  -webkit-transition-timing-function: ease-in;
       -o-transition-timing-function: ease-in;
          transition-timing-function: ease-in;
  -webkit-transition-property: width;
       -o-transition-property: width;
          transition-property: width;

}
/* sidebar */

.navbar {
  height: 45px;
}
#search-nav-b{
  width: 500px
  }
  #search-nav
  {
    margin-left: 20px;
    margin-right: 100px;
  }
  #main-admin{
    margin-top: 10px
  }
</style>
