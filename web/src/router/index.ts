import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/project/list',
    },
    {
      path: '/login',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        notLoggedIn: true,
      }
    },
    {
      path: '/logout',
      redirect: '/login',
      meta: {
        notLoggedIn: true,
      }
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
        },
        {
          path: 'create',
          component: () => import('@/views/project/ProjectCreateView.vue'),
        },
        {
          path: 'modules',
          component: () => import('@/views/project/ProjectModulesView.vue'),
        },
        {
          path: 'edit',
          component: () => import('@/views/project/ProjectEditView.vue'),
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
