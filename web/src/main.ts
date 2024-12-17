import './assets/main.css'

import { createApp } from 'vue'
import { createStore } from 'vuex'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import type {User} from '@/types/user'
import user from '@/api/user.ts'

const store = createStore({
  state () {
    return {
      user: null,
    }
  },
  mutations: {
    setUser (state: { user: User }, user: User | null) {
      state.user = user
    },
    clearUser (state: { user: User }) {
      state.user = null
    }
  },
  actions: {
    async fetchUser({ commit }) {
      try {
        const result = await user.getLoggedInUser()
        commit('setUser', result)
      } catch (error) {
        commit('setUser', null)
      }
    },
  },
})

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
