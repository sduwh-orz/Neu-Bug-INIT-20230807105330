<script lang="ts">
import BreadCrumbNav from "@/components/BreadCrumbNav.vue";
import { ArrowLeft, CirclePlus, FolderOpened, Delete, Edit, Plus } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import project from '@/api/project'
import module from '@/api/module'
import { reactive, ref } from "vue";
import type { Module } from "@/types/module";
import { ElMessage, ElMessageBox } from "element-plus";
import feature from "@/api/feature";

const createModuleFormRef = ref();
const modifyModuleFormRef = ref();
const createFeatureFormRef = ref();
const modifyFeatureFormRef = ref();

export default {
  computed: {
    Plus() {
      return Plus;
    },
    Delete() {
      return Delete;
    },
    Edit() {
      return Edit;
    }
  },
  components: {
    BreadCrumbNav, FolderOpened, ArrowLeft, CirclePlus, Plus, Delete, Edit
  },
  setup() {
    const route = useRoute();
    const routeId = Number(route.query.id);
    const currentProject = project.getProject(routeId);

    currentProject?.modules.forEach(module => {
      module.uniqueName = module.name;
      module.features.forEach((feature: { uniqueName: string; name: string; }) => {
        feature.uniqueName = module.name + '/' + feature.name;
      });
    });

    return {
      routeId,
      currentProject,
      module,
      treeProps: reactive({
        children: 'features',
        hasChildren: 'hasChildren'
      }),

      createModuleFormRef: createModuleFormRef,
      modifyModuleFormRef: modifyModuleFormRef,
      createFeatureFormRef: createFeatureFormRef,
      modifyFeatureFormRef: modifyFeatureFormRef,

      createModuleDialogVisible: ref(false),
      modifyModuleDialogVisible: ref(false),
      createFeatureDialogVisible: ref(false),
      modifyFeatureDialogVisible: ref(false),

      moduleForm: reactive({ name: '' }),
      moduleRules: reactive({
        name: [
          { required: true, message: '请输入模块名', trigger: 'blur' }
        ]
      }),

      featureForm: reactive({ name: '', hours: 0 }),
      featureRules: reactive({
        name: [
          { required: true, message: '请输入功能名', trigger: 'blur' }
        ],
        hours: [
          { required: true, message: '请选择该功能的计划耗时', trigger: 'blur'},

        ]
      }),
      selectedItem: undefined,
    }
  },
  methods: {
    goBack() {
      this.$router.push('/project/list');
    },
    ifModuleRow(row: any) {
      return row.features;
    },

    // handle functions
    handleCreateModule(_: number, row: any) {
      this.createModuleDialogVisible = true;
      this.selectedItem = row;
    },
    handleModifyModule(_: number, row: any) {
      this.modifyModuleDialogVisible = true;
      this.selectedItem = row;
    },
    handleDeleteModule(_: number, row: any) {
      this.selectedItem = row;
      ElMessageBox.confirm(
        '确定要删除模块吗？',
        '删除模块',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        module.remove(this.selectedItem.id);
        ElMessage.success('删除成功');
      }).catch(() => {
        ElMessage.info('已取消模块删除');
      });
    },
    handleCreateFeature(_: number, row: any) {
      this.createFeatureDialogVisible = true;
      this.selectedItem = row;
    },
    handleModifyFeature(_: number, row: any) {
      this.modifyFeatureDialogVisible = true;
      this.selectedItem = row;
    },
    handleDeleteFeature(_: number, row: any) {
      this.selectedItem = row;
      ElMessageBox.confirm(
        '确定要删除功能吗？',
        '删除功能',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        feature.remove(this.selectedItem.id);
        ElMessage.success('删除成功');
      }).catch(() => {
        ElMessage.info('已取消功能删除');
      });
    },

    // close the dialogs
    closeCreateModuleDialog() {
      createModuleFormRef.value.resetFields();
      this.createModuleDialogVisible = false;
    },
    closeModifyModuleDialog() {
      modifyModuleFormRef.value.resetFields();
      this.modifyModuleDialogVisible = false;
    },
    closeCreateFeatureDialog() {
      createFeatureFormRef.value.resetFields();
      this.createFeatureDialogVisible = false;
    },
    closeModifyFeatureDialog() {
      modifyFeatureFormRef.value.resetFields();
      this.modifyFeatureDialogVisible = false;
    },

    // submit forms
    submitCreateModuleForm() {
      try {
        createModuleFormRef.value.validate((valid: any) => {
          if(valid) {
            module.create(this.routeId, this.moduleForm);
            ElMessage.success('添加成功');
            this.closeCreateModuleDialog();
          } else {
            ElMessage.warning('请检查表单所填写内容');
            return false;
          }
        });
      } catch(error) {
        ElMessage.error('请检查输入内容');
        console.log(error);
      }
    },
    submitModifyModuleForm() {
      try {
        modifyModuleFormRef.value.validate((valid: any) => {
          if(valid) {
            module.modify(this.selectedItem.id, this.moduleForm);
            ElMessage.success('修改成功');
            this.closeModifyModuleDialog();
          } else {
            ElMessage.warning('请检查表单所填写内容');
            return false;
          }
        });
      } catch(error) {
        ElMessage.error('请检查输入内容');
        console.log(error);
      }
    },
    submitCreateFeatureForm() {
      try {
        createFeatureFormRef.value.validate((valid: any) => {
          if(valid) {
            feature.create(this.selectedItem.id, this.featureForm);
            ElMessage.success('添加成功');
            this.closeCreateFeatureDialog();
          } else {
            ElMessage.warning('请检查表单所填写内容');
            return false;
          }
        });
      } catch(error) {
        ElMessage.error('请检查输入内容');
        console.log(error);
      }
    },
    submitModifyFeatureForm() {
      try {
        modifyFeatureFormRef.value.validate((valid: any) => {
          if(valid) {
            feature.modify(this.selectedItem.id, this.featureForm);
            ElMessage.success('修改成功');
            this.closeModifyFeatureDialog();
          } else {
            ElMessage.warning('请检查表单所填写内容');
            return false;
          }
        });
      } catch(error) {
        ElMessage.error('请检查输入内容');
        console.log(error);
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
            style="font-size: 20px; font-weight: bold;"
          >
            [ {{ currentProject?.name }} ] 模块管理
          </el-text>
          <el-text
            v-else
            style="font-size: 20px; font-weight: bold;"
          >
            该项目不存在
          </el-text>
        </div>
        <div v-if="currentProject">
          <el-button
            type="success"
            @click="handleCreateModule"
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
                @click="handleModifyModule(scope.$index, scope.row)"
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
                @click="handleDeleteModule(scope.$index, scope.row)"
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
                @click="handleCreateFeature(scope.$index, scope.row)"
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
                @click="handleModifyFeature(scope.$index, scope.row)"
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
                @click="handleDeleteFeature(scope.$index, scope.row)"
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
    v-model="createModuleDialogVisible"
    title="添加模块"
    width="500"
    :before-close="closeCreateModuleDialog"
  >
    <div style="margin-top: 10px; padding: 15px;">
      <el-form
        ref="createModuleFormRef"
        :model="moduleForm"
        :rules="moduleRules"
        label-width="100px"
      >
        <el-form-item label="功能名" prop="name">
          <el-input v-model="moduleForm.name" placeholder="请输入模块名" style="width: 300px" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeCreateModuleDialog">关闭</el-button>
        <el-button type="primary" @click="submitCreateModuleForm();">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- modify modules -->
  <el-dialog
    v-model="modifyModuleDialogVisible"
    title="修改模块"
    width="500"
    :before-close="closeModifyModuleDialog"
  >
    <div style="margin-top: 10px; padding: 15px;">
      <el-form
        ref="modifyModuleFormRef"
        :model="moduleForm"
        :rules="moduleRules"
        label-width="100px"
      >
        <el-form-item label="功能名" prop="name">
          <el-input v-model="moduleForm.name" placeholder="请输入模块名" style="width: 300px" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeModifyModuleDialog">关闭</el-button>
        <el-button type="primary" @click="submitModifyModuleForm();">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- add features -->
  <el-dialog
    v-model="createFeatureDialogVisible"
    title="添加功能"
    width="500"
    :before-close="closeCreateFeatureDialog"
  >
    <div style="margin-top: 10px; padding: 15px;">
      <el-form
        ref="createFeatureFormRef"
        :model="featureForm"
        :rules="featureRules"
        label-width="100px"
      >
        <el-form-item label="功能名" prop="name">
          <el-input v-model="featureForm.name" placeholder="请输入功能名" style="width: 300px" />
        </el-form-item>
        <el-form-item label="计划耗时" prop="hours">
          <el-input-number v-model="featureForm.hours" :precision="1" :step="0.1" :min="0" :max="114514" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeCreateFeatureDialog">关闭</el-button>
        <el-button type="primary" @click="submitCreateFeatureForm();">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- modify features -->
  <el-dialog
    v-model="modifyFeatureDialogVisible"
    title="修改功能"
    width="500"
    :before-close="closeModifyFeatureDialog"
  >
    <div style="margin-top: 10px; padding: 15px;">
      <el-form
        ref="modifyFeatureFormRef"
        :model="featureForm"
        :rules="featureRules"
        label-width="100px"
      >
        <el-form-item label="功能名" prop="name">
          <el-input v-model="featureForm.name" placeholder="请输入功能名" style="width: 300px" />
        </el-form-item>
        <el-form-item label="计划耗时" prop="hours">
          <el-input-number v-model="featureForm.hours" :precision="1" :step="0.1" :min="0" :max="114514" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeModifyFeatureDialog">关闭</el-button>
        <el-button type="primary" @click="submitModifyFeatureForm();">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style>
.module-row {
  font-weight: bold;
}
</style>
