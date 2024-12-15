import project from '@/api/project.ts'

export default {
  getData: function (
    keyword: string,
    page: number,
    size: number
  ) {
    let result = project.getProjects(keyword, page, size);
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