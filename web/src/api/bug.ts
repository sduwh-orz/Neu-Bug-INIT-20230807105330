import user from '@/api/user.ts'
import utils from '@/api/utils.ts'
import type { Bug } from '@/types/bug'
import type { BugRecord } from '@/types/bugRecord'
import type { Type } from '@/types/type'
import { $axios } from '@/api/axios.ts'

export default {
  gradeColor: new Map([
    ['轻微', 'success'],
    ['次要', 'info'],
    ['一般', 'primary'],
    ['紧急', 'warning'],
    ['严重', 'danger'],
  ]),
  statusColor: new Map([
    ['已关闭', 'warning'],
    ['已解决', 'success'],
    ['开放中', 'primary']
  ]),
  emptyRecord: {
    id: '',
    type: {
      id: '',
      name: ''
    },
    before: utils.emptyType,
    after: utils.emptyType,
    handleType: utils.emptyType,
    comment: '',
    owner: user.empty,
    time: '',
  } as BugRecord,
  empty: {
    id: '',
    name: '',
    grade: utils.emptyType,
    description: '',
    reporter: user.empty,
    created: '',
    modified: '',
    status: utils.emptyType,
    solveType: utils.emptyType,
    records: [] as BugRecord[]
  } as Bug,
  get: async function (id: string) {
    return (await $axios.get('/bug/' + id)).data
  },
  projectSearch: async function (
    name: string,
    page: number,
    size: number
  ) {
    return (await $axios.post('/project/bug_search',{
      name, page, size
    })).data
  },
  searchInProject: async function (
    now: any,
    page: number,
    size: number
  ) {
    now.page = page
    now.size = size

    for (let key in now) {
      if (now[key] === '') {
        now[key] = undefined
      }
    }
    return (await $axios.post('/bug/search', now)).data
  },
  create: async function (
    bug: any,
  ) {
    return (await $axios.post('/bug/create', bug)).data
  },
  modify: async function(
    id: string,
    comment: string | undefined,
    data: Bug | any | undefined
  ) {
    data.id = id
    data.comment = comment
    return (await $axios.post('/bug/modify', data)).data
  },
  solve: async function(
    id: string,
    solveType: string,
    comment: string,
  ) {
    return (await $axios.post('/bug/solve', {
      id, solveType, comment
    })).data
  },
  close: async function(
    id: string,
    comment: string,
  ) {
    return (await $axios.post('/bug/close', {
      id, comment
    })).data
  },
  comment: async function(
    id: string,
    comment: string,
  ) {
    return (await $axios.post('/bug/comment', {
      id, comment
    })).data
  },
  stats: async function(
    id: string
  ) {
    return (await $axios.get('/bug/stats/' + id)).data
  },
  getGrades: async function (): Promise<Type[]> {
    return (await $axios.get('/bug/grades')).data
  },
  getStatusTypes: async function (): Promise<Type[]> {
    return (await $axios.get('/bug/status')).data
  },
  getSolveTypes: async function (): Promise<Type[]> {
    return (await $axios.get('/bug/solve_types')).data
  },
}