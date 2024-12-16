import fakeData from '@/api/fakeData.ts';
import pagination from '@/api/pagination.ts'
import type { User } from '@/types/user'

export default {
  roles: ['普通用户', '管理员'],
  get: function (id: number) {
    if (id)
      return this.all().find(user => {
        return user.id == id
      })
    return undefined
  },
  search: function (
    query,
    page: number,
    size: number
  ) {
    let filtered = this.all()
    filtered = query.username ? filtered.filter(user => {
      return user.username.indexOf(query.username) != -1
    }): filtered
    filtered = query.realName ? filtered.filter(user => {
      return user.realName.indexOf(query.realName) != -1
    }): filtered
    filtered = query.role ? filtered.filter(user => {
      return user.role == query.role
    }): filtered
    filtered = query.email ? filtered.filter(user => {
      return user.email.indexOf(query.email) != -1
    }): filtered
    return pagination.getDataWithPageInfo(filtered, page, size)
  },
  all: function () {
    return fakeData.users
  },
  create: function (user: User) {
    // Do something
  },
  modify: function (user: User) {
    // Do something
  },
  remove: function (id: number) {
    // Do something
  },
  getLoggedInUser: function () {
    return this.all().find(u => { return u.realName == '管理员' })
  }
}