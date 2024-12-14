import type { BugRecord } from '@/types/bugRecord'
import type { User } from '@/types/user'
import type { Type } from '@/types/type.d.ts'

export interface Bug {
  id: string
  name: string
  grade: Type
  description: string
  reporter: User
  created: string
  modified: string
  status: Type
  solveType: Type
  records: BugRecord[]
}