<script lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Navigation from '@/components/Navigation.vue'
import PageHeader from '@/components/PageHeader.vue'

export default {
  components: {
    Navigation, PageHeader, RouterView
  },
  setup() {
    return {
      header: ref()
    }
  }
}
</script>

<template>
  <div class="main">
    <el-container style="height: 100%;">
      <el-header padding="0">
        <PageHeader ref="header"/>
      </el-header>
      <el-container>
        <el-aside width="collapse" v-if="!$route.meta.notLoggedIn">
          <Navigation/>
        </el-aside>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>