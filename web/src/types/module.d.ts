import type {Feature} from '@/types/feature';

export interface Module {
  id: string,
  name: string,
  features: Feature[]
}