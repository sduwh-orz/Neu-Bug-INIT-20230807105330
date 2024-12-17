import {$axios} from "@/api/axios.ts";

export default {
  hoursFormatter: function(row: { features?: { hours: number }[]; hours?: number }): string {
    if (row.features) {
      const totalHours = row.features.reduce((sum: number, feature: { hours: number }) => sum + feature.hours, 0)
      return `${totalHours} 小时`
    }
    return `${row.hours} 小时`;
  },
  getRowClassName: function({ row }: { row: any }): string {
    if (row.features) {
      return 'module-row';
    }
    return '';
  },
  create: async function(projectId: string, module: any) {
    module.projectId = projectId
    return (await $axios.post('/module/create', module)).data
  },
  modify: async function(id: string, module: any) {
    module.id = id
    return (await $axios.post('/module/modify', module)).data
  },
  remove: async function(id: string) {
    return (await $axios.get('/module/remove/' + id)).data
  }
}