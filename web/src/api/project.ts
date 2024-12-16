import fakeData from '@/api/fakeData.ts'
import pagination from '@/api/pagination.ts'
import type { Project } from '@/types/project'

export default {
  getProjects: function (
      keyword: string,
      page: number,
      size: number
  ) {
    let filtered = keyword ? fakeData.projects.filter((item)=>{
      return item.name.indexOf(keyword) != -1
    }) : fakeData.projects
    return pagination.getDataWithPageInfo(filtered, page, size)
  },
  getProject: function (id: number) {
    return fakeData.projects.find(data => data.id == id)
  },
  getAllProjects: function () {
    return fakeData.projects
  },
  createProject: function (project: Project) {
    // Do something
  },
  editProject: function (project: Project) {
    // Do something
  },
  deleteProject: function (id: number) {
    // Do something
  },
}