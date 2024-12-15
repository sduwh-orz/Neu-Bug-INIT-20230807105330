import type {BugRecord} from "@/types/bugRecord";

export interface Bug {
  id: string,
  name: string,
  grade: string,
  description: string,
  reporter: string,
  created: Date,
  status: string,
  solveType: string,
  records: BugRecord[]
}