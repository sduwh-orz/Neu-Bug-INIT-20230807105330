<script lang="ts">
import { Search } from '@element-plus/icons-vue';
import BreadCrumbNav from "@/components/BreadCrumbNav.vue";
import { defineComponent, reactive } from "vue";

export default defineComponent({
  components: { BreadCrumbNav, Search },
  data() {
    return {
      form: reactive({
        name: ''
      }),
      projects: [
        {
          id: 1,
          keyword: 'blog',
          name: '个人博客系统',
          description: '个人博客系统',
          owner: '李开發',
          created: "2016-07-25"
        }
      ],
    }
  }
})

</script>

<template>
  <BreadCrumbNav :page-paths="['项目管理', '项目列表']"></BreadCrumbNav>
  <el-card class="info-card" shadow="never">
    <template #header>
      <div class="card-header">
        <el-icon><Search /></el-icon>&nbsp;&nbsp;
        <span>查询信息</span>
      </div>
    </template>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="项目名称">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-row class="row-bg" justify="end">
        <div class="flex-grow" />
        <el-button type="primary" round>查询</el-button>
        <el-button type="primary" round>添加</el-button>
      </el-row>
    </template>
  </el-card>
  <el-card class="info-card" shadow="never">
    <template #header>
      <div class="card-header">
        <el-icon><Search /></el-icon>&nbsp;&nbsp;
        <span>列表信息</span>
      </div>
    </template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="80"/>
      <el-table-column keyword="keyword" label="项目关键字" width="130"/>
      <el-table-column keyword="name" label="项目名称" width="130"/>
      <el-table-column keyword="description" label="项目描述信息" width="180"/>
      <el-table-column keyword="owner" label="项目负责人" width="130"/>
      <el-table-column keyword="created" label="创建日期" width="150"/>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            Edit
          </el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      显示第 1 到第 7 条记录，总共 7 条记录
    </template>
  </el-card>
</template>

<style>

</style>
