import type { Project } from '@/types/project'
import type { Module } from '@/types/module'
import type { Response } from '@/types/response'
import type { Pagination } from '@/types/pagination'
import {$axios} from '@/api/axios.ts'
import user from '@/api/user.ts'

export default {
  empty: {
    id: '',
    keyword: '',
    name: '',
    description: '',
    owner: user.empty,
    created: '',
    totalFeatures: null,
    totalDevelopers: null,
    modules: [] as Module[],
  } as Project,
  get: async function (id: string): Promise<Project> {
    return (await $axios.get('/project/' + id)).data
  },
  search: async function (
      name: string,
      page: number,
      size: number
  ): Promise<Pagination<any>> {
    return (await $axios.post('/project/search',{
      name, page, size
    })).data
  },
  create: async function (project: any): Promise<Response> {
    return (await $axios.post('/project/create', project)).data
  },
  modify: async function (project: any): Promise<Response> {
    return (await $axios.post('/project/modify', project)).data
  },
  remove: async function (id: string): Promise<Response> {
    return (await $axios.get('/project/remove/' + id)).data
  },
}