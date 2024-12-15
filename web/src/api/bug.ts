import project from '@/api/project.ts'
import fakeData from '@/api/fakeData.ts'
import pagination from '@/api/pagination.ts'
import type {Module} from '@/types/module'
import type {Feature} from '@/types/feature'
import type {Bug} from '@/types/bug'

export default {
  grades: [
    '轻微', '次要', '一般', '紧急', '严重'
  ],
  statusTypes: [
    '已关闭', '已解决', '开放中'
  ],
  solveTypes: [
    '未解决', '解决', '不是错误', '错误重复', '无法重现'
  ],
  getData: function (
    keyword: string,
    page: number,
    size: number
  ) {
    let result = project.getProjects(keyword, page, size);
    result.data.forEach((project) => {
      project.bugs = project.modules.map(module =>
        module.features.map(feature =>
          feature.bugs ? feature.bugs.length : 0
        )
      ).flat().reduce((sum, count) =>
        sum + count, 0
      )
    })
    return result
  },
  searchData: function (
    now,
    page: number,
    size: number
  ) {
    let users = fakeData.users
    let project = fakeData.projects.find(p => {
      return p.id == now.id
    })
    let modules: Module[] = now.module ? [
      project ?.modules?.find(m => m.name == now.module)
    ] : project ?.modules
    let features: Feature[] = now.feature ? modules ?.map(m => {
      return m?.features?.find(f => f.name == now.feature)
    }) ?.flat() : modules?.map(p => p?.features) ?.flat()
    features = now.owner ? features ?.filter(f => {
      return f.owner == users.find(u => { return u.id == now.owner })?.realName
    }) : features
    let filtered: Bug[] = features ?.map(f => {
      return f?.bugs?.map(b => {
        b.owner = f.owner
        return b
      })
    }) ?.flat() ?.filter(f => f)
    filtered = now.name ? filtered ?.filter(b => {
      return b.name.indexOf(now.name) > -1
    }) : filtered
    filtered = now.grade ? filtered ?.filter(b => {
      return b.grade == now.grade
    }) : filtered
    filtered = now.reporter ? filtered ?.filter(b => {
      return b.reporter == users.find(u => { return u.id == now.reporter })?.realName
    }) : filtered
    filtered = now.status ? filtered ?.filter(b => {
      return b.status == now.status
    }) : filtered
    filtered = now.solveType ? filtered ?.filter(b => {
      return b.solveType == now.solveType
    }) : filtered
    return pagination.getDataWithPageInfo(filtered, page, size)
  },
  updateBug: function(
    id: string,
    status: string,
    solveType: string,
    comment: string,
    user: number
  ) {

  },
}