<script setup lang="ts">
import { CreditCard, Message, Tickets, UserFilled } from '@element-plus/icons-vue';
import { reactive } from 'vue';

const currentUser = reactive({
    username: 'admin',
    realName: '管理员',
    role: '管理员',
    email: 'admin@126.com'
})

const username = localStorage.getItem('username') || '默认用户名';
</script>

<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item>我的面板</el-breadcrumb-item>
        <el-breadcrumb-item>
            <el-text tag="b" class="mx-1" size="large">用户信息</el-text>
        </el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="user-info-card" shadow="never">
        <template #header>
            <div class="card-header">
                <el-icon><Tickets /></el-icon>&nbsp;&nbsp;用户信息
            </div>
        </template>
        <el-descriptions 
        border 
        :column="1" 
        label-width="20%" 
        style="margin-top: 10px;"
        >
            <el-descriptions-item>
                <template #label>
                    <el-icon><User /></el-icon>&nbsp;&nbsp;用户名
                </template>
                {{ username }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <el-icon><CreditCard /></el-icon>&nbsp;&nbsp;真实姓名
                </template>
                {{ currentUser.realName }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <el-icon><Guide /></el-icon>&nbsp;&nbsp;角色
                </template>
                {{ currentUser.role }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <el-icon><Message /></el-icon>&nbsp;&nbsp;邮箱
                </template>
                {{ currentUser.email }}
            </el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>

<style scoped>
.user-info-card {
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
