import fakeData from '@/api/fakeData.ts'
import pagination from "@/api/pagination.ts";

export default {
  getProjects: function (
      keyword: string,
      page: number,
      size: number
  ) {
    let filtered = keyword.length == 0 ? fakeData.projects : fakeData.projects.filter((item)=>{
      return item.name.indexOf(keyword) != -1
    })
    return pagination.getDataWithPageInfo(filtered, page, size)
  },
  getProject: function (id: number) {
    return fakeData.projects.find(data => data.id == id)
  },
  deleteProject: function (id: number) {
    // Do something
  }
}