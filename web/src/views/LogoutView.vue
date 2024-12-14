<script lang="ts">
import {defineComponent} from 'vue'
import user from '@/api/user.ts'

export default defineComponent({
  name: "LogoutView",
  mounted() {
    user.logout().then(() => {
      localStorage.removeItem('loggedIn')
      this.$store.commit('clearUser')
      this.$router.push('/login')
    }).catch((err) => {
      console.log(err)
    })
  }
})
</script>

<template>

</template>

<style scoped>

</style>