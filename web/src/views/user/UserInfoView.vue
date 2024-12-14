<script lang='ts'>
import { CreditCard, Guide, Message, Tickets, User } from '@element-plus/icons-vue'
import BreadCrumbNav from '@/components/BreadCrumbNav.vue'

export default {
  components: { Message, Guide, CreditCard, User, Tickets, BreadCrumbNav },
  computed: {
    loggedInUser() {
      return this.$store.state.user
    }
  },
}
</script>

<template>
  <BreadCrumbNav :page-paths="['我的面板', '用户信息']"></BreadCrumbNav>
  <el-card class="info-card" shadow="never" v-if="loggedInUser">
    <template #header>
        <div class="card-header">
            <el-icon><Tickets /></el-icon>&nbsp;&nbsp;用户信息
        </div>
    </template>
    <el-descriptions
    border
    :column="1"
    label-width="20%"
    style="margin-top: 10px;"
    >
      <el-descriptions-item>
        <template #label>
          <el-icon><User /></el-icon>&nbsp;&nbsp;用户名
        </template>
        {{ loggedInUser.username }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon><CreditCard /></el-icon>&nbsp;&nbsp;真实姓名
        </template>
        {{ loggedInUser.realName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon><Guide /></el-icon>&nbsp;&nbsp;角色
        </template>
        {{ loggedInUser.role.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon><Message /></el-icon>&nbsp;&nbsp;邮箱
        </template>
        {{ loggedInUser.email }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<style scoped>
</style>
