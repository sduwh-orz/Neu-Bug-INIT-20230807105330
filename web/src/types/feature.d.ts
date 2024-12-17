import type { Bug } from '@/types/bug.d.ts'
import type { User } from '@/types/user'

export interface Feature {
  id: string
  name: string
  hours: number
  owner: User
  bugs: Bug[]
}