<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElMessage } from "element-plus"
import { Delete, Edit, List, Operation, Search } from '@element-plus/icons-vue'
import BreadCrumbNav from '@/components/BreadCrumbNav.vue'
import Pagination from "@/components/Pagination.vue"
import project from '@/api/project.ts'

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
      dialogToggle: ref(false),
      data: reactive([]),
      query: reactive({
        keyword: ''
      }),
      selectedItem: {
        id: undefined,
      },
    }
  },
  methods: {
    updateData() {
      let result = project.search(this.query.keyword, this.page.page, this.page.size)
      this.data.length = 0
      Object.assign(this.data, result.data)
      return {
        total: result.total,
        start: result.start,
        end: result.end,
      }
    },
    handleSearch() {
      this.page.update()
    },
    handleCreate() {
      this.page.jump('/create')
    },
    handleManage(_: number, row: any) {
      this.page.jump('/modules?id=' +  row.id)
    },
    handleEdit(_: number, row: any) {
      this.page.jump('/edit?id=' +  row.id)
    },
    handleDelete(_: number, row: any) {
      this.dialogToggle = true
      this.selectedItem = row
    },
    performDelete() {
      if (this.selectedItem.id) {
        project.remove(this.selectedItem.id)
        ElMessage.success('删除成功')
        this.$router.go(0)
      }
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
    <el-form label-width="auto">
      <el-form-item label="项目名称" style="max-width: 60%" label-width="100">
        <el-input v-model="query.keyword" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-row class="row-bg" justify="end">
        <div class="flex-grow" />
        <el-button type="primary" @click="handleSearch" round>查询</el-button>
        <el-button type="primary" @click="handleCreate" round>添加</el-button>
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
    <el-table :data="data" style="width: 100%" empty-text="没有找到匹配的记录">
      <el-table-column align="center" prop="id" label="序号" width="80"/>
      <el-table-column align="center" prop="keyword" label="项目关键字"/>
      <el-table-column align="center" prop="name" label="项目名称"/>
      <el-table-column align="center" prop="description" label="项目描述信息"/>
      <el-table-column align="center" prop="owner" label="项目负责人"/>
      <el-table-column align="center" prop="created" label="创建日期"/>
      <el-table-column align="center" label="操作" width="130">
        <template #default="scope">
          <el-tooltip
              class="box-item"
              content="模块管理"
              placement="top"
          >
            <el-button
                :icon="Operation"
                size="small"
                @click="handleManage(scope.$index, scope.row)"
                circle
            />
          </el-tooltip>
          <el-tooltip
              class="box-item"
              content="修改"
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
              content="删除"
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
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <Pagination ref="page" :update-data="updateData" :query="query" module="project" path="list" />
    </template>
  </el-card>
  <el-dialog
      v-model="dialogToggle"
      title="确认删除"
      width="500"
  >
    <span>确认删除这个项目吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogToggle = false">取消</el-button>
        <el-button type="danger" @click="dialogToggle = false; performDelete()">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>
