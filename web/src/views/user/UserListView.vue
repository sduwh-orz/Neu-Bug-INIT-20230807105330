<script lang="ts">
import {Delete, Edit, List, Search} from '@element-plus/icons-vue'
import BreadCrumbNav from '@/components/BreadCrumbNav.vue'
import user from '@/api/user.ts'
import { User } from '@/types/user'
import { defineComponent, reactive, ref } from 'vue'
import utils from '@/api/utils.ts'

const moduleName = 'user'
const defaultPageSize = 10
const pageSizes = [10, 25]

export default defineComponent({
  computed: {
    Delete() {
      return Delete
    },
    Edit() {
      return Edit
    }
  },
  components: {List, Delete, Edit, BreadCrumbNav, Search },
  mounted() {
    this.updateData()
  },
  data() {
    return {
      username: ref(this.$route.query.username ? this.$route.query.username.toString(): ''),
      realName: ref(this.$route.query.realName ? this.$route.query.realName.toString(): ''),
      role: ref(this.$route.query.role ? this.$route.query.role.toString(): ''),
      email: ref(this.$route.query.email ? this.$route.query.email.toString(): ''),
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
      roles: utils.toOptions(user.roles)
    }
  },
  methods: {
    updateData() {
      let result = user.getData(this.username, this.realName, this.role, this.email, this.page, this.size)
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
      if (this.username.length != 0)
        url += '&username=' + this.username
      if (this.realName.length != 0)
        url += '&realName=' + this.realName
      if (this.role.length != 0)
        url += '&role=' + this.role
      if (this.email.length != 0)
        url += '&email=' + this.email
      this.$router.push(url)
    },
    handleSearch() {
      this.updateUrl()
      this.updateData()
    },
    handleCreate() {
      let url = '/' + moduleName + '/create'
      this.$router.push(url)
    },
    handleEdit(_: number, row: User) {
      let url = '/' + moduleName + '/edit?id=' + row.id
      this.$router.push(url)
    },
    handleDelete(_: number, row: User) {
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
      user.deleteUser(this.itemToDelete.id)
      this.$router.go(0)
    }
  }
})

</script>

<template>
  <BreadCrumbNav :page-paths="['用户管理', '用户列表']"></BreadCrumbNav>
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
          <el-form-item label="用户名" class="disable-select" label-width="80">
            <el-input v-model="username" />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="真实姓名" class="disable-select" label-width="80">
            <el-input v-model="realName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row justify="space-between">
        <el-col :span="11">
          <el-form-item label="角色" class="disable-select" label-width="80">
            <el-select
                v-model="role"
                class="m-2"
                placeholder="全部"
            >
              <el-option
                  v-for="role in roles"
                  :key="role.name"
                  :label="role.name"
                  :value="role.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="邮箱" class="disable-select" label-width="80">
            <el-input v-model="email" />
          </el-form-item>
        </el-col>
      </el-row>
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
      <el-table-column align="center" prop="username" label="用户名"/>
      <el-table-column align="center" prop="realName" label="真实姓名"/>
      <el-table-column align="center" prop="role" label="角色"/>
      <el-table-column align="center" prop="email" label="邮箱"/>
      <el-table-column align="center" label="操作" width="130">
        <template #default="scope">
          <el-tooltip
              class="box-item"
              content="编辑"
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
