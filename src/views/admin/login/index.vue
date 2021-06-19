<template>
  <div class="login-wraper">
    <form class="form-signin" enctype="multipart/form-data" @submit.prevent="handleLogin">
      <div class="text-center mb-4">
        <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Trykrem Login</h1>
        <p>Build form controls with floating labels via the </p>
      </div>
      <div class="form-label-group">
        <label>Username</label>
        <input v-model="loginForm.username" type="text" class="form-control" placeholder="Username" required="" autofocus="">
      </div>
      <div class="form-label-group">
        <label>Password</label>
        <input v-model="loginForm.password" type="password" class="form-control" placeholder="Password" required="">
      </div>
      <!-- <div class="form-label-group">
        <div style="margin-bottom:5px;">Code</div>
        <div class="code-verify">
          <input v-model="loginForm.captcha" type="text" style="width:265px;margin-right:5px" class="form-control" placeholder="Code" required="">
          <input
            v-model="loginForm.key"
            type="hidden"
          >
          <img :src="verifcationImag" style="height:55%" @click="getCode">
        </div>
      </div> -->
      <div class="checkbox mb-3">
        <label>
          <input v-model="loginForm.rememberMe" type="checkbox"> Remember me
        </label>
      </div>
      <button class="btn btn-md btn-outline-primary btn-block" type="submit">Sign In</button>
      <div style="padding:10px 0px">
        <p>Forgot your password? <router-link to="#"> Reset it here.</router-link></p>
      </div>
      <div class="dropdown-divider" />
      <div>
        <h3>Don't have an account?</h3>
        <p>Either you are a company or a developer, what are you waiting for?</p>
        <router-link class="btn btn-md btn-outline-primary btn-block" to="/register">Register</router-link>
      </div>
      <p class="mt-5 mb-3 text-muted text-center">Trykrem © 2021</p>
    </form>
  </div>
</template>
<script>
// import { encrypt } from '@/utils/rsaEncrypt'
import { getVerificationCode } from '@/api/login'
import Config from '@/settings'
import Cookies from 'js-cookie'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        rememberMe: false
        // captcha: '',
        // key: ''

      },
      redirect: undefined,
      verifcationImag: '',
      cookiePass: ''
    }
  },
  watch: {
    $router: {
      handler: function(router) {
        const query = router.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // not have code
    // this.getCode()
    // get cookies token
    this.getCookie()
    // get point token
    this.point()
  },
  methods: {
    getCode() {
      getVerificationCode('math').then(res => {
        this.verifcationImag = res.img
        this.loginForm.key = res.key
      })
    },
    getCookie() {
      const username = Cookies.get('username')
      let password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      // this.cookiePass = password === undefined ? '' : password
      password = password === undefined ? this.loginForm.password : password
      this.loginForm = {
        username: username === undefined ? this.loginForm.email : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
        // captcha: ''
      }
    },
    handleLogin() {
      const user = {
        username: this.loginForm.username,
        password: this.loginForm.password,
        rememberMe: this.loginForm.rememberMe
        // captcha: this.loginForm.captcha,
        // key: this.loginForm.key
      }

      // if (user.password !== this.cookiePass) {
      //   user.password = encrypt(user.password)
      // }

      if (user.rememberMe) {
        Cookies.set('username', user.username, { expires: Config.passCookieExpires })
        Cookies.set('password', user.password, { expires: Config.passCookieExpires })
        Cookies.set('rememberMe', user.rememberMe, { expires: Config.passCookieExpires })
      } else {
        Cookies.remove('username')
        Cookies.remove('password')
        Cookies.remove('rememberMe')
      }
      this.$store.dispatch('Login', user).then(() => {
        this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
      }).catch(() => {
        // this.getCode()
        console.log('Login error')
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      })
    },
    point() {
      const point = Cookies.get('point') !== undefined
      if (point) {
        this.$notify({
          title: 'Warning',
          message: 'The current login status has expired, please log in again!',
          type: 'warning',
          duration: 5000
        })
        Cookies.remove('point')
      }
    }
  }
}
</script>
<style scoped>
.login-wraper {
  padding:50px 0px;
}
.code-verify {
  display: inline-flex
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
