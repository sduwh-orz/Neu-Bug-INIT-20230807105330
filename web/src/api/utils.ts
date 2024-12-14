import type { Type } from '@/types/type'
export default {
  emptyType: {
    id: 0,
    name: ''
  } as Type,
  toOptions: function(values: any, noChange=false) {
    let result = values.map((g: any) => {
      return { name: g.name, value: String(g.id) }
    })
    if (noChange)
      return result
    return [{
      name: '全部', value: ''
    }].concat(result)
  },
  getDataWithPageInfo(data: any, page: number, size: number) {
    let start = (page - 1) * size + 1
    if (start > data.length)
      start = data.length
    let end = page * size
    if (end > data.length)
      end = data.length
    return {
      data: data.slice(start - 1, end),
      total: data.length,
      start: start,
      end: end
    }
  }
}