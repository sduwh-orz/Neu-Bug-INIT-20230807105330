import {$axios} from "@/api/axios.ts";

export default {
  create: async function(moduleId: string, feature: any) {
    feature.module = moduleId
    return (await $axios.post('/feature/create', feature)).data
  },
  modify: async function(id: string, feature: any) {
    feature.id = id
    return (await $axios.post('/feature/modify', feature)).data
  },
  remove: async function(id: string) {
    return (await $axios.get('/feature/remove/' + id)).data
  }
}