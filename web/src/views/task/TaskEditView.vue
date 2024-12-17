<script lang="ts">
import module from "@/api/module"
import project from "@/api/project"
import task from "@/api/task"
import user from "@/api/user"
import BreadCrumbNav from "@/components/BreadCrumbNav.vue"
import { ArrowLeft, CircleCheck, FolderOpened } from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { reactive } from "vue"
import { useRoute } from "vue-router"

export default {
  components: {
    BreadCrumbNav, FolderOpened, CircleCheck, ArrowLeft
  },
  data() {
    const route = useRoute()
    const routeId = route.query.id.toString()
    return {
      routeId,
      currentProject: reactive(project.empty),
      module,
      treeProps: reactive({
        children: 'features',
        hasChildren: 'hasChildren'
      }),
      realNames: reactive([]),
      form: reactive({})
    }
  },
  mounted() {
    user.getAllRealNames().then(names => {
      this.realNames.length = 0
      Object.assign(this.realNames, [{key: '', label: '请选择...', value: ''}].concat(names))
    })
    project.get(this.routeId).then((data) => {
      this.currentProject = data
      this.currentProject?.modules.forEach(module => {
        this.form[module.id] = {}
        module.features.forEach(feature =>{
          this.form[module.id][feature.id] = {
            id: feature.id,
            owner: feature.owner ? feature.owner.id : null
          }
        })
      })
    })
  },
  methods: {
    goBack() {
      this.$router.push('/task/list')
    },
    handleSubmit() {
      ElMessageBox.confirm(
        '确定要保存有关开发者的修改吗？',
        '保存修改',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        task.modify(this.routeId, this.form).then((response) => {
          if (response.success) {
            ElMessage.success('保存成功')
            this.$router.go(0)
          } else {
            ElMessage.error('保存失败')
          }
        })
      })
    },
    ifModuleRow(row: any) {
      return row.features
    }
  }
}
</script>

<template>
  <BreadCrumbNav :page-paths="['任务分配', '项目列表', '任务分配']"></BreadCrumbNav>
  <el-card class="info-card" shadow="never">
    <template #header>
      <div class="module-card-header">
        <div class="module-card-header-left">
          <el-icon><FolderOpened/></el-icon>&nbsp;&nbsp;
          <el-text
            v-if="currentProject"
            style="font-size: 20px; font-weight: bold;"
          >
            [ {{ currentProject?.name }} ] 任务分配
          </el-text>
          <el-text
            v-else
            style="font-size: 20px; font-weight: bold;"
          >
            该项目不存在
          </el-text>
        </div>
        <div v-if="currentProject">
          <el-button
            type="success"
            @click="handleSubmit"
          >
            <el-icon><CircleCheck /></el-icon>&nbsp;&nbsp;保存
          </el-button>
          <el-button
            type="primary"
            @click="goBack"
          >
            <el-icon><ArrowLeft /></el-icon>&nbsp;&nbsp;返回项目列表
          </el-button>
        </div>
      </div>
    </template>

    <el-table
      v-if="currentProject"
      :data="currentProject.modules"
      row-key="id"
      border
      default-expand-all
      :tree-props="treeProps"
      :row-class-name="module.getRowClassName"
    >
      <el-table-column prop="name" label="模块名 / 功能名" />
      <el-table-column prop="hours" label="计划耗时" :formatter="module.hoursFormatter"/>
      <el-table-column label="开发者">
        <template #default="scope">
          <el-select
            v-model="form[scope.row.module][scope.row.id].owner"
            v-if="!ifModuleRow(scope.row)"
            placeholder="请选择..."
          >
          <el-option
            v-for="item in realNames"
            :key="item.key"
            :label="item.label"
            :value="item.value"
          ></el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style>

</style>
