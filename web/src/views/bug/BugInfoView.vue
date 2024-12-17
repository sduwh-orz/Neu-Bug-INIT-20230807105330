<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Delete, Edit, List, Operation, Search } from '@element-plus/icons-vue'
import BreadCrumbNav from '@/components/BreadCrumbNav.vue'
import Pagination from "@/components/Pagination.vue"
import utils from '@/api/utils.ts'
import bug from '@/api/bug.ts'
import user from '@/api/user.ts'

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
    return {
      gradeColor: bug.gradeColor,
      statusColor: bug.statusColor,
      dialogToggle: ref(false),
      data: reactive([]),
      bug: reactive(bug.empty),
      project: reactive({
        name: ''
      }),
      module: reactive({
        name: ''
      }),
      feature: reactive({
        name: '',
        owner: user.empty
      }),
      query: reactive({
        id: ''
      }),
      selectedItem: undefined,
    }
  },
  methods: {
    async updateData() {
      let now = await bug.get(this.query.id)
      console.log(now)
      this.bug = now
      this.project = now.feature.module.project
      this.module = now.feature.module
      this.feature = now.feature
      let result = utils.getDataWithPageInfo(this.bug.records, this.page.page, this.page.size)
      console.log(result)

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
      <el-descriptions-item label="Bug 等级">
        <el-tag
            :type="gradeColor[bug.grade.name]"
            effect="light"
        >
          {{ bug.grade.name }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="所属模块">{{ module.name }}</el-descriptions-item>
      <el-descriptions-item label="所属功能">{{ feature.name }}</el-descriptions-item>
      <el-descriptions-item label="Bug 状态">
        <el-tag
            :type="statusColor[bug.status.name]"
            effect="light"
        >
          {{ bug.status.name }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="解决形式">{{ bug.solveType.name }}</el-descriptions-item>
      <el-descriptions-item label="开发人">{{ feature.owner.realName }}</el-descriptions-item>
      <el-descriptions-item label="报告人">{{ bug.reporter.realName }}</el-descriptions-item>
      <el-descriptions-item label="创建日期">{{ bug.created }}</el-descriptions-item>
      <el-descriptions-item label="最后处理日期">{{ bug.modified }}</el-descriptions-item>
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
      <el-table-column align="center" type="index" label="序号" width="80"/>
      <el-table-column align="center" prop="type.name" label="操作类型"/>
      <el-table-column align="center" prop="before" label="处理前状态">
        <template #default="scope">
          <el-tag
              :type="statusColor[scope.row.previous.name]"
              effect="light"
          >
            {{ scope.row.previous.name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="after" label="处理后状态">
        <template #default="scope">
          <el-tag
              :type="statusColor[scope.row.after.name]"
              effect="light"
          >
            {{ scope.row.after.name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="solveType.name" label="解决形式"/>
      <el-table-column align="center" prop="comment" label="备注"/>
      <el-table-column align="center" prop="user.realName" label="操作人"/>
      <el-table-column align="center" prop="time" label="操作时间"/>
    </el-table>
    <template #footer>
      <Pagination ref="page" :update-data="updateData" :query="query" module="bug" path="info" />
    </template>
  </el-card>
</template>

<style scoped>
</style>
