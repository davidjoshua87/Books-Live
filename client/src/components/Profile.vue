<template>
  <div>
    <Navbar></Navbar>
    <header class="masthead">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="site-heading">
              <h1>{{title}}</h1>
              <span class="subheading">{{description}}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import HeaderNav from '@/components/HeaderNav'
import {
  mapState
} from 'vuex'

export default {
  data () {
    return {
      title: 'ABOUT ME',
      description: 'Its Cool'
    }
  },
  components: {
    Navbar,
    HeaderNav
  },
  computed: {
    ...mapState([
      'user'
    ])
  }
}
</script>

<style lang="css">
</style>
