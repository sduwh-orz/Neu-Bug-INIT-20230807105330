import project from '@/api/project.ts'

export default {
  search: function (
    keyword: string,
    page: number,
    size: number
  ) {
    let result = project.search(keyword, page, size);
    result.data.forEach((project) => {
      project.features = project.modules.map(module =>
        module.features.length
      ).reduce((sum, count) =>
        sum + count, 0
      )
      project.developers = new Set(
        project.modules.map(module =>
          module.features.map(module =>
            module.owner
          )
        ).flat().filter(name => name.length > 0)
      ).size
    })
    return result
  },
}