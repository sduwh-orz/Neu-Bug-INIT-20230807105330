export default {
  toOptions: function(values, noChange=false) {
    let result = values.map(g => {
      return { name: g, value: g }
    })
    if (noChange)
      return result
    return [{
      name: '全部', value: ''
    }].concat(result)
  }
}