<script setup lang="ts">
import { EditPen } from '@element-plus/icons-vue';
import BreadCrumbNav from "@/components/BreadCrumbNav.vue";

</script>

<template>
  <BreadCrumbNav :page-paths="['我的面板', '修改密码']"></BreadCrumbNav>
    <el-card class="info-card" shadow="never">
        <template #header>
            <div class="card-header">
                <el-icon><EditPen /></el-icon>&nbsp;&nbsp;修改密码
            </div>
        </template>
    </el-card>
</template>

<style>

</style>
