export interface Pagination<T> {
  data: T[];
  total: number;
  start: number;
  end: number;
}