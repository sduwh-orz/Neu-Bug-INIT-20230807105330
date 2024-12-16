<script lang="ts">
import { EditPen } from '@element-plus/icons-vue'
import BreadCrumbNav from "@/components/BreadCrumbNav.vue"
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import bug from '@/api/bug.ts'
import user from '@/api/user.ts'
import utils from "@/api/utils.ts";

const moduleName = 'bug'
const formData = reactive({
  name: '',
  grade: '',
  module: '',
  feature: '',
  description: '',
  comment: ''
})
const formDataRef = ref()

export default {
  components: {EditPen, BreadCrumbNav},
  setup() {
    return {
      formData: formData,
      formDataRef: formDataRef,
      formRules: reactive({
        name: [
          {
            required: true,
            message: '请输入 Bug 标题',
            trigger: 'blur'
          }
        ],
        grade: [
          {
            required: true,
            message: '请选择 Bug 等级',
            trigger: 'blur'
          }
        ],
        module: [
          {
            required: true,
            message: '请选择所属模块',
            trigger: 'blur'
          }
        ],
        feature: [
          {
            required: true,
            message: '请选择所属功能',
            trigger: 'blur'
          }
        ],
      }),
    }
  },
  data() {
    let params = this.$route.query
    return {
      grades: utils.toOptions(bug.grades, true),
      id: ref(params.id ? params.id : ''),
      project: reactive({}),
      module: reactive({}),
      user: reactive(user.getLoggedInUser()),
    }
  },
  mounted() {
    let result = bug.get(this.id)
    let now = result.bug
    this.project = result.project
    this.module = result.module
    this.formData.name = now.name
    this.formData.grade = now.grade
    this.formData.module = result.module.id
    this.formData.feature = result.feature.id
    this.formData.description = result.description
  },
  computed: {
    features() {
      if (this.formData.module != '') {
        return utils.toOptions(this.module.features.map(f => f.name), true)
      }
      return utils.toOptions([], true)
    },
  },
  methods: {
    handleSubmit() {
      try {
        formDataRef.value.validate().then(() => {
          bug.modify(this.id, undefined, undefined, formData.comment, this.user.id, formData)
          ElMessage.success('修改成功')
          formDataRef.value.resetFields()
          this.$router.push('/' + moduleName + '/bugs?id='+this.project.id)
        })
      } catch (error) {
        ElMessage.error('请检查输入内容')
        console.log(error)
      }
    },
    handleReturn() {
      this.$router.go(-1)
    },
    clearFeature() {
      this.formData.feature =''
    },
  }
}
</script>

<template>
  <BreadCrumbNav :page-paths="['Bug 管理', '项目列表', 'Bug 列表', 'Bug 修改']"></BreadCrumbNav>
  <el-card class="info-card" shadow="never">
    <template #header>
      <div class="card-header">
        <el-icon>
          <EditPen/>
        </el-icon>&nbsp;&nbsp;[ {{ project.name }} ] Bug 信息
      </div>
    </template>
    <el-form
        ref="formDataRef"
        :model="formData"
        :rules="formRules"
        label-width="30%"
        style="width: 60%"
    >
      <el-form-item label="Bug 标题" prop="name">
        <el-input v-model="formData.name"/>
      </el-form-item>
      <el-form-item label="Bug 等级" prop="grade">
        <el-select v-model="formData.grade" placeholder="请选择..." no-data-text="暂无等级">
          <el-option
              v-for="m in grades"
              :key="m.value"
              :label="m.name"
              :value="m.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所属模块" prop="module">
        <el-select v-model="formData.module" placeholder="请选择..." no-data-text="暂无模块" @change="clearFeature()">
          <el-option
              v-for="m in project.modules"
              :key="m.id"
              :label="m.name"
              :value="m.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所属功能" prop="feature">
        <el-select v-model="formData.feature" placeholder="请选择..." no-data-text="暂无功能">
          <el-option
              v-for="f in features"
              :key="f.value"
              :label="f.name"
              :value="f.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Bug 详情" prop="description">
        <el-input v-model="formData.description" type="textarea"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-row class="row-bg" justify="end">
        <div class="flex-grow" />
        <el-button type="info" @click="handleReturn" round>返回 Bug 列表</el-button>
        <el-button type="primary" @click="handleSubmit" round>提交</el-button>
      </el-row>
    </template>
  </el-card>
</template>

<style>

</style>
