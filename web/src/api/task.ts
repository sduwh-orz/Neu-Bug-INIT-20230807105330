import {$axios} from "@/api/axios.ts";

export default {
  search: async function (
    name: string,
    page: number,
    size: number
  ) {
    return (await $axios.post('/project/task_search',{
      name, page, size
    })).data
  },
  modify: async function (
    projectId: string,
    modules: any
  ) {
    return (await $axios.post('/feature/assign',{
      projectId, modules
    })).data
  }
}