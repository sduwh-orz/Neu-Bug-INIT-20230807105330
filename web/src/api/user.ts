import fakeData from '@/api/fakeData.ts';
import pagination from '@/api/pagination.ts'

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
    query: any,
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
  create: function (user: any) {
    // Do something
  },
  modify: function (user: any) {
    // Do something
  },
  remove: function (id: number) {
    // Do something
  },
  login: function (username: string, password: string) {
    return !!this.all().find(u => {
      return u.username == username && u.password == password
    });

  },
  getLoggedInUser: function () {
    let username = localStorage.getItem('username')
    let password = localStorage.getItem('password')
    return this.all().find(u => {
      return u.username == username && u.password == password
    })
  },
  getAllRealNames: function() {
    return this.all().map(user => ({
      key: user.id,
      label: user.realName,
      value: user.realName
    }));
  }
}