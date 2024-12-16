<script lang="ts">
import { reactive } from 'vue'
import { Expand, Fold, UserFilled } from '@element-plus/icons-vue'
import user from '@/api/user.ts'

let userData = {}

function detectLoginStatus(route, router) {
  if (route.path != '/login') {
    let loggedInUser = user.getLoggedInUser()
    if (!loggedInUser) {
      router.push('/login')
    } else {
      userData = loggedInUser
    }
  }
}

export default {
  name: "PageHeader",
  components: { UserFilled, Fold, Expand },
  data() {
    return {
      user: reactive(userData)
    }
  },
  watch: {
    $route(to, from) {
      if (to.fullPath != from.fullPath) {
        detectLoginStatus(this.$route, this.$router)
        this.user = userData
      }
    }
  }
}
</script>

<template>
<el-menu
    :router="true"
    :ellipsis="false"
    class="el-menu"
    mode="horizontal"
>
  <el-menu-item id="page-title" index="0" disabled>
    <el-text class="mx-1" size="large" tag="b">软件缺陷管理系统</el-text>
  </el-menu-item>
  <div class="flex-grow" />
  <el-sub-menu index="user" v-if="user.username && !$route.meta.notLoggedIn">
    <template #title><el-icon><UserFilled /></el-icon><el-text>{{ user.realName }}</el-text>&nbsp;&nbsp;<el-tag type="primary">{{ user.role }}</el-tag></template>
    <el-menu-item index="/user/info">用户信息</el-menu-item>
    <el-menu-item index="/user/password">修改密码</el-menu-item>
    <el-menu-item index="/logout">登出</el-menu-item>
  </el-sub-menu>
</el-menu>
</template>