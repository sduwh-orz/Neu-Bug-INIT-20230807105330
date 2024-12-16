<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "LogoutView",
  mounted() {
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    this.$router.push('/login')
  }
})
</script>

<template>

</template>

<style scoped>

</style>