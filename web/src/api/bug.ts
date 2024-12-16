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
  get: function (
    id: string
  ) {
    let result = undefined
    project.all().forEach(p => {
      p.modules.forEach(m => {
        m?.features?.forEach(f => {
          f?.bugs?.forEach(b => {
            if (b.id == id) {
              result = {
                bug: b,
                project: p,
                module: m,
                feature: f
              }
            }
          })
        })
      })
    })
    if (result) {
      result.bug.records.forEach((record, index) => {
        record.index = index + 1
      })
      result.bug.lastModified = result.bug.records[0] ? result.bug.records[0].time: result.bug.created

    }
    return result
  },
  search: function (
    keyword: string,
    page: number,
    size: number
  ) {
    let result = project.search(keyword, page, size)
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
  searchInProject: function (
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
    filtered = filtered.map( (b, index) => {
      b.index = index + 1
      return b
    })
    return pagination.getDataWithPageInfo(filtered, page, size)
  },
  create: function (
    bug,
    reporter: number
  ) {
    // Do something
  },
  modify: function(
    id: string,
    status: string,
    solveType: string,
    comment: string,
    user: number,
    info: Bug
  ) {
    // Do something
  },
}