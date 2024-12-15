<script lang="ts">
import { TrendCharts, Operation, Search } from '@element-plus/icons-vue'
import BreadCrumbNav from '@/components/BreadCrumbNav.vue'
import { defineComponent, reactive, ref } from 'vue'
import bug from '@/api/bug.ts'
import type { Project } from '@/types/project'

const moduleName = 'bug'
const defaultPageSize = 10
const pageSizes = [10, 25]

export default defineComponent({
  computed: {
    Operation() {
      return Operation
    },
    TrendCharts() {
      return TrendCharts
    }
  },
  components: { TrendCharts, Operation, BreadCrumbNav, Search },
  mounted() {
    this.updateData()
  },
  data() {
    return {
      keyword: ref(this.$route.query.keyword ? this.$route.query.keyword.toString(): ''),
      page: ref(this.$route.query.page ? Number(this.$route.query.page) : 1),
      size: ref(this.$route.query.size ? Number(this.$route.query.size) : defaultPageSize),
      total: ref(0),
      start: ref(0),
      end: ref(0),
      deleteDialogVisible: ref(false),
      itemToDelete: undefined,
      data: reactive([]),
      defaultPageSize: defaultPageSize,
      pageSizes: pageSizes,
    }
  },
  methods: {
    updateData() {
      let result = bug.getData(this.keyword, this.page, this.size)
      this.total = result.total
      this.start = result.start
      this.end = result.end
      this.data.length = 0
      Object.assign(this.data, result.data)
    },
    updateUrl() {
      let url = '/' + moduleName + '/list?page=' + this.page
      if (this.size != defaultPageSize)
        url += '&size=' + this.size;
      if (this.keyword.length != 0)
        url += '&keyword=' + this.keyword
      this.$router.push(url)
    },
    handleSearch() {
      this.updateUrl()
      this.updateData()
    },
    handleManage(_: number, row: Project) {
      let url = '/' + moduleName + '/bugs?id=' + row.id
      this.$router.push(url)
    },
    handleStats(_: number, row: Project) {
      let url = '/' + moduleName + '/stats?id=' + row.id
      this.$router.push(url)
    },
    handlePageChange(page: number) {
      this.page = page
      this.updateUrl()
      this.updateData()
    },
    handleSizeChange(_: any) {
      this.updateUrl()
      this.updateData()
    },
  }
})

</script>

<template>
  <BreadCrumbNav :page-paths="['bug管理', '项目列表']"></BreadCrumbNav>
  <el-card class="info-card" shadow="never">
    <template #header>
      <div class="card-header">
        <el-icon><Search /></el-icon>&nbsp;&nbsp;
        <span>查询信息</span>
      </div>
    </template>
    <el-form label-width="auto" style="max-width: 600px">
      <el-form-item label="项目名称">
        <el-input v-model="keyword" />
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
        <el-icon><Search /></el-icon>&nbsp;&nbsp;
        <span>列表信息</span>
      </div>
    </template>
    <el-table :data="data" style="width: 100%" empty-text="没有找到匹配的记录">
      <el-table-column align="center" prop="id" label="序号" width="80"/>
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
      <el-row class="row-bg" justify="space-between">
        <el-col>
          <el-text size="small">显示第 {{ start }} 到第 {{ end }} 条记录，总共 {{ total }} 条记录，每页显示 </el-text>
          <el-select
              v-model="size"
              size="small"
              style="width: 60px"
              :placeholder="defaultPageSize"
              @change="handleSizeChange"
          >
            <el-option
                v-for="size in pageSizes"
                :key="size"
                :label="size"
                :value="size"
            />
          </el-select>
          <el-text size="small"> 条记录</el-text>
        </el-col>
        <el-col id="pagination">
          <el-pagination
              size="small"
              background
              layout="prev, pager, next"
              class="mt-4"
              hide-on-single-page
              :pager-count="11"
              v-model:current-page="page"
              v-model:total="total"
              v-model:page-size="size"
              @current-change="handlePageChange"
          />
        </el-col>
      </el-row>
    </template>
  </el-card>
</template>

<style scoped>
#pagination {
  justify-items: end;
}
</style>
