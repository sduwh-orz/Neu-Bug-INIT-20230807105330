<script lang='ts'>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowLeft, CirclePlus, FolderOpened, Delete, Edit, Plus } from '@element-plus/icons-vue'
import BreadCrumbNav from '@/components/BreadCrumbNav.vue'
import module from '@/api/module'
import project from '@/api/project'
import feature from '@/api/feature'

const refModuleCreate = ref()
const refModifyModule = ref()
const refFeatureCreate = ref()
const refFeatureModify = ref()

export default {
  computed: {
    Plus() {
      return Plus
    },
    Delete() {
      return Delete
    },
    Edit() {
      return Edit
    }
  },
  components: {
    BreadCrumbNav, FolderOpened, ArrowLeft, CirclePlus, Plus, Delete, Edit
  },
  setup() {
    return {
      refModuleCreate: refModuleCreate,
      refModifyModule: refModifyModule,
      refFeatureCreate: refFeatureCreate,
      refFeatureModify: refFeatureModify,
    }
  },
  data() {
    return {
      id: undefined,
      module,
      currentProject: reactive({}),
      treeProps: reactive({
        children: 'features',
        hasChildren: 'hasChildren'
      }),
      dialogs: reactive({
        moduleCreate: {
          name: '',
          toggle: false,
          rules: {
            name: [
              { required: true, message: '请输入模块名', trigger: 'blur' }
            ]
          }
        },
        moduleModify: {
          name: '',
          toggle: false,
          rules: {
            name: [
              { required: true, message: '请输入模块名', trigger: 'blur' }
            ]
          }
        },
        featureCreate: {
          name: '',
          hours: 0,
          toggle: false,
          rules: {
            name: [
              { required: true, message: '请输入功能名', trigger: 'blur' }
            ],
            hours: [
              { required: true, message: '请选择该功能的计划耗时', trigger: 'blur'},
            ]
          }
        },
        featureModify: {
          name: '',
          hours: 0,
          toggle: false,
          rules: {
            name: [
              { required: true, message: '请输入功能名', trigger: 'blur' }
            ],
            hours: [
              { required: true, message: '请选择该功能的计划耗时', trigger: 'blur'},
            ]
          }
        },
      }),
      selectedItem: undefined,
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.currentProject = project.getProject(this.id)
    this.currentProject?.modules.forEach(module => {
      module.uniqueName = module.name
      module.features.forEach((feature) => {
        feature.uniqueName = module.name + '/' + feature.name
      })
    })
  },
  methods: {
    goBack() {
      this.$router.push('/project/list')
    },
    ifModuleRow(row: any) {
      return row.features
    },

    // handle functions
    handleModuleCreate(_: number, row: any) {
      this.selectedItem = row
      this.dialogs.moduleCreate.toggle = true
    },
    handleModuleModify(_: number, row: any) {
      this.selectedItem = row
      this.dialogs.moduleModify.name = row.name
      this.dialogs.moduleModify.toggle = true
    },
    handleModuleDelete(_: number, row: any) {
      this.selectedItem = row
      ElMessageBox.confirm(
          '确定要删除模块吗？',
          '删除模块',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        module.remove(this.selectedItem.id)
        ElMessage.success('删除成功')
        this.$router.go(0)
      }).catch(() => {
        ElMessage.info('已取消模块删除')
      })
    },
    handleFeatureCreate(_: number, row: any) {
      this.selectedItem = row
      this.dialogs.featureCreate.toggle = true
    },
    handleFeatureModify(_: number, row: any) {
      this.selectedItem = row
      this.dialogs.featureModify.name = row.name
      this.dialogs.featureModify.hours = row.hours
      this.dialogs.featureModify.toggle = true
    },
    handleFeatureDelete(_: number, row: any) {
      this.selectedItem = row
      ElMessageBox.confirm(
          '确定要删除功能吗？',
          '删除功能',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        feature.remove(this.selectedItem.id)
        ElMessage.success('删除成功')
        this.$router.go(0)
      }).catch(() => {
        ElMessage.info('已取消功能删除')
      })
    },

    // close the dialogs
    closeDialogModuleCreate() {
      refModuleCreate.value.resetFields()
      this.dialogs.moduleCreate.toggle = false
    },
    closeDialogModuleModify() {
      this.dialogs.moduleModify.toggle = false
    },
    closeDialogFeatureCreate() {
      refFeatureCreate.value.resetFields()
      this.dialogs.featureCreate.toggle = false
    },
    closeDialogFeatureModify() {
      this.dialogs.featureModify.toggle = false
    },

    // submit forms
    submitCreateModuleForm() {
      try {
        refModuleCreate.value.validate((valid: any) => {
          if(valid) {
            module.create(this.id, this.dialogs.moduleCreate)
            ElMessage.success('添加成功')
            this.closeDialogModuleCreate()
            this.$router.go(0)
          } else {
            ElMessage.warning('请检查表单所填写内容')
            return false
          }
        })
      } catch(error) {
        ElMessage.error('请检查输入内容')
        console.log(error)
      }
    },
    submitModifyModuleForm() {
      try {
        refModifyModule.value.validate((valid: any) => {
          if (valid) {
            module.modify(this.selectedItem.id, this.dialogs.moduleModify)
            ElMessage.success('修改成功')
            this.closeDialogModuleModify()
            this.$router.go(0)
          } else {
            ElMessage.warning('请检查表单所填写内容')
            return false
          }
        })
      } catch(error) {
        ElMessage.error('请检查输入内容')
        console.log(error)
      }
    },
    submitCreateFeatureForm() {
      try {
        refFeatureCreate.value.validate((valid: any) => {
          if(valid) {
            feature.create(this.selectedItem.id, this.dialogs.featureCreate)
            ElMessage.success('添加成功')
            this.closeDialogFeatureCreate()
            this.$router.go(0)
          } else {
            ElMessage.warning('请检查表单所填写内容')
            return false
          }
        })
      } catch(error) {
        ElMessage.error('请检查输入内容')
        console.log(error)
      }
    },
    submitModifyFeatureForm() {
      try {
        refFeatureModify.value.validate((valid: any) => {
          if(valid) {
            feature.modify(this.selectedItem.id, this.dialogs.featureModify)
            ElMessage.success('修改成功')
            this.closeDialogFeatureModify()
            this.$router.go(0)
          } else {
            ElMessage.warning('请检查表单所填写内容')
            return false
          }
        })
      } catch(error) {
        ElMessage.error('请检查输入内容')
        console.log(error)
      }
    }
  }
}
</script>

