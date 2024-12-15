import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectListView from "@/views/project/ProjectListView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/user',
      redirect: 'list',
      children: [
        {
          path: 'info',
          component: () => import('@/views/user/UserInfoView.vue'),
        },
        {
          path: 'password',
          component: () => import('@/views/user/UserPasswordView.vue'),
        },
        {
          path: 'list',
          component: () => import('@/views/user/UserListView.vue'),
        }
      ]
    },
    {
      path: '/project',
      redirect: 'list',
      children: [
        {
          path: 'list',
          component: () => import('@/views/project/ProjectListView.vue'),
        }
      ]
    },
    {
      path: '/task',
      redirect: 'list',
      children: [
        {
          path: 'list',
          component: () => import('@/views/task/TaskListView.vue'),
        }
      ]
    },
    {
      path: '/bug',
      redirect: 'list',
      children: [
        {
          path: 'list',
          component: () => import('@/views/bug/BugListView.vue'),
        }
      ]
    },
  ],
})

export default router
