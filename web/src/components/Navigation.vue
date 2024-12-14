<script lang="ts">
import { RouterLink } from 'vue-router'
import { Aim, Avatar, Expand, Fold, List, OfficeBuilding, Operation } from '@element-plus/icons-vue'
import { routes } from '@/router'

export default {
  name: "Navigation",
  components: {Expand, Fold, Avatar, Aim, List, OfficeBuilding, Operation, RouterLink },
  computed: {
    loggedInUser() {
      return this.$store.state.user
    },
    filteredRoutes() {
      return routes.filter(route => route.meta?.hidden === false
          && (!route.meta.requiresLeader || this.loggedInUser?.leader || this.loggedInUser?.role?.name == '管理员')
          && (!route.meta.requiresAdmin || this.loggedInUser?.role?.name == '管理员')
      )
    },
    getActiveRoute() {
      let nowPath = this.$route.path
      for (let route of routes) {
        if (route.children)
          for (let sub of route.children) {
            if (route.path + '/' + sub.path == nowPath) {
              if (sub.meta?.hidden === false) {
                return nowPath
              } else {
                return route.path + '/list'
              }
            }
          }
      }
    }
  },
  data() {
    return {
      isNavCollapsed: false,
    }
  },
  methods: {
    toggleNavCollapse() {
      this.isNavCollapsed = !this.isNavCollapsed
    }
  }
}
</script>

<template>
  <el-menu
      ref="menu"
      :default-active="getActiveRoute"
      :router="true"
      :collapse="isNavCollapsed"
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical"
      text-color="#fff"
      style="height: 100%"
  >
    <el-sub-menu v-for="route in filteredRoutes" :index="route.meta.title">
      <template #title>
        <el-icon v-if="route.meta.icon"><component :is="route.meta.icon" /></el-icon>
        <span>{{ route.meta.title }}</span>
      </template>
      <el-menu-item v-for="sub in route.children.filter(i => i.meta?.hidden === false)" :index="route.path + '/' + sub.path">{{ sub.meta.title }}</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="" @click="toggleNavCollapse()">
      <el-icon>
        <Expand v-if="isNavCollapsed"/>
        <Fold v-else/>
      </el-icon>
      <template #title>
        <span class="disable-select" v-if="isNavCollapsed">展开面板&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
        <span class="disable-select" v-else>收起面板&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
</style>