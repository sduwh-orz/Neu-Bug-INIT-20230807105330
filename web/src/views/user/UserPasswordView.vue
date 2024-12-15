<script lang="ts">
import { EditPen } from '@element-plus/icons-vue';
import BreadCrumbNav from "@/components/BreadCrumbNav.vue";
import { reactive, ref } from 'vue';
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus';
const formData = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const formDataRef = ref<FormInstance>();
export default {
  components: {EditPen, BreadCrumbNav},
  setup() {
    return {
      formData: formData,
      formDataRef: formDataRef,
      formRules: reactive<FormRules<RuleForm>>({
        oldPassword: [
          {
            required: true,
            message: '请输入原密码',
            trigger: 'blur'
          }
        ],
        newPassword: [
          {
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
          {
            min: 6,
            message: '密码长度至少为6位',
            trigger: 'blur'
          },
        ],
        confirmPassword: [
          {
            required: true,
            message: '请确认新密码',
            trigger: 'blur'
          },
          {
            validator: (_rule, value, callback) => {
              if (value !== formData.newPassword) {
                callback(new Error('两次输入的密码不一致'))
              } else {
                callback();
              }
            },
            trigger: 'blur',
          },
        ],
      })
    }
  },
  methods: {
    submitForm() {
      try {
        formDataRef.value.validate();
        ElMessageBox.confirm(
            '确定要修改密码吗？提交后需要重新登录。',
            '修改确认',
            {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning',
            }
        ).then(() => {
          ElMessage.success('密码修改成功')
          localStorage.clear();
          this.$router.push('/login');
        }).catch(() => {
          ElMessage.info('已取消密码修改')
        });
      } catch (error) {
        ElMessage.error('请检查输入内容')
        console.log(error)
      }
    },
    resetForm() {
      formDataRef.value.resetFields()
    }
  }
}
</script>

<template>
  <BreadCrumbNav :page-paths="['我的面板', '修改密码']"></BreadCrumbNav>
  <el-card class="info-card" shadow="never">
    <template #header>
      <div class="card-header">
        <el-icon>
          <EditPen/>
        </el-icon>&nbsp;&nbsp;修改密码
      </div>
    </template>
    <el-form
        ref="formDataRef"
        :model="formData"
        :rules="formRules"
        label-width="100px"
        class="password-form"
    >
      <el-form-item label="原密码" prop="oldPassword">
        <el-input
            v-model="formData.oldPassword"
            type="password"
            autocomplete="off"
            placeholder="请输入原密码"
            show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
            v-model="formData.newPassword"
            type="password"
            autocomplete="off"
            placeholder="请输入新密码"
            show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
            v-model="formData.confirmPassword"
            type="password"
            autocomplete="off"
            placeholder="请再次输入新密码"
            show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template> 

<style>

</style>
