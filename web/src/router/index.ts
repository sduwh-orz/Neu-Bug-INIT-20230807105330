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
      component: () => import('@/views/LogoutView.vue'),
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
        },
        {
          path: 'create',
          component: () => import('@/views/user/UserCreateView.vue'),
        },
        {
          path: 'edit',
          component: () => import('@/views/user/UserEditView.vue'),
        },
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
        },
      ]
    },
    {
      path: '/task',
      redirect: 'list',
      children: [
        {
          path: 'list',
          component: () => import('@/views/task/TaskListView.vue'),
        },
        {
          path: 'edit',
          component: () => import('@/views/task/TaskEditView.vue'),
        },
      ]
    },
    {
      path: '/bug',
      redirect: 'list',
      children: [
        {
          path: 'list',
          component: () => import('@/views/bug/BugProjectListView.vue'),
        },
        {
          path: 'stats',
          component: () => import('@/views/bug/BugStatsView.vue'),
        },
        {
          path: 'bugs',
          component: () => import('@/views/bug/BugListView.vue'),
        },
        {
          path: 'create',
          component: () => import('@/views/bug/BugCreateView.vue'),
        },
        {
          path: 'edit',
          component: () => import('@/views/bug/BugEditView.vue'),
        },
        {
          path: 'info',
          component: () => import('@/views/bug/BugInfoView.vue'),
        }
      ]
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isLogged = localStorage.getItem('loggedIn')
  if (to.matched.some(record => record.meta.notLoggedIn == null) && !isLogged) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router
