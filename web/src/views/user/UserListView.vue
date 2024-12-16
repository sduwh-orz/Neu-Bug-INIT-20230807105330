<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Delete, Edit, List, Search } from '@element-plus/icons-vue'
import BreadCrumbNav from '@/components/BreadCrumbNav.vue'
import Pagination from "@/components/Pagination.vue"
import user from '@/api/user.ts'
import utils from '@/api/utils.ts'

export default defineComponent({
  computed: {
    Delete() {
      return Delete
    },
    Edit() {
      return Edit
    }
  },
  components: { Pagination, List, Delete, Edit, BreadCrumbNav, Search },
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
      roles: utils.toOptions(user.roles),
      dialogToggle: ref(false),
      data: reactive([]),
      query: reactive({
        username: '',
        realName: '',
        role: '',
        email: ''
      }),
      selectedItem: undefined,
    }
  },
  methods: {
    updateData() {
      let result = user.search(this.query, this.page.page, this.page.size)
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
    handleEdit(_: number, row) {
      this.page.jump('/edit?id=' +  row.id)
    },
    handleDelete(_: number, row) {
      this.dialogToggle = true
      this.selectedItem = row
    },
    performDelete() {
      user.remove(this.selectedItem.id)
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
            <el-input v-model="query.username" />
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="真实姓名" class="disable-select" label-width="80">
            <el-input v-model="query.realName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row justify="space-between">
        <el-col :span="11">
          <el-form-item label="角色" class="disable-select" label-width="80">
            <el-select
                v-model="query.role"
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
            <el-input v-model="query.email" />
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
      <Pagination ref="page" :update-data="updateData" :query="query" module="user" path="list" />
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
