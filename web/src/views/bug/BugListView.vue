<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElMessage } from "element-plus"
import { Edit, Select, Memo, SwitchButton, Search, List } from '@element-plus/icons-vue'
import type { Module } from '@/types/module'
import type { User } from '@/types/user'
import type { Option } from '@/types/option.ts'
import BreadCrumbNav from '@/components/BreadCrumbNav.vue'
import Pagination from '@/components/Pagination.vue'
import user from '@/api/user.ts'
import bug from '@/api/bug.ts'
import utils from '@/api/utils.ts'
import project from '@/api/project.ts'

const refComment = ref()

export default defineComponent({
  computed: {
    features() {
      if (this.query.module) {
        let m = this.project.modules.find((m: any) => { return m.name == this.query.module })
        return utils.toOptions(m?.features.map((f: any) => f.name))
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
  components: { Pagination, List, BreadCrumbNav, Edit, Select, Memo, SwitchButton, Search },
  mounted() {
    this.page.update()
  },
  setup() {
    return {
      page: ref(),
      dialogs: reactive({
        solve: {
          solveType: '解决',
          comment: '',
          toggle: false,
          rules: reactive({
            solveType: [
              {
                required: true,
                message: '请选择解决类型',
                trigger: 'blur'
              }
            ],
          }),
        },
        comment: {
          comment: '',
          toggle: false,
          rules: reactive({
            comment: [
              {
                required: true,
                message: '请填写备注',
                trigger: 'blur'
              }
            ],
          }),
        },
        close: {
          comment: '',
          toggle: false,
        },
      }),
      refComment: refComment,
    }
  },
  data() {
    return {
      gradeColor: bug.gradeColor,
      statusColor: bug.statusColor,
      grades: utils.toOptions(bug.grades),
      statusTypes: utils.toOptions(bug.statusTypes),
      solveTypes: utils.toOptions(bug.solveTypes),
      data: reactive([]),
      project: reactive({
        id: 0,
        modules: [] as Module[]
      }),
      modules: reactive([] as Option[]),
      users: reactive([] as User[]),
      query: reactive({
        id: 1,
        name: '',
        grade: '',
        module: '',
        feature: '',
        owner: undefined,
        reporter: undefined,
        status: '',
        solveType: '',
      }),
      selectedItem: {
        id: ''
      },
    }
  },
  methods: {
    updateData() {
      let result = bug.searchInProject(this.query, this.page.page, this.page.size)
      this.data.length = 0
      Object.assign(this.data, result.data)

      let p = project.get(this.query.id)
      if (p) {
        this.project = p
        this.modules.length = 0
        Object.assign(this.modules, utils.toOptions(p.modules.map( m => m.name )))
      }

      let users: any[] = user.all()
      this.users.length = 0
      Object.assign(this.users, [{id: '', realName: '全部'}].concat(users))

      return {
        total: result.total,
        start: result.start,
        end: result.end,
      }
    },
    clearFeature() {
      this.query.feature =''
    },
    clearAll() {
      this.page.clearAll(['id'])
    },
    handleSearch() {
      this.page.update()
    },
    handleCreate() {
      this.page.jump('/create?id=' + this.project.id)
    },
    handleEdit(_: number, row: any) {
      this.page.jump('/edit?id=' + row.id)
    },
    handleView(_: number, row: any) {
      this.page.jump('/info?id=' + row.id)
    },
    handleSolve(_: number, row: any) {
      this.dialogs.solve.toggle = true
      this.selectedItem = row
    },
    handleComment(_: number, row: any) {
      this.dialogs.comment.toggle = true
      this.selectedItem = row
    },
    handleClose(_: number, row: any) {
      this.dialogs.close.toggle = true
      this.selectedItem = row
    },
    handleSubmitSolve() {
      if (this.selectedItem) {
        bug.modify(
            this.selectedItem.id,
            '已解决',
            this.dialogs.solve.solveType,
            this.dialogs.solve.comment,
            undefined,
            undefined
        )
        this.dialogs.solve.toggle = false
        ElMessage.success('提交成功')
        this.$router.go(0)
      }
    },
    handleSubmitComment() {
      if (this.selectedItem) {
        try {
          refComment.value.validate().then(() => {
            bug.modify(
                this.selectedItem.id,
                undefined,
                undefined,
                this.dialogs.comment.comment,
                undefined,
                undefined
            )
            this.dialogs.comment.toggle = false
            ElMessage.success('提交成功')
            this.$router.go(0)
          })
        } catch (error) {
          ElMessage.error('请输入备注')
        }
      }
    },
    handleSubmitClose() {
      if (this.selectedItem) {
        bug.modify(
            this.selectedItem.id,
            '已关闭',
            undefined,
            this.dialogs.close.comment,
            undefined,
            undefined
        )
        this.dialogs.close.toggle = false
        ElMessage.success('提交成功')
        this.$router.go(0)
      }
    },
    handleAllBugs() {
      this.clearAll()
      this.page.update()
    },
    handleMyBugs() {
      let nowUser = user.getLoggedInUser()
      this.clearAll()
      if (nowUser) {
        this.query.owner = nowUser.id
      }
      this.page.update()
    },
    handleMyReports() {
      let nowUser = user.getLoggedInUser()
      this.clearAll()
      if (nowUser) {
        this.query.reporter = nowUser.id
      }
      this.page.update()
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
          <el-form-item label="Bug 标题" label-width="100px">
            <el-input v-model="query.name" />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="Bug 等级" label-width="100px">
            <el-select
                v-model="query.grade"
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
          <el-form-item label="所属模块" label-width="100px">
            <el-select
                v-model="query.module"
                class="m-2"
                placeholder="全部"
                @change="clearFeature()"
            >
              <el-option
                  v-for="m in modules"
                  :key="m.value"
                  :label="m.name"
                  :value="m.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="所属功能" label-width="100px">
            <el-select
                v-model="query.feature"
                class="m-2"
                placeholder="全部"
            >
              <el-option
                  v-for="f in features"
                  :key="f.value"
                  :label="f.name"
                  :value="f.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row justify="space-between">
        <el-col :span="11">
          <el-form-item label="开发人" label-width="100px">
            <el-select
                v-model="query.owner"
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
          <el-form-item label="报告人" label-width="100px">
            <el-select
                v-model="query.reporter"
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
          <el-form-item label="Bug 状态" label-width="100px">
            <el-select
                v-model="query.status"
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
          <el-form-item label="解决形式" label-width="100px">
            <el-select
                v-model="query.solveType"
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
      <el-table-column align="center" prop="grade" label="Bug 等级">
        <template #default="scope">
          <el-tag
              :type="gradeColor[scope.row.grade]"
              effect="light"
          >
            {{ scope.row.grade }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="owner" label="开发人"/>
      <el-table-column align="center" prop="reporter" label="报告人"/>
      <el-table-column align="center" prop="status" label="Bug 状态">
        <template #default="scope">
          <el-tag
              :type="statusColor[scope.row.status]"
              effect="light"
          >
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
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
      <Pagination ref="page" :update-data="updateData" :query="query" module="bug" path="bugs" />
    </template>
  </el-card>
  <el-dialog v-model="dialogs.solve.toggle" title="解决 Bug" width="500">
    <el-form :model="dialogs.solve" :rules="dialogs.solve.rules" status-icon>
      <el-form-item label="解决形式" label-width="100" prop="solveType">
        <el-select
            v-model="dialogs.solve.solveType"
            class="m-2"
            placeholder="请选择"
        >
          <el-option
              v-for="t in solveTypes.slice(2)"
              :key="t.value"
              :label="t.name"
              :value="t.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" label-width="100" prop="comment">
        <el-input v-model="dialogs.solve.comment" type="textarea"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogs.solve.toggle = false">关闭</el-button>
        <el-button type="primary" @click="handleSubmitSolve()">保存</el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogs.comment.toggle" title="写备注" width="500">
    <el-form ref="refComment" :model="dialogs.comment" :rules="dialogs.comment.rules" status-icon>
      <el-form-item label="备注" label-width="100" prop="comment">
        <el-input v-model="dialogs.comment.comment" type="textarea"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogs.comment.toggle = false">关闭</el-button>
        <el-button type="primary" @click="handleSubmitComment()">保存</el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogs.close.toggle" title="关闭 Bug" width="500">
    <el-form :model="dialogs.close" status-icon>
      <el-form-item label="备注" label-width="100" prop="comment">
        <el-input v-model="dialogs.close.comment" type="textarea"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogs.close.toggle = false">关闭</el-button>
        <el-button type="primary" @click="handleSubmitClose()">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>
