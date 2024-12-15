<script lang="ts">
import BreadCrumbNav from "@/components/BreadCrumbNav.vue";
import { ArrowLeft, CirclePlus, FolderOpened, Delete, Edit, Plus } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import project from '@/api/project'
import module from '@/api/module'
import { reactive, ref } from "vue";
import type { Project } from "@/types/project";
import type { Module } from "@/types/module";

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

    if (currentProject) {
      console.log(currentProject.modules)
    };

    return {
      routeId,
      currentProject,
      module,
      treeProps: reactive({
        children: 'features',
        hasChildren: 'hasChildren'
      }),
      createFeatureDialogVisible: ref(false)
    }
  },
  methods: {
    goBack() {
      this.$router.push('/project/list');
    },
    ifModuleRow(row: any) {
      return row.features;
    },
    handleEdit(_: number, row: any) {
      
    },
    handleDelete(_: number, row: any) {
      
    },
    handleCreateFeature(_: number, row: Module) {
      this.createFeatureDialogVisible = true;
    },
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
            该模块不存在
          </el-text>
        </div>
        <div>
          <el-button
            type="success"
            @click="goBack"
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
          >
            <el-button
                :icon="Edit"
                size="small"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
                circle
            />
          </el-tooltip>
          <el-tooltip
              class="box-item"
              content="删除模块"
              placement="top"
          >
            <el-button
                :icon="Delete"
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
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
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog
    v-model="createFeatureDialogVisible"
    title="添加功能"
    width="500"
  >

  </el-dialog>
</template>

<style>
.module-row {
  font-weight: bold;
}
</style>
