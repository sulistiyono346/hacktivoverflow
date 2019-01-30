<template>
    <div>
     <div class="row">
      <div class="col-md-6">
            <h4>Top Questions</h4>
          </div>
          <div class="col-md-6">
             <div class="text-right">
            <router-link  to="/questions/ask">
            <button type="button" class="btn btn-info"  data-toggle="modal" data-target="#askQusetion">Ask Questions</button>
            </router-link>
             </div>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-md-6">
          </div>
           <div class="menu">
            <div class="col-md-6">
            <table class="table table-bordered table-sm">
              <tbody>
                <tr>
                  <th scope="row">Interesting</th>
                  <td>BestQuestions</td>
                  <td>Featured</td>
                  <td>Week</td>
                  <td>Month</td>
                </tr>
              </tbody>
            </table>
            </div>
           </div>
        </div>
        <hr>
        <div class="questions" v-for="question in questions" :key="question._id">
        <div class="value">
            <div class="row">
              <div class="col-md-4">
                  <div class="row text-center">
                      <div class="col-md-6">
                      <div class="col-md-6">
                        <div class="text-center">
                        <img :src="question.user.img" alt="..." style="width:50px; height: 50px; " class="rounded-circle ml-5">
                        </div>
                      </div>
                      </div>
                      <div class="col-md-6">
                        <h4>{{question.up_vote.length-question.down_vote.length}}</h4>
                      </div>
                  </div>
                  <div class="row text-center">
                      <div class="col-md-6">
                      </div>
                      <div class="col-md-6">
                        <p>Votes</p>
                      </div>
                  </div>
              </div>
              <div class="col-md-8">
                <div class="row">
                 <a @click="question_detail (question._id)">
                     <h6>{{question.title}}</h6>
                  </a>
                </div>
               <div class="row">
                  <div v-for="tag in question.tags" :key="tag"  class="col-md-1"><span class="badge badge-secondary"><a @click="add_watch_tag(tag)">{{tag}}</a></span></div>
                </div>
              </div>
            </div>
            <hr>
        </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex'
import axios from '@/api/api.js'
export default {
  name: 'mainpages',
  methods: {
    ...mapActions([
      'getUser','getQuestions'
    ]
    ),
    question_detail (id) {
      this.$router.push('/detail/' + id)
    },
    add_watch_tag (tag) {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'PUT',
        url: '/tags',
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
    'questions'
  ]),
  created () {
    this.getQuestions ()
  },
}
</script>
