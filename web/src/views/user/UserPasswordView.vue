<script setup lang="ts">
import { EditPen } from '@element-plus/icons-vue';

</script>

<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item class="breadcrumb-item">我的面板</el-breadcrumb-item>
        <el-breadcrumb-item class="breadcrumb-item" >
            <el-text tag="b" class="mx-1" size="large">修改密码</el-text>
        </el-breadcrumb-item>
    </el-breadcrumb>
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
