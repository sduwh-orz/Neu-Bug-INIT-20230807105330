import utils from '@/api/utils.ts'
import { $axios } from '@/api/axios.ts'
import type { User } from '@/types/user'
import type { Response } from '@/types/response'
import type { Pagination } from '@/types/pagination'
import type {Type} from "@/types/type";

export default {
  empty: {
    id: '',
    username: '',
    realName: '',
    role: utils.emptyType,
    email: ''
  } as User,
  get: async function (id: string): Promise<User> {
    return (await $axios.get('/user/' + id)).data
  },
  search: async function (
    query: any,
    page: number,
    size: number
  ): Promise<Pagination<User>> {
    query.page = page
    query.size = size
    return (await $axios.post('/user/search', query)).data
  },
  all: async function (): Promise<User[]> {
    return (await $axios.get('/user/all')).data
  },
  create: async function (user: any): Promise<Response> {
    return (await $axios.post('/user/create', user)).data
  },
  modify: async function (user: any): Promise<Response> {
    return (await $axios.post('/user/modify', user)).data
  },
  remove: async function (id: string): Promise<Response> {
    return (await $axios.get('/user/remove/' + id)).data
  },
  login: async function (username: string, password: string): Promise<Response> {
    return (await $axios.post('/user/login', {
      username: username,
      password: password
    })).data
  },
  logout: async function (): Promise<Response> {
    return (await $axios.get('/user/logout')).data
  },
  password: async function (previous: string, password: string): Promise<Response> {
    return (await $axios.post('/user/password', { previous, password })).data
  },
  getLoggedInUser: async function (): Promise<User> {
    return (await $axios.get('/user/me')).data
  },
  getAllRealNames: async function(): Promise<{key: string, label: string, value: string}[]> {
    const users = await this.all();
    return users.map(user => ({
      key: user.id,
      label: user.realName,
      value: user.id
    }))
  },
  getRoles: async function (): Promise<Type[]> {
    return (await $axios.get('/user/roles')).data
  },
}