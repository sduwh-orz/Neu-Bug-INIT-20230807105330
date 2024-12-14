<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import {TrendCharts, Operation, Search, List} from '@element-plus/icons-vue'
import BreadCrumbNav from '@/components/BreadCrumbNav.vue'
import Pagination from '@/components/Pagination.vue'
import bug from '@/api/bug.ts'

const loading = ref(true)

export default defineComponent({
  computed: {
    Operation() {
      return Operation
    },
    TrendCharts() {
      return TrendCharts
    }
  },
  components: {Pagination, List, TrendCharts, Operation, BreadCrumbNav, Search },
  mounted() {
    this.page.update()
  },
  setup() {
    return {
      loading,
      page: ref()
    }
  },
  data() {
    return {
      dialogToggle: ref(false),
      data: reactive([]),
      query: reactive({
        keyword: ''
      }),
      selectedItem: undefined,
    }
  },
  methods: {
    async updateData() {
      loading.value = true
      let result = await bug.projectSearch(this.query.keyword, this.page.page, this.page.size)
      this.data.length = 0
      Object.assign(this.data, result.data)
      loading.value = false
      return result
    },
    handleSearch() {
      this.page.update()
    },
    handleManage(_: number, row: any) {
      this.page.jump('/bugs?id=' +  row.id)
    },
    handleStats(_: number, row: any) {
      this.page.jump('/stats?id=' +  row.id)
    },
  }
})

</script>

<template>
  <BreadCrumbNav :page-paths="['Bug 管理', '项目列表']"></BreadCrumbNav>
  <el-card class="info-card" shadow="never">
    <template #header>
      <div class="card-header">
        <el-icon><Search /></el-icon>&nbsp;&nbsp;
        <span>查询信息</span>
      </div>
    </template>
    <el-form label-width="auto" @submit.native.prevent @keyup.enter="handleSearch">
      <el-form-item label="项目名称" style="max-width: 60%" label-width="100">
        <el-input v-model="query.keyword"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-row class="row-bg" justify="end">
        <div class="flex-grow" />
        <el-button type="primary" @click="handleSearch" round>查询</el-button>
      </el-row>
    </template>
  </el-card>
  <el-card class="info-card" shadow="never">
    <template #header>
      <div class="card-header">
        <el-icon><List /></el-icon>&nbsp;&nbsp;
        <span>列表信息</span>
      </div>
    </template>
    <el-table :data="data" style="width: 100%" empty-text="没有找到匹配的记录" v-loading="loading">
      <el-table-column align="center" type="index" label="序号" width="80"/>
      <el-table-column align="center" prop="name" label="项目名称"/>
      <el-table-column align="center" prop="owner" label="项目负责人"/>
      <el-table-column align="center" prop="bugs" label="Bug 总数"/>
      <el-table-column align="center" label="操作" width="100">
        <template #default="scope">
          <el-tooltip
              class="box-item"
              content="Bug 管理"
              placement="top"
          >
            <el-button
                :icon="Operation"
                size="small"
                type="primary"
                @click="handleManage(scope.$index, scope.row)"
                circle
            />
          </el-tooltip>
          <el-tooltip
              class="box-item"
              content="Bug 统计"
              placement="top"
          >
            <el-button
                :icon="TrendCharts"
                size="small"
                type="warning"
                @click="handleStats(scope.$index, scope.row)"
                circle
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <Pagination ref="page" :update-data="updateData" :query="query" module="bug" path="list" />
    </template>
  </el-card>
</template>

<style scoped>
</style>
