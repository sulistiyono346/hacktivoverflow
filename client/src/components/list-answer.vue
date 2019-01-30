<template>
  <div class="list-answer">
      <div class="row" >
        <div class="col-md-12">
        <h5>{{answers.length}} Answers</h5>
      <hr>
      </div>
      <div class="col-md-12" v-for="answer in answers" :key="answer._id">
        <div class="row">
          <div class="col-md-1">
            <div class="row">
              <a @click="upVoteAnswer(answer._id)" class="far fa-caret-square-up" style="font-size:2.5rem"></a>
            </div>
            <div class="row">
            <h4>{{answer.up_vote.length-answer.down_vote.length}}</h4>
            </div>
            <div class="row">
            <a @click="downVoteAnswer(answer._id)" class="far fa-caret-square-down" style="font-size:2.5rem"></a>
            </div>
          </div>
          <div class="col-md-10">
            <p>{{answer.description}}</p>
            <div v-show="answer.user == userLogin.id">
              <p><a @click='getSingleAnswer(answer._id)' class = "fas fa-edit"></a></p>
            </div>
          </div>
        </div>
        <hr>
      </div>
   </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'list',
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'getSingleAnswer', 'answerUpVote', 'answerDownVote'
    ]
    ),
    upVoteAnswer (id) {
      this.answerUpVote(id)
    },
    downVoteAnswer (id) {
      this.answerDownVote(id)
    }
  },
  computed: mapState([
    'answers', 'userLogin'
  ])
}
</script>
