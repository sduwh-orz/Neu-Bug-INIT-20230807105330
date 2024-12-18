<script lang="ts">
import {reactive, ref} from 'vue'
import { ElMessage } from 'element-plus'
import user from '@/api/user.ts'

const formDataRef = ref()

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
      formDataRef,
      rules: reactive({
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          { max: 30, message: '用户名长度最多为30位', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]+$/, message: '用户名仅能包含字母和数字', trigger: 'blur' },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          { max: 20, message: '密码长度最多为20位', trigger: 'blur' },
          { min: 6, message: '密码长度至少为6位', trigger: 'blur' },
        ],
      })
    }
  },
  mounted() {
    console.log(this.loggedInUser)
    if (this.loggedInUser) {
      this.$router.push('/user/info')
    }
  },
  methods: {
    login() {
      try {
        formDataRef.value.validate((valid: any) => {
          if (valid) {
            user.login(this.form.username, this.form.password).then(response => {
              if (response.success) {
                user.getLoggedInUser().then(user => {
                  localStorage.setItem('loggedIn', 'ok')
                  this.$store.commit('setUser', user)
                  this.$router.push('/user/info')
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
          } else {
            ElMessage.error('请检查输入')
          }
        })
      } catch (error) {
        ElMessage.error('请检查输入')
      }
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
          <el-form ref="formDataRef" :model="form" :rules="rules" label-width="auto" hide-required-asterisk>
            <el-form-item label="用户名" prop="username">
              <el-input
                  v-model="form.username"
                  @keyup.enter="login"
              />
            </el-form-item>
            <el-form-item label="密码" prop="password">
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