<template>
  <div>
    <navbar />
    <div class="container-fluid">
      <app-main />
    </div>
  </div>
</template>
<script>
import { Navbar, AppMain } from './components'
export default {
  name: 'Layout',
  components: { Navbar, AppMain }
}
</script>
