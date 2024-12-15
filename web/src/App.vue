<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'
import PageHeader from "@/components/PageHeader.vue";
</script>

<template>
  <div class="main">
    <el-container style="height: 100%;">
      <el-header padding="0">
        <PageHeader/>
      </el-header>
      <el-container>
        <el-aside width="200px" v-if="!$route.meta.notLoggedIn">
          <Navigation />
        </el-aside>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
export default {
}
</script>