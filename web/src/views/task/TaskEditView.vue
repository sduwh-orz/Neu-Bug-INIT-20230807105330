<script lang="ts">
import module from "@/api/module";
import project from "@/api/project";
import task from "@/api/task";
import user from "@/api/user";
import BreadCrumbNav from "@/components/BreadCrumbNav.vue";
import { ArrowLeft, CircleCheck, FolderOpened } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {
    BreadCrumbNav, FolderOpened, CircleCheck, ArrowLeft
  },
  setup() {
    const route = useRoute();
    const routeId = Number(route.query.id);
    const currentProject = project.get(routeId);

    currentProject?.modules.forEach(module => {
      module.uniqueName = module.name;
      module.features.forEach((feature: any) => {
        feature.uniqueName = module.name + '/' + feature.name
        feature.module = module.id
      });
    });

    const form = {}
    currentProject?.modules.forEach(module => {
      form[module.id] = {
        id: module.id,
        features: []
      }
      module.features.forEach(feature =>{
        form[module.id].features[feature.id] = {
          id: feature.id,
          owner: feature.owner
        }
      })
    })

    return {
      routeId,
      currentProject,
      module,
      treeProps: reactive({
        children: 'features',
        hasChildren: 'hasChildren'
      }),
      realNames: user.getAllRealNames(),
      form: reactive(form)
    }
  },
  methods: {
    goBack() {
      this.$router.push('/task/list');
    },
    handleSubmit() {
      let emptyOwner = false
      Object.keys(this.form).forEach(module => {
        const features = this.form[module].features
        Object.keys(features).forEach(feature => {
          if (features[feature].owner === '') {
            emptyOwner = true
          }
        })
      })
      if (emptyOwner) {
        ElMessage.warning(`请为所有功能指定开发者`)
      } else {
        ElMessageBox.confirm(
          '确定要保存有关开发者的修改吗？',
          '保存修改',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
        ).then(() => {
          task.modify(this.routeId, this.form)
          this.$router.go(0)
          ElMessage.success('保存成功')
        })
      }
    },
    ifModuleRow(row: any) {
      return row.features;
    }
  }
}
</script>

<template>
  <BreadCrumbNav :page-paths="['任务分配', '项目列表', '任务分配']"></BreadCrumbNav>
  <el-card class="info-card" shadow="never">
    <template #header>
      <div class="module-card-header">
        <div class="module-card-header-left">
          <el-icon><FolderOpened/></el-icon>&nbsp;&nbsp;
          <el-text
            v-if="currentProject"
            style="font-size: 20px; font-weight: bold;"
          >
            [ {{ currentProject?.name }} ] 任务分配
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
            @click="handleSubmit"
          >
            <el-icon><CircleCheck /></el-icon>&nbsp;&nbsp;保存
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
      <el-table-column label="开发者">
        <template #default="scope">
          <el-select
            v-model="form[scope.row.module].features[scope.row.id].owner"
            v-if="!ifModuleRow(scope.row)"
          >
          <el-option
            v-for="item in realNames"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          ></el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style>

</style>
