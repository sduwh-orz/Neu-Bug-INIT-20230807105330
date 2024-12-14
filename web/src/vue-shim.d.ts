import type { User } from '@/types/user'
import { VueRouter, RouteLocationNormalized } from 'vue-router'
import { Store } from 'vuex'

declare module 'vue' {
  interface State {
    user: User
  }

  interface ComponentCustomProperties {
    $store: Store<State>
    $router: VueRouter
    $route: RouteLocationNormalized
  }
}