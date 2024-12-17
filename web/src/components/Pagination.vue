<script lang="ts">
import {defineComponent, ref} from 'vue'

const defaultPageSize = 10
const pageSizes = [10, 25]

export default defineComponent({
  name: "Pagination",
  props: {
    path: { required: true },
    module: { required: true },
    query: { required: true },
    updateData: { type: Function, required: true }
  },
  mounted() {
    this.initParams()
    this.updateStats(this.updateData())
  },
  data() {
    let params = this.$route.query
    return {
      defaultPageSize: defaultPageSize,
      pageSizes: pageSizes,
      page: ref(params.page ? Number(params.page) : 1),
      size: ref(params.size ? Number(params.size) : defaultPageSize),
      total: ref(0),
      start: ref(0),
      end: ref(0),
    }
  },
  methods: {
    initParams() {
      let params = this.$route.query
      for (const param in (this.query as any)) {
        if (this.query.hasOwnProperty(param) && params[param]) {
          let type = typeof this.query[param]
          if (type === 'number' || type == 'undefined')
            this.query[param] = Number(params[param])
          else
            this.query[param] = params[param]
        }
      }
    },
    updateUrl() {
      let params = []
      for (const param in (this.query as any)) {
        if (this.query.hasOwnProperty(param) && this.query[param]) {
          params.push(param + '=' + this.query[param])
        }
      }
      if (this.page != 1)
        params.push('page=' + this.page)
      if (this.size != defaultPageSize)
        params.push('size=' + this.size)
      let url = '/' + this.module + '/' + this.path + '?' + params.join('&')
      this.$router.push(url)
    },
    updateStats(result: any) {
      this.total = result.total
      this.start = result.start
      this.end = result.end
    },
    update() {
      this.updateUrl()
    },
    handlePageChange(page: number) {
      this.page = page
      this.update()
    },
    jump(path: string) {
      let url = '/' + this.module
      if (!path.startsWith('/'))
        url += '/'
      url += path
      this.$router.push(url)
    },
    clearAll(except: string[] = []) {
      for (const param in (this.query as any)) {
        if (!except.includes(param) && this.query.hasOwnProperty(param)) {
          let type = typeof this.query[param]
          if (type === 'number' || type == 'undefined')
            this.query[param] = undefined
          else
            this.query[param] = ''
        }
      }
    },
  },
  watch: {
    $route(to, from) {
      if (to.path == from.path) {
        if (JSON.stringify(to.query) != JSON.stringify(from.query)) {
          let params = to.query
          for (const param in (this.query as any)) {
            if (this.query.hasOwnProperty(param)) {
              if (this.query[param] == params[param])
                continue
              let type = typeof this.query[param]
              if (type === 'number' || type == 'undefined')
                this.query[param] = Number(params[param])
              else
                this.query[param] = params[param]
            }
          }
          this.updateStats(this.updateData())
        }
      }
    }
  }
})
</script>

<template>
<el-row class="row-bg" justify="space-between">
  <el-col>
    <el-text size="small">显示第 {{ start }} 到第 {{ end }} 条记录，总共 {{ total }} 条记录，每页显示 </el-text>
    <el-select
        v-model="size"
        size="small"
        style="width: 60px"
        :placeholder="defaultPageSize.toString()"
        @change="update"
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

<style scoped>

</style>