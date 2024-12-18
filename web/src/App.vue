<script lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
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
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    store.dispatch('fetchUser').then(() => {
      if (route.matched.length > 0)
        if (route.matched[0].meta.requiresLeader)
          if (store.state.user?.leader === false && store.state.user?.role?.name !== '管理员')
            router.push('/user/info')
        else if (route.matched[0].meta.requiresAdmin && store.state.user?.role?.name !== '管理员')
            router.push('/user/info')
      if (route.meta.notLoggedIn && store.state.user)
        router.push('/user/info')

      if (!store.state.user) {
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