import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { Operation, OfficeBuilding, List, Aim, Avatar } from '@element-plus/icons-vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/HomeView.vue'),
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
    meta: {
      title: '我的面板',
      icon: Operation,
      hidden: false,
    },
    children: [
      {
        path: 'info',
        component: () => import('@/views/user/UserInfoView.vue'),
        meta: {
          title: '用户信息',
          hidden: false
        },
      },
      {
        path: 'password',
        component: () => import('@/views/user/UserPasswordView.vue'),
        meta: {
          title: '修改密码',
          hidden: false
        }
      },
    ],
  },
  {
    path: '/project',
    redirect: 'list',
    meta: {
      title: '项目管理',
      icon: OfficeBuilding,
      hidden: false,
      requiresLeader: true
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/project/ProjectListView.vue'),
        meta: {
          title: '项目管理',
          hidden: false,
        }
      },
      {
        path: 'create',
        component: () => import('@/views/project/ProjectCreateView.vue'),
        meta: {
          title: '项目添加',
        }
      },
      {
        path: 'modules',
        component: () => import('@/views/project/ProjectModulesView.vue'),
        meta: {
          title: '模块管理',
        }
      },
      {
        path: 'edit',
        component: () => import('@/views/project/ProjectEditView.vue'),
        meta: {
          title: '项目修改',
        }
      },
    ]
  },
  {
    path: '/task',
    redirect: 'list',
    meta: {
      title: '任务分配',
      icon: List,
      hidden: false,
      requiresLeader: true
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/task/TaskListView.vue'),
        meta: {
          title: '任务分配',
          hidden: false,
        }
      },
      {
        path: 'edit',
        component: () => import('@/views/task/TaskEditView.vue'),
        meta: {
          title: '任务分配',
        }
      },
    ]
  },
  {
    path: '/bug',
    redirect: 'list',
    meta: {
      title: 'Bug 管理',
      icon: Aim,
      hidden: false,
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/bug/BugProjectListView.vue'),
        meta: {
          title: 'Bug 管理',
          hidden: false
        }
      },
      {
        path: 'stats',
        component: () => import('@/views/bug/BugStatsView.vue'),
        meta: {
          title: 'Bug 统计',
        }
      },
      {
        path: 'bugs',
        component: () => import('@/views/bug/BugListView.vue'),
        meta: {
          title: 'Bug 管理',
        }
      },
      {
        path: 'create',
        component: () => import('@/views/bug/BugCreateView.vue'),
        meta: {
          title: 'Bug 添加',
        }
      },
      {
        path: 'edit',
        component: () => import('@/views/bug/BugEditView.vue'),
        meta: {
          title: 'Bug 修改',
        }
      },
      {
        path: 'info',
        component: () => import('@/views/bug/BugInfoView.vue'),
        meta: {
          title: 'Bug 查看',
        }
      }
    ]
  },
  {
    path: '/user_manage',
    redirect: 'list',
    meta: {
      title: '用户管理',
      icon: Avatar,
      hidden: false,
      requiresAdmin: true
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/user/UserListView.vue'),
        meta: {
          title: '用户管理',
          hidden: false,
        }
      },
      {
        path: 'create',
        component: () => import('@/views/user/UserCreateView.vue'),
        meta: {
          title: '用户添加',
        }
      },
      {
        path: 'edit',
        component: () => import('@/views/user/UserEditView.vue'),
        meta: {
          title: '用户修改',
        }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
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
export { routes }