<script lang="ts">
import {Delete, Edit, Operation, Search} from '@element-plus/icons-vue';
import BreadCrumbNav from "@/components/BreadCrumbNav.vue";
import { defineComponent, reactive, ref } from "vue";

const moduleName = "project"
const defaultPageSize = 10
const pageSizes = [10, 25]

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
  components: { Delete, Edit, Operation, BreadCrumbNav, Search },
  mounted() {
    this.updateData()
  },
  data() {
    return {
      keyword: ref(this.$route.query.keyword ? this.$route.query.keyword.toString(): ""),
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
      fakeData: [
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
        },
      ],
    }
  },
  methods: {
    getJsonFake() {
      let filtered = this.keyword.length == 0 ? this.fakeData : this.fakeData.filter((item)=>{
        return item.name.indexOf(this.keyword) != -1
      })
      let result = {
        data: filtered.slice((this.page - 1) * this.size, this.page * this.size),
        total: filtered.length,
        start: (this.page - 1) * this.size + 1,
        end: this.page * this.size
      }
      if (result.start > result.total)
        result.start = result.total
      if (result.end > result.total)
        result.end = result.total
      return JSON.stringify(result)
    },
    updateData() {
      let result = JSON.parse(this.getJsonFake())
      this.total = result.total
      this.start = result.start
      this.end = result.end
      this.data.length = 0
      Object.assign(this.data, result.data)
    },
    updateUrl() {
      let url = "/" + moduleName + "/list?page=" + this.page
      if (this.size != defaultPageSize)
        url += "&size=" + this.size;
      if (this.keyword.length != 0)
        url += "&keyword=" + this.keyword
      this.$router.push(url)
    },
    handleSearch() {
      this.updateUrl()
      this.updateData()
    },
    handleCreate() {
      let url = "/" + moduleName + "/create"
      this.$router.push(url)
    },
    handleManage(_: number, row: Project) {
      let url = "/" + moduleName + "/modules?id=" + row.id
      this.$router.push(url)
    },
    handleEdit(_: number, row: Project) {
      let url = "/" + moduleName + "/edit?id=" + row.id
      this.$router.push(url)
    },
    handleDelete(_: number, row: Project) {
      this.deleteDialogVisible = true
      this.itemToDelete = row
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
    performDelete() {
      console.log(this.itemToDelete)
      this.$router.go(0)
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
    <el-form label-width="auto" style="max-width: 600px">
      <el-form-item label="项目名称">
        <el-input v-model="keyword" />
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
        <el-icon><Search /></el-icon>&nbsp;&nbsp;
        <span>列表信息</span>
      </div>
    </template>
    <el-table :data="data" style="width: 100%">
      <el-table-column align="center" prop="id" label="序号" width="80"/>
      <el-table-column align="center" prop="keyword" label="项目关键字"/>
      <el-table-column align="center" prop="name" label="项目名称"/>
      <el-table-column align="center" prop="description" label="项目描述信息"/>
      <el-table-column align="center" prop="owner" label="项目负责人"/>
      <el-table-column align="center" prop="created" label="创建日期"/>
      <el-table-column align="center" label="操作" width="130">
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
      <el-row class="row-bg" justify="space-between">
        <el-col>
          <el-text size="small">显示第 {{ start }} 到第 {{ end }} 条记录，总共 {{ total }} 条记录，每页显示</el-text>
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
  <el-dialog
      v-model="deleteDialogVisible"
      title="确认删除"
      width="500"
  >
    <span>确认删除这个项目吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="deleteDialogVisible = false; performDelete()">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
#pagination {
  justify-items: end;
}
</style>
