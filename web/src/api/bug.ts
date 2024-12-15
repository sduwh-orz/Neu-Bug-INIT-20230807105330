import project from '@/api/project.ts'

export default {
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
}