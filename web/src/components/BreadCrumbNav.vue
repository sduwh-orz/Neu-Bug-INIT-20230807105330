<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "BreadCrumbNav",
  props: {
    pagePaths: {
      type: Array,
      default: []
    }
  },
  computed: {
    getPathsExceptLast() {
      return this.pagePaths.slice(0, this.pagePaths.length - 1)
    }
  }
})
</script>

<template>

  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="path in getPathsExceptLast">{{ path }}</el-breadcrumb-item>
    <el-breadcrumb-item>
      <el-text tag="b" class="mx-1" size="large">{{ pagePaths[pagePaths.length - 1] }}</el-text>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped>

</style>