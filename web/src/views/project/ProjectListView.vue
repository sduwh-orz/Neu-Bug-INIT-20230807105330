<script lang="ts">
import {Delete, Edit, Operation, Search} from '@element-plus/icons-vue';
import BreadCrumbNav from "@/components/BreadCrumbNav.vue";
import { defineComponent, reactive } from "vue";

interface Project {
  id: number
  keyword: string
  name: string
  description: string
  owner: string
  created: string
}
export default defineComponent({
  computed: {
    Operation() {
      return Operation
    },
    Delete() {
      return Delete
    },
    Edit() {
      return Edit
    }
  },
  components: {Delete, Edit, Operation, BreadCrumbNav, Search },
  mounted() {
    let data = this.getData()
    this.nowProjects.length = 0
    this.nowProjects.splice(0, 0, ...data)
  },
  data() {
    return {
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      form: reactive({
        name: ''
      }),
      size: this.$route.query.size ? Number(this.$route.query.size) : 10,
      projects: [
        {
          id: 1,
          keyword: 'blog',
          name: '个人博客系统',
          description: '个人博客系统',
          owner: '李开發',
          created: "2016-07-25"
        },{
          id: 2,
          keyword: "Bug",
          name: "软件缺陷管理系统",
          description: "软件缺陷管理系统",
          owner: "张景丽",
          created: "2016-07-27"
        }, {
          id: 3,
          keyword: "删除项目",
          name: "测试删除项目",
          description: "测试删除项目",
          owner: "管理员",
          created: "2021-05-31"
        }, {
          id: 4,
          keyword: "bbs",
          name: "虚拟社区系统",
          description: "虚拟社区系统",
          owner: "张景丽",
          created: "2016-09-13"
        }, {
          id: 5,
          keyword: "netp",
          name: "网络教学平台",
          description: "网络教学平台课程",
          owner: "张景丽",
          created: "2016-07-19"
        }, {
          id: 6,
          keyword: "CRM",
          name: "客户关系管理系统",
          description: " 客户关系管理系统",
          owner: "张景丽",
          created: "2016-08-09"
        }, {
          id: 7,
          keyword: "CMS",
          name: "网站发布系统",
          description: "网站发布系统",
          owner: "李静莉",
          created: "2016-09-14"
        }, {
          id: 8,
          keyword: "CMS",
          name: "网站发布系统",
          description: "网站发布系统",
          owner: "李静莉",
          created: "2016-09-14"
        }, {
          id: 9,
          keyword: "CMS",
          name: "网站发布系统",
          description: "网站发布系统",
          owner: "李静莉",
          created: "2016-09-14"
        }, {
          id: 10,
          keyword: "CMS",
          name: "网站发布系统",
          description: "网站发布系统",
          owner: "李静莉",
          created: "2016-09-14"
        }, {
          id: 11,
          keyword: "CMS",
          name: "网站发布系统",
          description: "网站发布系统",
          owner: "李静莉",
          created: "2016-09-14"
        }
      ],
      nowProjects: reactive([])
    }
  },
  methods: {
    getData() {
      return this.projects.slice((this.page - 1) * this.size, this.page * this.size);
    },
    handleManage(index: number, row: Project) {
      console.log(index, row)
    },
    handleEdit(index: number, row: Project) {
      console.log(index, row)
    },
    handleDelete(index: number, row: Project) {
      console.log(index, row)
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
    <el-table :data="nowProjects" style="width: 100%">
      <el-table-column prop="id" label="序号" width="80"/>
      <el-table-column prop="keyword" label="项目关键字"/>
      <el-table-column prop="name" label="项目名称"/>
      <el-table-column prop="description" label="项目描述信息"/>
      <el-table-column prop="owner" label="项目负责人"/>
      <el-table-column prop="created" label="创建日期"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
              :icon="Operation"
              size="small"
              @click="handleManage(scope.$index, scope.row)"
              circle
          />
          <el-button
              :icon="Edit"
              size="small"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              circle
          />
          <el-button
              :icon="Delete"
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              circle
          />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      显示第 {{ (page - 1) * size + 1 <= projects.length ? (page - 1) * size + 1 : projects.length }} 到第 {{ page * size <= projects.length ? page * size : projects.length }} 条记录，总共 {{ projects.length }} 条记录
    </template>
  </el-card>
</template>

<style>

</style>
