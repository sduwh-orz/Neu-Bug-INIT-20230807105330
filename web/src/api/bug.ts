import project from '@/api/project.ts'
import fakeData from '@/api/fakeData.ts'
import pagination from '@/api/pagination.ts'
import type {Project} from '@/types/project'
import type {Module} from '@/types/module'
import type {Feature} from '@/types/feature'
import type {Bug} from '@/types/bug'

export default {
  statusTypes: [
    '已关闭', '已解决', '开放中'
  ],
  statusTypesForQuery: [
    '全部', '已关闭', '已解决', '开放中'
  ],
  solveTypes: [
    '未解决', '解决', '不是错误', '错误重复', '无法重现'
  ],
  solveTypesForQuery: [
    '全部', '未解决', '解决', '不是错误', '错误重复', '无法重现'
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
    owner: string,
    reporter: string,
    status: string,
    solveType: string,
    page: number,
    size: number
  ) {
    let project = fakeData.projects.find(p => {
      return p.id == projectId
    })
    console.log(project)
    let modules: Module[] = module ? [
      project ?.modules?.find(m => m.name == module)
    ] : project ?.modules
    console.log(modules)
    let features: Feature[] = feature ? modules ?.map(m => {
      return m?.features?.find(f => f.name == feature)
    }) ?.flat() : modules?.map(p => p?.features) ?.flat()
    console.log(features)
    features = owner ? features ?.filter(f => {
      return f.owner == owner
    }) : features
    console.log(features)
    let filtered: Bug[] = features ?.map(f => {
      return f?.bugs?.map(b => {
        b.owner = f.owner
        return b
      })
    }) ?.flat() ?.filter(f => f)
    console.log(filtered)
    filtered = name ? filtered ?.filter(b => {
      return b.name.indexOf(name) > -1
    }) : filtered
    console.log(filtered)
    filtered = grade ? filtered ?.filter(b => {
      return b.grade == grade
    }) : filtered
    console.log(filtered)
    filtered = reporter ? filtered ?.filter(b => {
      return b.reporter == reporter
    }) : filtered
    console.log(filtered)
    filtered = status ? filtered ?.filter(b => {
      return b.status == status
    }) : filtered
    console.log(filtered)
    filtered = solveType ? filtered ?.filter(b => {
      return b.solveType == solveType
    }) : filtered
    console.log(filtered)
    return pagination.getDataWithPageInfo(filtered, page, size)
  },
}