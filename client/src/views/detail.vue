<template>
    <div class="detail" style="margin-left:20px">
     <div class="row">
          <div class="col-md-12">
            <h5>{{question.title}}</h5>
          <hr>
          <div class="row">
              <div class="col-md-1">
                <div class="row">
                  <a @click="upVoteQuestion" class="far fa-caret-square-up" style="font-size:2.5rem"></a>
                </div>
                <div class="row">
                <h4>{{singleQuestion.up_vote.length-singleQuestion.down_vote.length}}</h4>
                </div>
                <div class="row">
                <i  @click="downVoteQuestion" class="far fa-caret-square-down" style="font-size:2.5rem"></i>
                </div>
              </div>
              <div class="col-md-10">
                <p>{{question.description}}</p>
              </div>
            </div>
            <hr>
            <list></list>
            <answer></answer>
          </div>
        </div>
    </div>
</template>
<script>

import list from '@/components/list-answer.vue'
import answer from '@/components/answer.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'detail',
  data () {
    return {
      question: {
        title: '',
        description: '',
        tag: ''
      }
    }
  },
  components: {
    list,
    answer
  },
  methods: {
    ...mapActions([
      'getSinglequestion', 'getAnswer', 'questionsUpVote', 'questionsDownVote'
    ]
    ),
    showUpdateData () {
      this.question = this.singleQuestion
    },
    upVoteQuestion () {
    this.questionsUpVote(this.$route.params.id)
    },
    downVoteQuestion () {
    this.questionsDownVote(this.$route.params.id)
    }
  },
  computed: mapState([
    'singleQuestion'
  ]),
  mounted () {
    this.showUpdateData()
  },
  created () {
    this.getAnswer(this.$route.params.id)
    this.getSinglequestion(this.$route.params.id)
  }
}
</script>
