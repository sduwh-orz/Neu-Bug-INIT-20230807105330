<script lang="ts">
import { RouterLink } from "vue-router"
import {Aim, Avatar, Expand, Fold, List, OfficeBuilding, Operation} from "@element-plus/icons-vue"

export default {
  name: "Navigation",
  components: {Expand, Fold, Avatar, Aim, List, OfficeBuilding, Operation, RouterLink },
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
      :default-active="this.$route.path"
      :router="true"
      :collapse="isNavCollapsed"
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical"
      text-color="#fff"
      style="height: 100%"
  >
    <el-sub-menu index="me">
      <template #title>
        <el-icon><Operation /></el-icon>
        <span>我的面板</span>
      </template>
      <el-menu-item index="/user/info">用户信息</el-menu-item>
      <el-menu-item index="/user/password">修改密码</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="project">
      <template #title>
        <el-icon><OfficeBuilding /></el-icon>
        <span>项目管理</span>
      </template>
      <el-menu-item index="/project/list">项目管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="task">
      <template #title>
        <el-icon><List /></el-icon>
        <span>任务分配</span>
      </template>
      <el-menu-item index="/task/list">任务分配</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="bug">
      <template #title>
        <el-icon><Aim /></el-icon>
        <span>Bug 管理</span>
      </template>
      <el-menu-item index="/bug/list">Bug 管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="user">
      <template #title>
        <el-icon><Avatar /></el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item index="/user/list">用户管理</el-menu-item>
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