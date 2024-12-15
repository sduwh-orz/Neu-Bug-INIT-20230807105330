import fakeData from '@/api/fakeData.ts'

export default {
  getProjects: function (
      keyword: string,
      page: number,
      size: number
  ) {
    let filtered = keyword.length == 0 ? fakeData.projects : fakeData.projects.filter((item)=>{
      return item.name.indexOf(keyword) != -1
    })
    let result = {
      data: filtered.slice((this.page - 1) * size, page * size),
      total: filtered.length,
      start: (page - 1) * size + 1,
      end: page * size
    }
    if (result.start > result.total)
      result.start = result.total
    if (result.end > result.total)
      result.end = result.total
    return JSON.stringify(result)
  },
  deleteProject: function (id: number) {
    // Do something
  }
}