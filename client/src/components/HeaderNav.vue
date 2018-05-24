<template>
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
</template>

<script>
export default {
  name: 'HeaderNav',
  props: ['title', 'description'],
  data () {
    return {}
  }
}
</script>

<style scoped>
</style>
