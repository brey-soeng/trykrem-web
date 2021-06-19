<template>
  <div class="register-wraper">
    <form class="form-signin" @submit.prevent="handleRegister">
      <div class="text-center mb-4">
        <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Trykrem register</h1>
        <p>Build form controls with floating labels via the </p>
      </div>
      <div class="form-label-group">
        <label>Name</label>
        <input v-model="name" value="Mark" type="text" class="form-control" placeholder="Email address" required autofocus="">
      </div>
      <div class="form-label-group">
        <label>Email address</label>
        <input v-model="email" type="email" class="form-control" placeholder="Email address" required autofocus="">
      </div>
      <div class="form-label-group">
        <label>New Password</label>
        <input v-model="newPassword" type="password" class="form-control" placeholder="Password" required autofocus="">
      </div>
      <div class="form-label-group">
        <label>Confirmed Password</label>
        <input v-model="password_confirmation" type="password" class="form-control" placeholder="Confirm password" required autofocus="">
        <!-- <alert
          v-if="newPassword !== password_confirmation"
          :message="alertMessage"
        /> -->
      </div>
      <div class="checkbox mb-3">
        <label>
          <input v-model="checked" type="checkbox" value="remember-me"> I agree with the <router-link to="#"> Terms of use.</router-link>
          <!-- <alert
            v-if="checked"
            :message="alertMessage"
          /> -->
        </label>
      </div>
      <button class="btn btn-outline-primary btn-block btn-md" type="submit">Sign up</button>
      <p class="mt-5 mb-3 text-muted text-center">Trykrem © 2021</p>
    </form>

    <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;">
      <!-- Position it -->
      <div style="position: absolute; top: 0; right: 0;">
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <img src="#" class="rounded mr-2" alt="#">
            <strong class="mr-auto">Bootstrap</strong>
            <small class="text-muted">2 seconds ago</small>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="toast-body">
            Heads up, toasts will stack automatically
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
// import alert from '@/components/alert'
export default {
  name: 'Register',
  components: { },
  data() {
    return {
      show: false,
      alertMessage: '',
      email: '',
      newPassword: '',
      password_confirmation: '',
      name: '',
      checked: false
    }
  },
  methods: {

    async handleRegister() {
      await axios.post('/register', {
        name: this.name,
        email: this.email,
        password: this.newPassword,
        password_confirmation: this.password_confirmation
      })
      this.$router.push('/login')
    }

  }
}
</script>
<style scoped>
.register-wraper {
  padding:50px 0px;
}
.form-signin {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 12px 8px 11px #ddd;;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

</style>
