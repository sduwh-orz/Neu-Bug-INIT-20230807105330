import fakeData from '@/api/fakeData.ts'
import pagination from '@/api/pagination.ts'
import type {Project} from '@/types/project'

export default {
  getProject: function (id: number) {
    return this.all().find(data => data.id == id)
  },
  search: function (
      keyword: string,
      page: number,
      size: number
  ) {
    let filtered = keyword ? this.all().filter((item)=>{
      return item.name.indexOf(keyword) != -1
    }) : fakeData.projects
    return pagination.getDataWithPageInfo(filtered, page, size)
  },
  all: function () {
    let result = fakeData.projects
    result.forEach(project => {
      project.modules.forEach(module => {
        module.id = module.name
        module.features.forEach(feature => {
          feature.id = feature.name
        })
      })
    })
    return result
  },
  create: function (project: Project) {
    // Do something
  },
  modify: function (project: Project) {
    // Do something
  },
  remove: function (id: number) {
    // Do something
  },
}