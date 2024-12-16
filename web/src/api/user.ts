import fakeData from '@/api/fakeData.ts';
import pagination from '@/api/pagination.ts'
import type { User } from '@/types/user'

export default {
  roles: ['普通用户', '管理员'],
  getData: function (
    query,
    page: number,
    size: number
  ) {
    let filtered = fakeData.users
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
  getAllUsers: function () {
    return fakeData.users
  },
  getUserById: function (id: number) {
    if (id)
      return fakeData.users.find(user => {
        return user.id == id
      })
    return undefined
  },
  createUser: function (user: User) {
    // Do something
  },
  editUser: function (user: User) {
    // Do something
  },
  deleteUser: function (id: number) {
    // Do something
  },
  getLoggedInUser: function () {
    return fakeData.users.find(u => { return u.realName == '管理员' })
  }
}