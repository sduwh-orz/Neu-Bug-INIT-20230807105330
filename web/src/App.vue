<script lang="ts">
import { RouterView, useRouter } from 'vue-router'
import Navigation from '@/components/Navigation.vue'
import PageHeader from '@/components/PageHeader.vue'

export default {
  components: {
    Navigation, PageHeader, RouterView
  },
  computed: {
    loggedInUser() {
      return this.$store.state.user
    }
  },
  mounted() {
    const router = useRouter()
    this.$store.dispatch('fetchUser').then(() => {
      if (!this.$store.state.user) {
        localStorage.removeItem('isLoggedIn')
        router.push('/login')
      }
    })
  },
}
</script>

<template>
  <div class="main">
    <el-container style="height: 100%;">
      <el-header padding="0">
        <PageHeader ref="header"/>
      </el-header>
      <el-container>
        <el-aside width="collapse" v-if="loggedInUser">
          <Navigation/>
        </el-aside>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>