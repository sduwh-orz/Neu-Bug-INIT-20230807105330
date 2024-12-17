export default {
  toOptions: function(values: any, noChange=false) {
    let result = values.map((g: any) => {
      return { name: g, value: g }
    })
    if (noChange)
      return result
    return [{
      name: '全部', value: ''
    }].concat(result)
  }
}