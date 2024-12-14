<script lang="ts">
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, CirclePlus, FolderOpened, Edit } from '@element-plus/icons-vue'
import BreadCrumbNav from '@/components/BreadCrumbNav.vue'
import project from '@/api/project'
import module from '@/api/module'
import bug from '@/api/bug.ts'

const loading = ref(true)

const id = ref('')
let nowProject = reactive(project.empty)
let stats = reactive({
  grade: [],
  status: [],
  developers: [],
  reporters: []
})

export default {
  computed: {
    Edit() {
      return Edit
    },
  },
  components: {
    BreadCrumbNav, FolderOpened, ArrowLeft, CirclePlus, Edit
  },
  setup() {
    return {
      loading,
      id,
      nowProject,
      stats,
      module,
      treeProps: reactive({
        children: 'features',
        hasChildren: 'hasChildren'
      }),
    }
  },
  async mounted() {
    loading.value = true
    let route = useRoute()
    id.value = route.query.id ? route.query.id.toString() : ''
    let response = await project.get(id.value)
    Object.assign(nowProject, response)
    let nowStats = await bug.stats(id.value)
    Object.assign(stats, nowStats)
    loading.value = false
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
  <el-card class="info-card" shadow="never" v-loading="loading">
    <template #header>
      <div class="module-card-header">
        <div class="module-card-header-left">
          <el-icon><Edit/></el-icon>&nbsp;&nbsp;
          <el-text
              style="font-size: 20px; font-weight: bold;"
          >
            [ {{ nowProject.name }} ] Bug 统计
          </el-text>
        </div>
      </div>
    </template>
    <h1>按功能统计</h1>
    <el-table
        :data="nowProject.modules"
        row-key="id"
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
</style>
