<script lang="ts">
import { EditPen } from '@element-plus/icons-vue';
import BreadCrumbNav from "@/components/BreadCrumbNav.vue";
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import user from '@/api/user.ts'
import utils from '@/api/utils.ts'

const moduleName = 'user'
const formData = reactive({
  username: '',
  password: '',
  realName: '',
  role: '',
  email: ''
})
const formDataRef = ref()

export default {
  components: {EditPen, BreadCrumbNav},
  mounted() {
    this.id = this.$route.query.id ? Number(this.$route.query.id): 1
    let userInfo = user.get(this.id)
    formData.username = userInfo?.username
    formData.realName = userInfo?.realName
    formData.role = userInfo?.role
    formData.email = userInfo?.email
  },
  setup() {
    return {
      id: ref(1),
      roles: utils.toOptions(user.roles, true),
      formData: formData,
      formDataRef: formDataRef,
      formRules: reactive({
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        realName: [
          {
            required: true,
            message: '请选择真实姓名',
            trigger: 'blur'
          }
        ],
        role: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'blur'
          }
        ],
      })
    }
  },
  methods: {
    handleSubmit() {
      try {
        formDataRef.value.validate().then(() => {
          user.modify(formData)
          ElMessage.success('修改成功')
          formDataRef.value.resetFields()
          localStorage.clear()
          this.$router.push('/' + moduleName + '/list')
        })
      } catch (error) {
        ElMessage.error('请检查输入内容')
        console.log(error)
      }
    },
    handleReturn() {
      this.$router.go(-1)
    }
  }
}
</script>

<template>
  <BreadCrumbNav :page-paths="['用户管理', '用户列表', '用户修改']"></BreadCrumbNav>
  <el-card class="info-card" shadow="never">
    <template #header>
      <div class="card-header">
        <el-icon>
          <EditPen/>
        </el-icon>&nbsp;&nbsp;用户修改
      </div>
    </template>
    <el-form
        ref="formDataRef"
        :model="formData"
        :rules="formRules"
        label-width="30%"
        style="width: 60%"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" type="password" show-password/>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="formData.realName"/>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="formData.role" placeholder="请选择..." no-data-text="暂无角色">
          <el-option
              v-for="role in roles"
              :key="role.value"
              :label="role.name"
              :value="role.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-row class="row-bg" justify="end">
        <div class="flex-grow" />
        <el-button type="info" @click="handleReturn" round>返回用户列表</el-button>
        <el-button type="primary" @click="handleSubmit" round>提交</el-button>
      </el-row>
    </template>
  </el-card>
</template>

<style>

</style>
