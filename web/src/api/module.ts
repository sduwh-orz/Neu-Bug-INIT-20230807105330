export default {
  hoursFormatter: function(row: { features?: { hours: number }[]; hours?: number }): string {
    if (row.features) {
      const totalHours = row.features.reduce((sum: number, feature: { hours: number }) => sum + feature.hours, 0);
      return `${totalHours} 小时`;
    }
    return `${row.hours} 小时`;
  },
  getRowClassName: function({ row }: { row: any }): string {
    if (row.features) {
      return 'module-row';
    }
    return '';
  },
  create: function(projectId: number, module: any) {

  },
  modify: function(id: string, module: any) {

  },
  remove: function(id: string) {

  }
}