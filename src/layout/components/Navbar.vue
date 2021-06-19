<template>
  <nav class="navbar navbar-expand-lg navbar-light navbar-background-color">
    <div class="container-fluid wrap-navbar-fluid">
      <router-link class="navbar-brand " to="/">
        <span class="navbar-brand mb-0 h1">Navbar</span>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon" />
      </button>
      <div id="navbarTogglerDemo02" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <div class="d-flex">
          <ul class="navbar-nav ">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item dropdown">
              <button id="navbarDropdown" class="nav-link dropdown-toggle btn btn-outline-secondary" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span>{{ user }}</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-list" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item" @click="logout">Logout</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>

</template>
<script>
// import Logout from './settings/setting.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  components: { },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss">
.navbar-background-color {
  background-color: #ffffff;
  border-bottom: 1px solid #dee2e6;
}
.dropdown-menu-list li a {
  cursor: pointer;
}
#navbarDropdown span {
  text-transform: capitalize;

}
</style>
