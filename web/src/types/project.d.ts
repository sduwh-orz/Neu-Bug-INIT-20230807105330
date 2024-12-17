import type { User } from '@/types/user'

export interface Project {
  id: string
  keyword: string
  name: string
  description: string
  owner: User
  created: string
  totalFeatures?: number
  totalDevelopers?: number
  modules: Module[]
}