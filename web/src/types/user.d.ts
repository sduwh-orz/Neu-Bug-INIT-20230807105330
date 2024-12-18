import type { Type } from '@/types/type.d.ts'

export interface User {
  id: string
  username: string
  password?: string
  realName: string
  role: Type
  email: string
  isLeader?: boolean
}