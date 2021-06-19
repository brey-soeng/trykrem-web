<template>
  <b-alert
    style="margin:5px 0px"
    :show="dismissCountDown"
    dismissible
    variant="danger"
    @dismissed="dismissCountDown=0"
    @dismiss-count-down="countDownChanged"
  >
    <p>{{ getMessage }} {{ dismissCountDown }} seconds...</p>
    <b-progress
      variant="danger"
      :max="dismissSecs"
      :value="dismissCountDown"
      height="4px"
    />
  </b-alert>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    dismissSecs: {
      type: Number,
      default: 0
    },
    dismissCountDown: {
      type: Number,
      default: 0
    }
  },
  computed: {
    getMessage: function() {
      return this.message
    }

  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    }
  }
}
</script>
