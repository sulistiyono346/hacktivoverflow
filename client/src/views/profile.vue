<template>
  <div>
     <div class="row">
      <div class="col-md-6">
        <h4>Your Questions</h4>
          </div>
          <div class="col-md-6">
             <div class="text-right">
            <img src="https://www.clipartmax.com/png/middle/171-1717870_stockvader-predicted-cron-for-may-user-profile-icon-png.png" alt="..." style="width:100px; height: 100px; " class="rounded-circle ml-5">
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
        <div class="value" v-for="question in ownquestions" :key="question._id">
            <div class="row">
              <div class="col-md-4">
                  <div class="row text-center">
                      <div class="col-md-6">
                        <img :src="question.user.img" alt="..." style="width:50px; height: 50px; " class="rounded-circle ml-5">
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
                <br>
                <div class="row">
                  <a class="fas fa-edit" @click="question_update(question._id)"></a>
                   &nbsp; &nbsp;
                   <a  @click="deleteQuestion(question._id)" class="far fa-trash-alt"></a>
                </div>
              </div>
            </div>
            <hr>
        </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: mapState([
    'ownquestions'
  ]),
  methods: {
    ...mapActions([
      'getOwnQuestions', 'deleteQuestion'
    ]
    ),
    question_update (id) {
      this.$router.push('/questions/update/' + id)
    },
    question_detail (id) {
      this.$router.push('/detail/' + id)
    }
  },
  created () {
    this.getOwnQuestions()
  }
}
</script>
