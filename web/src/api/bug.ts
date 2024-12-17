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
  gradeColor: new Map([
    ['轻微', 'success'],
    ['次要', 'info'],
    ['一般', 'primary'],
    ['紧急', 'warning'],
    ['严重', 'danger'],
  ]),
  statusColor: new Map([
    ['已关闭', 'warning'],
    ['已解决', 'success'],
    ['开放中', 'primary']
  ]),
  get: function (
    id: string
  ) {
    let result: any
    project.all().forEach(p => {
      p.modules.forEach(m => {
        m?.features?.forEach((f: Feature) => {
          f?.bugs?.forEach((b: Bug) => {
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
      result.bug.records.forEach((record: any, index: number) => {
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
    result.data.forEach((project: any) => {
      project.bugs = project.modules.map((module: any) =>
        module.features.map((feature: any) =>
          feature.bugs ? feature.bugs.length : 0
        )
      ).flat().reduce((sum: number, count: number) =>
        sum + count, 0
      )
    })
    return result
  },
  searchInProject: function (
    now: any,
    page: number,
    size: number
  ) {
    let users = fakeData.users
    let project = fakeData.projects.find(p => {
      return p.id == now.id
    })
    let moduleFound = project ?.modules?.find(m => m.name == now.module)
    let modules: Module[] | undefined = now.module ?
      moduleFound ? [moduleFound] : []
      : project ?.modules
    let features: Feature[] | undefined = now.feature ? modules ?.map(m => {
      return m?.features?.find(f => f.name == now.feature)
    }) ?.flat() ?.filter(f => f != undefined) : modules?.map(p => p?.features) ?.flat()
    features = now.owner ? features ?.filter(f => {
      return f.owner == users.find(u => { return u.id == now.owner })?.realName
    }) : features
    let filtered: Bug[] | undefined = features ?.map(f => {
      return f?.bugs?.map((b: any) => {
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
    filtered = filtered ?.map( (b: any, index) => {
      b.index = index + 1
      return b
    })
    return pagination.getDataWithPageInfo(filtered, page, size)
  },
  create: function (
    bug: any,
    reporter: number
  ) {
    // Do something
  },
  modify: function(
    id: string,
    status: string | undefined,
    solveType: string | undefined,
    comment: string | undefined,
    user: number | undefined,
    info: Bug | any | undefined
  ) {
    // Do something
  },
  stats: function(
    id: number
  ) {
    let p = project.get(id)
    let bugs = this.searchInProject({id: id}, 1, 114514).data
    return {
      grade: this.grades.map(g => {
        return {
          name: g,
          count: bugs.filter((b: any) => {
            return b.grade == g
          }).length
        }
      }),
      status: this.statusTypes.map(s => {
        return {
          name: s,
          count: bugs.filter((b: any) => {
            return b.status == s
          }).length
        }
      }),
      developers: Array.from(new Set(bugs.map((b: any) =>
        b.owner
      ))).map(d => {
        return {
          name: d,
          count: bugs.filter((b: any) => {
            return b.owner == d
          }).length
        }
      }),
      reporters: Array.from(new Set(bugs.map((b: any) =>
        b.reporter
      ))).map(r => {
        return {
          name: r,
          count: bugs.filter((b: any) => {
            return b.reporter == r
          }).length
        }
      }),
    }
  }
}