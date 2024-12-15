export interface BugRecord {
  id: number,
  type: string,
  before: string,
  after: string,
  handleType: string,
  comment: string,
  owner: string,
  time: Date
}