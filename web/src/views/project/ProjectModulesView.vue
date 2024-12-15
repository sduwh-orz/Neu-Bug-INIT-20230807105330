<script lang="ts">
import BreadCrumbNav from "@/components/BreadCrumbNav.vue";
import { ArrowLeft, CirclePlus, FolderOpened } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import fakeData from "@/api/fakeData";
import { ref } from "vue";

export default {
  components: {
    BreadCrumbNav, FolderOpened, ArrowLeft, CirclePlus
  },
  setup() {
    const route = useRoute();
    const routeId = Number(route.query.id);
    const currentProject = fakeData.projects.find(project => project.id === routeId);

    const tableData = undefined

    return {
      routeId,
      currentProject,
      tableData
    }
  },
  methods: {
    goBack() {
      this.$router.push('/project/list');
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
      :data="tableData"
      row-key="id"
      border
      default-expand-all
      tree-props="{ children: 'modules', hasChildren: 'hasChildren' }"
    >
      <el-table-column align="center" prop="name" label="模块名 / 功能名" />
      <el-table-column align="center" prop="modules.features.hours" label="计划耗时"/>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button size="small">
          Edit
        </el-button>
        <el-button
          size="small"
          type="danger"
        >
          Delete
        </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

</template>

<style>

</style>
