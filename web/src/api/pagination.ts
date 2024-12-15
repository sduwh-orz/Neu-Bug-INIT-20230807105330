export default {
  getDataWithPageInfo(data, page, size) {
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