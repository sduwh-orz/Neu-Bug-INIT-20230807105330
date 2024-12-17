import type { Type } from '@/types/type.d.ts'
import type { User } from '@/types/user'
import type { BugRecordType } from '@/types/bugRecordType'

export interface BugRecord {
  id: string
  type: BugRecordType
  before: Type
  after: Type
  handleType: Type
  comment: string
  owner: User
  time: string
}