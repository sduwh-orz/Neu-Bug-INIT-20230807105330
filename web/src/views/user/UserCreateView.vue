<script lang="ts">
import { EditPen } from '@element-plus/icons-vue';
import BreadCrumbNav from "@/components/BreadCrumbNav.vue";
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import user from '@/api/user.ts'
import utils from '@/api/utils.ts'

const moduleName = 'user_manage'
const formData = reactive({
  username: '',
  password: '',
  realName: '',
  role: '',
  email: ''
})
const roles = reactive([])
const formDataRef = ref()

export default {
  components: {EditPen, BreadCrumbNav},
  setup() {
    user.getRoles().then(response => {
      roles.length = 0
      Object.assign(roles, utils.toOptions(response, true))
    })
    return {
      roles,
      formData: formData,
      formDataRef: formDataRef,
      formRules: reactive({
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          { max: 30, message: '用户名长度最多为30位', trigger: 'blur' },
          { min: 6, message: '用户名长度至少为6位', trigger: 'blur' },
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
        realName: [
          {
            required: true,
            message: '请选择真实姓名',
            trigger: 'blur'
          },
          { max: 30, message: '真实姓名长度不能超过30个字', trigger: 'blur' },
        ],
        role: [
          {
            required: true,
            message: '请选择角色',
            trigger: 'blur'
          }
        ],
        email: [
          { max: 50, message: '邮箱长度不能超过50个字符', trigger: 'blur' },
          { pattern: /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/, message: '邮箱格式错误', trigger: 'blur' },
        ]
      })
    }
  },
  mounted() {
    Object.keys(formData).forEach(function(key) {
      formData[key] = ''
    })
  },
  methods: {
    handleSubmit() {
      try {
        formDataRef.value.validate().then(() => {
          user.create(formData).then((response) => {
            if (response.success) {
              ElMessage.success('添加成功')
              formDataRef.value.resetFields()
              this.$router.push('/' + moduleName + '/list')
            } else {
              ElMessage.error(response.message ? response.message : '添加失败')
            }
          })
        })
      } catch (error) {
        ElMessage.error('请检查输入内容')
      }
    },
    handleReturn() {
      this.$router.go(-1)
    }
  }
}
</script>

<template>
  <BreadCrumbNav :page-paths="['用户管理', '用户列表', '用户添加']"></BreadCrumbNav>
  <el-card class="info-card" shadow="never">
    <template #header>
      <div class="card-header">
        <el-icon>
          <EditPen/>
        </el-icon>&nbsp;&nbsp;用户添加
      </div>
    </template>
    <el-form
        ref="formDataRef"
        :model="formData"
        :rules="formRules"
        label-width="30%"
        style="width: 60%"
        @keyup.enter="handleSubmit"
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
