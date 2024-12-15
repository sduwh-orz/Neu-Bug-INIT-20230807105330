<script setup lang="ts">
import { EditPen } from '@element-plus/icons-vue';
import BreadCrumbNav from "@/components/BreadCrumbNav.vue";

</script>

<template>
  <BreadCrumbNav :page-paths="['我的面板', '修改密码']"></BreadCrumbNav>
    <el-card class="password-card" shadow="never">
        <template #header>
            <div class="card-header">
                <el-icon><EditPen /></el-icon>&nbsp;&nbsp;修改密码
            </div>
        </template>
    </el-card>
</template>

<style>
.password-card {
    margin-top: 20px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.card-header {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
}
</style>
