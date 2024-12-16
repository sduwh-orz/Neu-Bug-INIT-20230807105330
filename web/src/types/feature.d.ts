import type {Bug} from "@/types/bug.d.ts";

export interface Feature {
  id: string,
  name: string,
  hours: number,
  owner: string,
  bugs: Bug[]
}