<template>
<div>
  <router-view></router-view>
    <div v-if="this.$route.path =='/questions'">
     <div class="row" >
      <div class="col-md-6">
            <h4>All Questions</h4>
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
        <div class="questions">
        <div class="value" v-for="question in questions" :key="question._id">
            <div class="row">
              <div class="col-md-4">
                  <div class="row text-center">
                      <div class="col-md-6">
                      <div class="col-md-6">
                        <img :src="question.user.img" alt="..." style="width:50px; height: 50px; " class="rounded-circle ml-5">
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
                    <div v-for="tag in question.tags" :key="tag"  class="col-md-1"><span class="badge badge-secondary">{{tag}}</span></div>
                  </div>
              </div>
            </div>
            <hr>
        </div>
        </div>
    </div>
</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  methods: {
    question_detail (id) {
      this.$router.push('/detail/' + id)
    }
  },
  computed: mapState([
    'questions'
  ])
}
</script>
