<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "PageHeader"
})
</script>

<template>
<el-menu
    :router="true"
    class="el-menu"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
>
  <el-menu-item id="page-title" index="0" disabled>
    <el-text class="mx-1" size="large" tag="b">软件缺陷管理系统</el-text>
  </el-menu-item>
  <div class="flex-grow" />
  <el-sub-menu index="user" v-if="!$route.meta.notLoggedIn">
    <template #title><el-icon><UserFilled /></el-icon><el-text>管理员</el-text>&nbsp;&nbsp;<el-tag type="primary">管理员</el-tag></template>
    <el-menu-item index="/user/info">用户信息</el-menu-item>
    <el-menu-item index="/user/password">修改密码</el-menu-item>
    <el-menu-item index="/logout">登出</el-menu-item>
  </el-sub-menu>
</el-menu>
</template>