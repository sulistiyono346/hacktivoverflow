<template>
  <div class="home">
    <div class="row">
      <div class="col-md-12">
        <mainpage></mainpage>
      </div>
      </div>
  </div>
</template>
<script>
import mainpage from '@/components/home/main_pages.vue'
export default {
  name: 'home',
  components: {
    mainpage
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style>
.menu {
  font-size: 13px
}
.menu tr {
 float:right
}
</style>
