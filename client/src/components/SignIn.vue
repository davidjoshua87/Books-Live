<template>
<div class="container">
  <Navbar></Navbar>
  <div class="row vertical-offset-100">
    <div class="col-md-4 offset-md-4 my-auto">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Please Login</h3><br>
        </div>
        <div class="panel-body">
          <div class="form-group">
            <input class="form-control" placeholder="Username" name="username" type="text" v-model="loginData.username">
          </div>
          <div class="form-group">
            <input class="form-control" placeholder="Password" name="password" type="password" v-model="loginData.password">
          </div>
          <input class="btn btn-lg btn-success btn-block" type="submit" value="Login" @click="emitLogin">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Navbar from '@/components/Navbar'
import swal from 'sweetalert2'

export default {
  name: 'SignIn',
  components: {
    Navbar
  },
  data () {
    return {
      loginData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    emitLogin: function () {
      this.$store.dispatch('emitLogin', this.loginData)
      this.loginData.username = ''
      this.loginData.password = ''
      this.$router.push({
        path: '/'
      })
      swal(
        'Good job!',
        'You are loggin now!',
        'success'
      )
    }
  }
}
</script>

<style scoped>
.vertical-offset-100 {
  padding-top: 100px;
}
</style>
