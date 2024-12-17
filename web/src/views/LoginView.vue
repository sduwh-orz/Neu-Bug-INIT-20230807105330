<script lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import user from '@/api/user.ts'
export default {
  computed: {
    loggedInUser() {
      return this.$store.state.user
    }
  },
  setup() {
    const form = reactive({
      username: '',
      password: ''
    })
    return {
      form,
    }
  },
  mounted() {
    if (this.loggedInUser) {
      useRouter().push('/project/list')
    }
  },
  methods: {
    login() {
        user.login(this.form.username, this.form.password).then(response => {
        if (response.success) {
          user.getLoggedInUser().then(user => {
            localStorage.setItem('loggedIn', 'ok')
            this.$store.commit('setUser', user)
            this.$router.push('/project/list')
            ElMessage.success('登录成功')
          })
        } else {
          ElMessage.error(response.message)
          if (response.message == '已登录') {
            this.$router.push('/project/list')
          }
        }
      }).catch(() => {
        ElMessage.error('未知错误')
      })
    }
  }
}
</script>

<template>
  <el-row justify="center" style="margin-top: 60px">
    <el-col :span="24" class="center-items">
      <el-container id="main-container">
        <el-aside id="image">
          <img alt="" src="/login.jpg">
        </el-aside>
        <el-main style="max-width: 300px; margin-left: 10px">
          <el-text tag="b">系统登录</el-text>
          <el-divider />
          <el-form :model="form" label-width="auto">
            <el-form-item label="用户名">
              <el-input
                  v-model="form.username"
                  @keyup.enter="login"
              />
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                  v-model="form.password"
                  type="password"
                  @keyup.enter="login"
                  show-password
              />
            </el-form-item>
          </el-form>
          <el-container style="justify-content: end">
            <el-button type="primary" @click="login">登录</el-button>
          </el-container>
        </el-main>
      </el-container>
    </el-col>
  </el-row>
</template>

<style scoped>
#main-container {
  width: 1000px;
  height: 250px;
  justify-content: center;
}
#image {
  max-height: 250px;
  width: auto;
  overflow: hidden;
}
#image img {
  max-height: 250px;
}
.center-items {
  justify-items: center;
}
</style>