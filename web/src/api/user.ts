import fakeData from '@/api/fakeData.ts';
import pagination from '@/api/pagination.ts'
import type { User } from '@/types/user'

export default {
  roles: [
    {
      'name': '普通用户',
      'value': '普通用户'
    },
    {
      'name': '管理员',
      'value': '管理员'
    }
  ],
  rolesForQuery: [
    {
      'name': '全部',
      'value': ''
    },
    {
      'name': '普通用户',
      'value': '普通用户'
    },
    {
      'name': '管理员',
      'value': '管理员'
    }
  ],
  getData: function (
    username: string,
    realName: string,
    role: string,
    email: string,
    page: number,
    size: number
  ) {
    let filtered = fakeData.users
    filtered = username.length == 0 ? filtered : filtered.filter(user => {
      return user.username.indexOf(username) != -1
    })
    filtered = realName.length == 0 ? filtered : filtered.filter(user => {
      return user.realName.indexOf(realName) != -1
    })
    filtered = role.length == 0 ? filtered : filtered.filter(user => {
      return user.role == role
    })
    filtered = role.length == 0 ? filtered : filtered.filter(user => {
      return user.email.indexOf(email) != -1
    })
    return pagination.getDataWithPageInfo(filtered, page, size)
  },
  getAllUsers: function () {
    return fakeData.users
  },
  createUser: function (user: User) {
    // Do something
  },
  deleteUser: function (id: number) {
    // Do something
  },
}