<template>
  <BreadCrumbNav :page-paths="['项目管理', '项目列表', '模块管理']"></BreadCrumbNav>
  <el-card class="info-card" shadow="never">
    <template #header>
      <div class="module-card-header">
        <div class="module-card-header-left">
          <el-icon><FolderOpened/></el-icon>&nbsp;&nbsp;
          <el-text
              v-if="currentProject"
              style="font-size: 20px; font-weight: bold"
          >
            [ {{ currentProject?.name }} ] 模块管理
          </el-text>
          <el-text
              v-else
              style="font-size: 20px; font-weight: bold"
          >
            该项目不存在
          </el-text>
        </div>
        <div v-if="currentProject">
          <el-button
              type="success"
              @click="handleModuleCreate"
          >
            <el-icon><CirclePlus /></el-icon>&nbsp;&nbsp;添加模块
          </el-button>
          <el-button
              type="primary"
              @click="goBack"
          >
            <el-icon><ArrowLeft /></el-icon>&nbsp;&nbsp;返回项目列表
          </el-button>
        </div>
      </div>
    </template>

    <el-table
        v-if="currentProject"
        :data="currentProject.modules"
        row-key="uniqueName"
        border
        default-expand-all
        :tree-props="treeProps"
        :row-class-name="module.getRowClassName"
    >
      <el-table-column prop="name" label="模块名 / 功能名" />
      <el-table-column prop="hours" label="计划耗时" :formatter="module.hoursFormatter"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-tooltip
              class="box-item"
              content="修改模块"
              placement="top"
              v-if="ifModuleRow(scope.row)"
          >
            <el-button
                :icon="Edit"
                size="small"
                type="primary"
                @click="handleModuleModify(scope.$index, scope.row)"
                circle
            />
          </el-tooltip>
          <el-tooltip
              class="box-item"
              content="删除模块"
              placement="top"
              v-if="ifModuleRow(scope.row)"
          >
            <el-button
                :icon="Delete"
                size="small"
                type="danger"
                @click="handleModuleDelete(scope.$index, scope.row)"
                circle
            />
          </el-tooltip>
          <el-tooltip
              class="box-item"
              content="添加功能"
              placement="top"
              v-if="ifModuleRow(scope.row)"
          >
            <el-button
                :icon="Plus"
                size="small"
                type="success"
                @click="handleFeatureCreate(scope.$index, scope.row)"
                circle
            />
          </el-tooltip>
          <el-tooltip
              class="box-item"
              content="修改功能"
              placement="top"
              v-if="!ifModuleRow(scope.row)"
          >
            <el-button
                :icon="Edit"
                size="small"
                type="primary"
                @click="handleFeatureModify(scope.$index, scope.row)"
                circle
            />
          </el-tooltip>
          <el-tooltip
              class="box-item"
              content="删除功能"
              placement="top"
              v-if="!ifModuleRow(scope.row)"
          >
            <el-button
                :icon="Delete"
                size="small"
                type="danger"
                @click="handleFeatureDelete(scope.$index, scope.row)"
                circle
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!-- modules and features' functions -->
  <!-- add modules -->
  <el-dialog
      v-model="dialogs.moduleCreate.toggle"
      title="添加模块"
      width="500"
      :before-close="closeDialogModuleCreate"
  >
    <div style="margin-top: 10px; padding: 15px">
      <el-form
          ref="refModuleCreate"
          :model="dialogs.moduleCreate"
          :rules="dialogs.moduleCreate.rules"
          label-width="100px"
      >
        <el-form-item label="功能名" prop="name">
          <el-input v-model="dialogs.moduleCreate.name" placeholder="请输入模块名" style="width: 300px" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialogModuleCreate">关闭</el-button>
        <el-button type="primary" @click="submitCreateModuleForm()">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- modify modules -->
  <el-dialog
      v-model="dialogs.moduleModify.toggle"
      title="修改模块"
      width="500"
      :before-close="closeDialogModuleModify"
  >
    <div style="margin-top: 10px; padding: 15px">
      <el-form
          ref="refModifyModule"
          :model="dialogs.moduleModify"
          :rules="dialogs.moduleModify.rules"
          label-width="100px"
      >
        <el-form-item label="功能名" prop="name">
          <el-input v-model="dialogs.moduleModify.name" placeholder="请输入模块名" style="width: 300px" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialogModuleModify">关闭</el-button>
        <el-button type="primary" @click="submitModifyModuleForm()">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- add features -->
  <el-dialog
      v-model="dialogs.featureCreate.toggle"
      title="添加功能"
      width="500"
      :before-close="closeDialogFeatureCreate"
  >
    <div style="margin-top: 10px; padding: 15px">
      <el-form
          ref="refFeatureCreate"
          :model="dialogs.featureCreate"
          :rules="dialogs.featureCreate.rules"
          label-width="100px"
      >
        <el-form-item label="功能名" prop="name">
          <el-input v-model="dialogs.featureCreate.name" placeholder="请输入功能名" style="width: 300px" />
        </el-form-item>
        <el-form-item label="计划耗时" prop="hours">
          <el-input-number v-model="dialogs.featureCreate.hours" :precision="1" :step="0.1" :min="0" :max="114514" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialogFeatureCreate">关闭</el-button>
        <el-button type="primary" @click="submitCreateFeatureForm()">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- modify features -->
  <el-dialog
      v-model="dialogs.featureModify.toggle"
      title="修改功能"
      width="500"
      :before-close="closeDialogFeatureModify"
  >
    <div style="margin-top: 10px; padding: 15px">
      <el-form
          ref="refFeatureModify"
          :model="dialogs.featureModify"
          :rules="dialogs.featureModify.rules"
          label-width="100px"
      >
        <el-form-item label="功能名" prop="name">
          <el-input v-model="dialogs.featureModify.name" placeholder="请输入功能名" style="width: 300px" />
        </el-form-item>
        <el-form-item label="计划耗时" prop="hours">
          <el-input-number v-model="dialogs.featureModify.hours" :precision="1" :step="0.1" :min="0" :max="114514" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialogFeatureModify">关闭</el-button>
        <el-button type="primary" @click="submitModifyFeatureForm()">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>
