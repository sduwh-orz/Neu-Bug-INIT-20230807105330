<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Delete, Edit, List, Operation, Search } from '@element-plus/icons-vue'
import BreadCrumbNav from '@/components/BreadCrumbNav.vue'
import Pagination from "@/components/Pagination.vue"
import pagination from '@/api/pagination.ts'
import bug from "@/api/bug.ts";
import utils from "@/api/utils.ts";

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
  components: { Pagination, List, Delete, Edit, Operation, BreadCrumbNav, Search },
  mounted() {
    this.page.update()
  },
  setup() {
    return {
      page: ref()
    }
  },
  data() {
    let params = this.$route.query
    return {
      dialogToggle: ref(false),
      data: reactive([]),
      bug: reactive({}),
      project: reactive({}),
      module: reactive({}),
      feature: reactive({}),
      data: reactive([]),
      query: reactive({
        id: ''
      }),
      selectedItem: undefined,
    }
  },
  methods: {
    updateData() {
      let now = bug.get(this.query.id)
      this.bug = now.bug
      this.project = now.project
      this.module = now.module
      this.feature = now.feature
      let result = pagination.getDataWithPageInfo(this.bug.records, this.page.page, this.page.size)

      this.data.length = 0
      Object.assign(this.data, result.data)
      return {
        total: result.total,
        start: result.start,
        end: result.end,
      }
    },
  }
})

</script>

<template>
  <BreadCrumbNav :page-paths="['Bug 管理', '项目列表', 'Bug 列表', 'Bug 信息']"></BreadCrumbNav>
  <el-card class="info-card" shadow="never">
    <template #header>
      <div class="card-header">
        <el-icon><Search /></el-icon>&nbsp;&nbsp;
        <span>[ {{ project.name }} ] Bug 信息</span>
      </div>
    </template>
    <el-descriptions :column="3" border>
      <el-descriptions-item label="Bug 标题" :span="3">{{ bug.name }}</el-descriptions-item>
      <el-descriptions-item label="Bug 详情" :span="3">{{ bug.description }}</el-descriptions-item>
      <el-descriptions-item label="Bug 等级">{{ bug.grade }}</el-descriptions-item>
      <el-descriptions-item label="所属模块">{{ module.name }}</el-descriptions-item>
      <el-descriptions-item label="所属功能">{{ feature.name }}</el-descriptions-item>
      <el-descriptions-item label="Bug 状态">{{ bug.status }}</el-descriptions-item>
      <el-descriptions-item label="解决形式">{{ bug.solveType }}</el-descriptions-item>
      <el-descriptions-item label="开发人">{{ feature.owner }}</el-descriptions-item>
      <el-descriptions-item label="报告人">{{ bug.reporter }}</el-descriptions-item>
      <el-descriptions-item label="创建日期">{{ new Date(bug.created).toLocaleString() }}</el-descriptions-item>
      <el-descriptions-item label="最后处理日期">{{ new Date(bug.lastModified).toLocaleString() }}</el-descriptions-item>
    </el-descriptions>
  </el-card>
  <el-card class="info-card" shadow="never">
    <template #header>
      <div class="card-header">
        <el-icon><List /></el-icon>&nbsp;&nbsp;
        <span>Bug 处理记录列表</span>
      </div>
    </template>
    <el-table :data="data" style="width: 100%" empty-text="没有找到匹配的记录">
      <el-table-column align="center" prop="index" label="序号" width="80"/>
      <el-table-column align="center" prop="type" label="操作类型"/>
      <el-table-column align="center" prop="before" label="处理前状态"/>
      <el-table-column align="center" prop="after" label="处理后状态"/>
      <el-table-column align="center" prop="handleType" label="解决形式"/>
      <el-table-column align="center" prop="comment" label="备注"/>
      <el-table-column align="center" prop="owner" label="操作人"/>
      <el-table-column align="center" prop="time" label="操作时间">
        <template #default="scope">
          {{ new Date(scope.row.time).toLocaleString() }}
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <Pagination ref="page" :update-data="updateData" :query="query" module="bug" path="info" />
    </template>
  </el-card>
</template>

<style scoped>
</style>
