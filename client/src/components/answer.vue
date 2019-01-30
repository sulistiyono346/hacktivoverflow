<template>
<div class="answer">
    <div class="row">
         <div>
            <div v-if="this.success_status==true" class="alert alert-success text-center" role="alert">
              {{success_message}}
            </div>
            <div v-if="this.failed_status==true" class="alert alert-danger text-center" role="alert">
              {{failed_message}}
            </div>
        </div>
      <form v-on:submit.prevent="add_question" v-if="update==false">
        <div class="form-group">
        <label for="exampleFormControlTextarea1">Your Answer</label>
        <textarea v-model="answer_data.description" class="form-control" id="exampleFormControlTextarea1" rows="7" style="width:720px"></textarea>
        </div>
        <button type="submit" class="btn btn-info">Post Your Answer</button>
        <br>
      </form>
      <form v-on:submit.prevent="update_question" v-if='update==true'>
        <div class="form-group">
        <label for="exampleFormControlTextarea1">Your Answer</label>
        <textarea v-model="answer_data.description" class="form-control" id="exampleFormControlTextarea1" rows="7" style="width:720px"></textarea>
        </div>
        <button type="submit" class="btn btn-info">Update Your Answer</button>
        <br>
      </form>
    </div>
</div>
</template>
<script>
import axios from '@/api/api.js'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'answer',
  data () {
    return {
      update: false,
      success_message: '',
      failed_message: '',
      success_status: false,
      failed_status: false,
      answer_data: {
        description: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'getAnswer'
    ]),
    add_question (id) {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'POST',
        url: `/answers/${this.$route.params.id}`,
        headers: {
          token: accessToken
        },
        data: {
          description: this.answer_data.description
        }
      })
        .then(({ data }) => {
          this.answer_data.description = ''
          this.success_status = true
          this.success_message = data.message
          this.getAnswer(this.$route.params.id)
          this.getAnswer()
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
    update_question () {
      let accessToken = localStorage.getItem('token')
      axios({
        method: 'PUT',
        url: `/answers/${this.answer_data._id}`,
        headers: {
          token: accessToken
        },
        data: {
          description: this.answer_data.description,
          question_id: this.answer_data.question_id
        }
      })
        .then(({ data }) => {
          this.answer_data.description = ''
          this.success_status = true
          this.success_message = data.message
          this.getAnswer(this.$route.params.id)
          this.getAnswer()
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
    'answer'
  ]),
  watch: {
    answer: function (val) {
      this.update = true
      this.answer_data = val
    }
  }
}
</script>
