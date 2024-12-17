<script lang="ts">
import { reactive, ref } from 'vue'
import { ArrowLeft, CirclePlus, FolderOpened, Edit } from '@element-plus/icons-vue'
import type { Module } from '@/types/module'
import BreadCrumbNav from '@/components/BreadCrumbNav.vue'
import project from '@/api/project'
import module from '@/api/module'
import bug from '@/api/bug.ts'

export default {
  computed: {
    Edit() {
      return Edit;
    }
  },
  components: {
    BreadCrumbNav, FolderOpened, ArrowLeft, CirclePlus, Edit
  },
  data() {
    return {
      module,
      id: ref(1),
      project: reactive({
        name: '',
        modules: [] as Module[]
      }),
      stats: reactive({
        grade: [],
        status: [],
        developers: [],
        reporters: []
      }),
      treeProps: reactive({
        children: 'features',
        hasChildren: 'hasChildren'
      }),
    }
  },
  mounted() {
    this.id = this.$route.query.id ? Number(this.$route.query.id): 1
    this.project = project.get(this.id)
    this.project?.modules.forEach((module: any) => {
      module.uniqueName = module.name;
      module.features.forEach((feature: { uniqueName: string; name: string; }) => {
        feature.uniqueName = module.name + '/' + feature.name;
      })
    })
    this.stats = bug.stats(this.id)
  },
  methods: {
    bugFormatter: function(row: any) {
      if (row.features) {
        return ''
      }
      if (row.bugs)
        return row.bugs.length
      return 0
    },
    handleBack: function() {
      this.$router.go(-1)
    }
  }
}
</script>

<template>
  <BreadCrumbNav :page-paths="['Bug 管理', '项目列表', 'Bug 统计']"></BreadCrumbNav>
  <el-card class="info-card" shadow="never">
    <template #header>
      <div class="module-card-header">
        <div class="module-card-header-left">
          <el-icon><Edit/></el-icon>&nbsp;&nbsp;
          <el-text
              style="font-size: 20px; font-weight: bold;"
          >
            [ {{ project.name }} ] Bug 统计
          </el-text>
        </div>
      </div>
    </template>
    <h1>按功能统计</h1>
    <el-table
        :data="project.modules"
        row-key="uniqueName"
        empty-text="暂无数据"
        border
        default-expand-all
        :tree-props="treeProps"
        :row-class-name="module.getRowClassName"
    >
      <el-table-column prop="name" label="模块名 / 功能名" />
      <el-table-column prop="hours" label="Bug 数量" :formatter="bugFormatter"/>
    </el-table>
    <h1>按 Bug 等级统计</h1>
    <el-table
        :data="stats.grade"
        empty-text="暂无数据"
        border
        default-expand-all
    >
      <el-table-column prop="name" label="Bug 等级" />
      <el-table-column prop="count" label="Bug 数量"/>
    </el-table>
    <h1>按 Bug 状态统计</h1>
    <el-table
        :data="stats.status"
        empty-text="暂无数据"
        border
        default-expand-all
    >
      <el-table-column prop="name" label="Bug 状态" />
      <el-table-column prop="count" label="Bug 数量"/>
    </el-table>
    <h1>按开发人统计</h1>
    <el-table
        :data="stats.developers"
        empty-text="暂无数据"
        border
        default-expand-all
    >
      <el-table-column prop="name" label="开发人" />
      <el-table-column prop="count" label="Bug 数量"/>
    </el-table>
    <h1>按报告人统计</h1>
    <el-table
        :data="stats.reporters"
        empty-text="暂无数据"
        border
        default-expand-all
    >
      <el-table-column prop="name" label="报告人" />
      <el-table-column prop="count" label="Bug 数量"/>
    </el-table>
    <h1>
      <el-row class="row-bg" justify="end">
        <div class="flex-grow" />
        <el-button
            type="info"
            @click="handleBack"
        >
          <el-icon><ArrowLeft /></el-icon>&nbsp;&nbsp;返回项目列表
        </el-button>
      </el-row>
    </h1>
  </el-card>
</template>

<style>
.module-row {
  font-weight: bold;
}
</style>
