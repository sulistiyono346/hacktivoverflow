<template>
    <div>
        <div class="row">
            <h3>Questions</h3>
        </div>
        <hr>
        <div class="row">
          <div>
            <div v-if="this.success_status==true" class="alert alert-success text-center" role="alert">
              {{success_message}}
            </div>
            <div v-if="this.failed_status==true" class="alert alert-danger text-center" role="alert">
              {{failed_message}}
            </div>
            </div>
            <div class="col-md-12">
                <div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Title</label>
                    <input v-model="question.title" type="text" class="form-control"  aria-describedby="emailHelp" placeholder="title">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Questions</label>
                    <textarea v-model="question.description" class="form-control" id="exampleFormControlTextarea1" rows="8"></textarea>
                </div>
                 <div class="form-group">
                    <label for="exampleInputPassword1">Tag</label>
                    <input @keyup.enter="tags()" type="text" v-model="tag" class="form-control" id="exampleInputPassword1" placeholder="">
                    <br>
                    <div class="row"> 
                    <div v-for="(tag,index) in question.tags" :key="index"  class="col-md-1"><span @click="remove_tag(index)" class="badge badge-secondary">{{tag}}</span></div>  
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" @click="update_question">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from '@/api/api.js'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'update',
  data () {
    return {
      success_message: '',
      failed_message: '',
      success_status: false,
      failed_status: false,
      tag: '',
      question: {
        title: '',
        description: '',
        tags: []
      }
    }
  },
  methods: {
    tags () {
      this.question.tags.push(this.tag)
      this.tag= ""
    },
    remove_tag (index) {
      this.question.tags.splice(index,1)
    },
    ...mapActions([
      'getSinglequestion','getQuestions'
    ]
    ),

    showUpdateData () {
      this.question = this.singleQuestion
    },
    update_question () {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'PUT',
        url: `/questions/${this.question._id}`,
        headers: {
          token: accessToken
        },
        data: this.question
      })
        .then(({ data }) => {
          this.question.title = ''
          this.question.description = ''
          this.question.tags = ''
          this.success_status = true
          this.success_message = data.message
          this.getQuestions()
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
    }
  },
  computed: mapState([
    'singleQuestion'
  ]),
  mounted () {
    this.showUpdateData()
  },
  created () {
    this.getSinglequestion(this.$route.params.id)
  }
}
</script>
