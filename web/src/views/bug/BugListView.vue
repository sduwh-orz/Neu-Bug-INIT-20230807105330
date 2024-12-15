<script lang="ts">
import { Edit, Select, Memo, SwitchButton, Search, List } from '@element-plus/icons-vue'
import BreadCrumbNav from '@/components/BreadCrumbNav.vue'
import user from '@/api/user.ts'
import bug from '@/api/bug.ts'
import { defineComponent, reactive, ref } from 'vue'
import utils from '@/api/utils.ts'
import project from '@/api/project.ts'
import type {Bug} from "@/types/bug";

const moduleName = 'bug'
const defaultPageSize = 10
const pageSizes = [10, 25]

export default defineComponent({
  computed: {
    features() {
      if (this.module) {
        let m = this.project.modules.find(m => { return m.name == this.module })
        return utils.toOptions(m.features.map(f => f.name))
      }
      return utils.toOptions([])
    },
    Edit() {
      return Edit
    },
    Select() {
      return Select
    },
    Memo() {
      return Memo
    },
    SwitchButton() {
      return SwitchButton
    },
    Search() {
      return Search
    }
  },
  components: {List, BreadCrumbNav, Edit, Select, Memo, SwitchButton, Search },
  mounted() {
    this.updateData()
  },
  data() {
    return {
      id: ref(this.$route.query.id ? Number(this.$route.query.id): 1),
      name: ref(this.$route.query.name ? this.$route.query.name.toString(): ''),
      grade: ref(this.$route.query.grade ? this.$route.query.grade.toString(): ''),
      module: ref(this.$route.query.module ? this.$route.query.module.toString(): ''),
      feature: ref(this.$route.query.feature ? this.$route.query.feature.toString(): ''),
      owner: ref(this.$route.query.owner ? Number(this.$route.query.owner): undefined),
      reporter: ref(this.$route.query.reporter ? Number(this.$route.query.reporter): undefined),
      status: ref(this.$route.query.status ? this.$route.query.status.toString(): ''),
      solveType: ref(this.$route.query.solveType ? this.$route.query.solveType.toString(): ''),
      page: ref(this.$route.query.page ? Number(this.$route.query.page) : 1),
      size: ref(this.$route.query.size ? Number(this.$route.query.size) : defaultPageSize),
      total: ref(0),
      start: ref(0),
      end: ref(0),
      itemToDelete: undefined,
      data: reactive([]),
      defaultPageSize: defaultPageSize,
      pageSizes: pageSizes,
      grades: utils.toOptions(bug.grades),
      statusTypes: utils.toOptions(bug.statusTypes),
      solveTypes: utils.toOptions(bug.solveTypes),
      project: reactive([]),
      modules: reactive([]),
      users: reactive([]),
    }
  },
  methods: {
    updateData() {
      let result = bug.searchData(this.id, this.name, this.grade, this.module, this.feature, this.owner,
          this.reporter, this.status, this.solveType, this.page, this.size)
      this.data.length = 0
      Object.assign(this.data, result.data ?.map( (b, index) => {
        b.index = index + 1
        return b
      }))

      let p = project.getProject(this.id)
      this.project = p
      this.modules.length = 0
      Object.assign(this.modules, utils.toOptions(p.modules.map( m => m.name )))

      let users = user.getAllUsers()
      this.users.length = 0
      Object.assign(this.users, [{id: '', realName: '全部'}].concat(users))

      this.total = result.total
      this.start = result.start
      this.end = result.end
    },
    updateUrl() {
      let url = '/' + moduleName + '/bugs?id=' + this.id
      if (this.page != 1)
        url += '&page=' + this.page
      if (this.size != defaultPageSize)
        url += '&size=' + this.size;
      if (this.name)
        url += '&name=' + this.name
      if (this.grade)
        url += '&grade=' + this.grade
      if (this.module)
        url += '&module=' + this.module
      if (this.feature)
        url += '&feature=' + this.feature
      if (this.owner)
        url += '&owner=' + this.owner
      if (this.reporter)
        url += '&reporter=' + this.reporter
      if (this.status)
        url += '&status=' + this.status
      if (this.solveType)
        url += '&solveType=' + this.solveType
      this.$router.push(url)
    },
    clearFeature() {
      this.feature =''
    },
    clearAll() {
      this.name = ''
      this.grade = ''
      this.module = ''
      this.feature = ''
      this.owner = ''
      this.reporter = ''
      this.status = ''
      this.solveType = ''
    },
    handleSearch() {
      this.updateUrl()
      this.updateData()
    },
    handleCreate() {
      let url = '/' + moduleName + '/create'
      this.$router.push(url)
    },
    handleEdit(_: number, row: Bug) {
      let url = '/' + moduleName + '/edit?id=' + row.id
      this.$router.push(url)
    },
    handleSolve(_: number, row: Bug) {

    },
    handleComment(_: number, row: Bug) {

    },
    handleClose(_: number, row: Bug) {

    },
    handleView(_: number, row: Bug) {
      let url = '/' + moduleName + '/info?id=' + row.id
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
    handleAllBugs() {
      this.clearAll()
      this.updateUrl()
      this.updateData()
    },
    handleMyBugs() {
      let nowUser = user.getLoggedInUser()
      this.clearAll()
      this.owner = nowUser.id
      this.updateUrl()
      this.updateData()
    },
    handleMyReports() {
      let nowUser = user.getLoggedInUser()
      this.clearAll()
      this.reporter = nowUser.id
      this.updateUrl()
      this.updateData()
    },
  }
})

</script>

<template>
  <BreadCrumbNav :page-paths="['Bug 管理', '项目列表', 'Bug 列表']"></BreadCrumbNav>
  <el-card class="info-card" shadow="never">
    <template #header>
      <div class="card-header">
        <el-icon><Search /></el-icon>&nbsp;&nbsp;
        <span>查询信息</span>
      </div>
    </template>
    <el-form>
      <el-row justify="space-between">
        <el-col :span="11">
          <el-form-item label="Bug 标题" class="disable-select">
            <el-input v-model="name" />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="Bug 等级" class="disable-select">
            <el-select
                v-model="grade"
                class="m-2"
                placeholder="全部"
            >
              <el-option
                  v-for="g in grades"
                  :key="g.name"
                  :label="g.name"
                  :value="g.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row justify="space-between">
        <el-col :span="11">
          <el-form-item label="所属模块" class="disable-select">
            <el-select
                v-model="module"
                class="m-2"
                placeholder="全部"
                @change="clearFeature()"
            >
              <el-option
                  v-for="m in modules"
                  :key="m.name"
                  :label="m.name"
                  :value="m.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="所属功能" class="disable-select">
            <el-select
                v-model="feature"
                class="m-2"
                placeholder="全部"
            >
              <el-option
                  v-for="f in features"
                  :key="f.name"
                  :label="f.name"
                  :value="f.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row justify="space-between">
        <el-col :span="11">
          <el-form-item label="&emsp;开发人" class="disable-select">
            <el-select
                v-model="owner"
                class="m-2"
                placeholder="全部"
            >
              <el-option
                  v-for="u in users"
                  :key="u.id"
                  :label="u.realName"
                  :value="u.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="&emsp;报告人" class="disable-select">
            <el-select
                v-model="reporter"
                class="m-2"
                placeholder="全部"
            >
              <el-option
                  v-for="u in users"
                  :key="u.id"
                  :label="u.realName"
                  :value="u.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row justify="space-between">
        <el-col :span="11">
          <el-form-item label="Bug 状态" class="disable-select">
            <el-select
                v-model="status"
                class="m-2"
                placeholder="全部"
            >
              <el-option
                  v-for="s in statusTypes"
                  :key="s.value"
                  :label="s.name"
                  :value="s.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="解决形式" class="disable-select">
            <el-select
                v-model="solveType"
                class="m-2"
                placeholder="全部"
            >
              <el-option
                  v-for="t in solveTypes"
                  :key="t.value"
                  :label="t.name"
                  :value="t.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-row class="row-bg" justify="end">
        <div class="flex-grow" />
        <el-button type="primary" @click="handleSearch" round>查询</el-button>
        <el-button type="primary" @click="handleAllBugs" round>全部 Bug</el-button>
        <el-button type="primary" @click="handleMyBugs" round>我开发的 Bug</el-button>
        <el-button type="primary" @click="handleMyReports" round>我报告的 Bug</el-button>
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
      <el-table-column align="center" prop="index" label="序号" width="80"/>
      <el-table-column align="center" prop="name" label="Bug 标题"/>
      <el-table-column align="center" prop="grade" label="Bug 等级"/>
      <el-table-column align="center" prop="owner" label="开发人"/>
      <el-table-column align="center" prop="reporter" label="报告人"/>
      <el-table-column align="center" prop="status" label="Bug 状态"/>
      <el-table-column align="center" prop="solveType" label="解决形式"/>
      <el-table-column align="center" label="操作" width="210">
        <template #default="scope">
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
              content="解决"
              placement="top"
          >
            <el-button
                :icon="Select"
                size="small"
                type="success"
                @click="handleSolve(scope.$index, scope.row)"
                circle
            />
          </el-tooltip>
          <el-tooltip
              class="box-item"
              content="备注"
              placement="top"
          >
            <el-button
                :icon="Memo"
                size="small"
                type="warning"
                @click="handleComment(scope.$index, scope.row)"
                circle
            />
          </el-tooltip>
          <el-tooltip
              class="box-item"
              content="关闭"
              placement="top"
          >
            <el-button
                :icon="SwitchButton"
                size="small"
                type="danger"
                @click="handleClose(scope.$index, scope.row)"
                circle
            />
          </el-tooltip>
          <el-tooltip
              class="box-item"
              content="查看"
              placement="top"
          >
            <el-button
                :icon="Search"
                size="small"
                @click="handleView(scope.$index, scope.row)"
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
