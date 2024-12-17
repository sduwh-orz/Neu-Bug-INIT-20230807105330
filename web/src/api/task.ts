import project from '@/api/project.ts'

export default {
  search: function (
    keyword: string,
    page: number,
    size: number
  ) {
    let result = project.search(keyword, page, size);
    result.data.forEach((project: any) => {
      project.features = project.modules.map((module: any) =>
        module.features.length
      ).reduce((sum: number, count: number) =>
        sum + count, 0
      )
      project.developers = new Set(
        project.modules.map((module: any) =>
          module.features.map((module: any) =>
            module.owner
          )
        ).flat().filter((name: string) => name.length > 0)
      ).size
    })
    return result
  },
  modify(
    projectId: number, 
    form: any
  ) {
    // Do something
  }
}