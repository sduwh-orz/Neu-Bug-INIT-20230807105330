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
    projectId: number,
    name: string,
    grade: string,
    module: string,
    feature: string,
    owner: number,
    reporter: number,
    status: string,
    solveType: string,
    page: number,
    size: number
  ) {
    let users = fakeData.users
    let project = fakeData.projects.find(p => {
      return p.id == projectId
    })
    let modules: Module[] = module ? [
      project ?.modules?.find(m => m.name == module)
    ] : project ?.modules
    let features: Feature[] = feature ? modules ?.map(m => {
      return m?.features?.find(f => f.name == feature)
    }) ?.flat() : modules?.map(p => p?.features) ?.flat()
    features = owner ? features ?.filter(f => {
      return f.owner == users.find(u => { return u.id == owner })?.realName
    }) : features
    let filtered: Bug[] = features ?.map(f => {
      return f?.bugs?.map(b => {
        b.owner = f.owner
        return b
      })
    }) ?.flat() ?.filter(f => f)
    filtered = name ? filtered ?.filter(b => {
      return b.name.indexOf(name) > -1
    }) : filtered
    filtered = grade ? filtered ?.filter(b => {
      return b.grade == grade
    }) : filtered
    filtered = reporter ? filtered ?.filter(b => {
      return b.reporter == users.find(u => { return u.id == reporter })?.realName
    }) : filtered
    filtered = status ? filtered ?.filter(b => {
      return b.status == status
    }) : filtered
    filtered = solveType ? filtered ?.filter(b => {
      return b.solveType == solveType
    }) : filtered
    return pagination.getDataWithPageInfo(filtered, page, size)
  },
}