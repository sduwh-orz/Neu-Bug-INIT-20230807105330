import type {Project} from '@/types/project'
import type {User} from '@/types/user'

const projects: Project[] = [
  {
    id: 1,
    keyword: 'blog',
    name: '个人博客系统',
    description: '个人博客系统',
    owner: '李开發',
    created: '2016-07-25',
    modules: [
      {
        name: 'bugs',
        features: [
          {
            name: 'bss',
            hours: 1,
            owner: '管理员'
          },
        ],
      },
      {
        name: '首页',
        features: [
          {
            name: '导航栏',
            hours: 1,
            owner: '李开發',
            bugs: [
              {
                id: 'BE3A5AF274AA4A6982A9E85ECD8C5180',
                name: '【首页-导航栏】没有对齐',
                grade: '次要',
                description: 'a',
                reporter: '管理员',
                created: Date.parse('2016-08-08 15:43:34'),
                status: '已解决',
                solveType: '解决',
                records: [
                  {
                    id: 1,
                    type: '解决问题',
                    before: '已解决',
                    after: '已解决',
                    handleType: '解决',
                    comment: '修正OK，请验证。',
                    owner: '管理员',
                    time: Date.parse('2021/5/31 14:22')
                  },
                  {
                    id: 2,
                    type: '解决问题',
                    before: '已解决',
                    after: '已解决',
                    handleType: '解决',
                    comment: 'Bug已修正完成。',
                    owner: '管理员',
                    time: Date.parse('2021/5/31 14:21')
                  },
                  {
                    id: 3,
                    type: '解决问题',
                    before: '已解决',
                    after: '已解决',
                    handleType: '错误重复',
                    comment: '',
                    owner: '管理员',
                    time: Date.parse('2021/5/31 13:43')
                  },
                  {
                    id: 4,
                    type: '编辑bug',
                    before: '已解决',
                    after: '已解决',
                    handleType: '',
                    comment: 'a',
                    owner: '管理员',
                    time: Date.parse('2019/7/24 14:38')
                  },
                  {
                    id: 5,
                    type: '编辑bug',
                    before: '已解决',
                    after: '已解决',
                    handleType: '',
                    comment: 'aa',
                    owner: '管理员',
                    time: Date.parse('2019/7/24 14:38')
                  },
                  {
                    id: 6,
                    type: '解决问题',
                    before: '已解决',
                    after: '已解决',
                    handleType: '不是错误',
                    comment: '',
                    owner: '管理员',
                    time: Date.parse('2018/7/7 10:22')
                  },
                  {
                    id: 7,
                    type: '写备注',
                    before: '已解决',
                    after: '已解决',
                    handleType: '',
                    comment: 'tt',
                    owner: '管理员',
                    time: Date.parse('2018/6/27 0:24')
                  },
                  {
                    id: 8,
                    type: '解决问题',
                    before: '开放中',
                    after: '已解决',
                    handleType: '解决',
                    comment: '',
                    owner: '管理员',
                    time: Date.parse('2018/6/25 9:53')
                  },
                  {
                    id: 9,
                    type: '重新开启问题',
                    before: '已关闭',
                    after: '开放中',
                    handleType: '',
                    comment: '',
                    owner: '管理员',
                    time: Date.parse('2018/6/23 16:33')
                  },
                  {
                    id: 10,
                    type: '关闭问题',
                    before: '已解决',
                    after: '已关闭',
                    handleType: '',
                    comment: '',
                    owner: '管理员',
                    time: Date.parse('2018/6/23 16:33')
                  }
                ]
              }
            ]
          },
          {
            name: '广告栏',
            hours: 1,
            owner: '张黎',
            bugs: [
              {
                id: 'BE5372FE68F34AB48BF2D66A91BFA859',
                name: '广告栏图片和文字显示位置不正确',
                grade: '轻微',
                description: '广告栏图片和文字显示位置不正确，出现了偏离。',
                reporter: '管理员',
                created: Date.parse('2018-06-21 09:59:42'),
                status: '已解决',
                solveType: '错误重复',
                records: [
                  {
                    id: 1,
                    type: '解决问题',
                    before: '已解决',
                    after: '已解决',
                    handleType: '错误重复',
                    comment: '',
                    owner: '管理员',
                    time: Date.parse('2021/5/31 13:43')
                  },
                  {
                    id: 2,
                    type: '编辑bug',
                    before: '已解决',
                    after: '已解决',
                    handleType: '',
                    comment: '',
                    owner: '管理员',
                    time: Date.parse('2021/5/31 13:32')
                  },
                  {
                    id: 3,
                    type: '编辑bug',
                    before: '已解决',
                    after: '已解决',
                    handleType: '',
                    comment: '',
                    owner: '管理员',
                    time: Date.parse('2018/6/25 10:34')
                  },
                  {
                    id: 4,
                    type: '编辑bug',
                    before: '已解决',
                    after: '已解决',
                    handleType: '',
                    comment: '',
                    owner: '管理员',
                    time: Date.parse('2018/6/25 10:34')
                  },
                  {
                    id: 5,
                    type: '编辑bug',
                    before: '已解决',
                    after: '已解决',
                    handleType: '',
                    comment: '',
                    owner: '管理员',
                    time: Date.parse('2018/6/25 10:15')
                  },
                  {
                    id: 6,
                    type: '编辑bug',
                    before: '已解决',
                    after: '已解决',
                    handleType: '',
                    comment: '',
                    owner: '管理员',
                    time: Date.parse('2018/6/25 10:14')
                  },
                  {
                    id: 7,
                    type: '编辑bug',
                    before: '已解决',
                    after: '已解决',
                    handleType: '',
                    comment: 'test备注',
                    owner: '管理员',
                    time: Date.parse('2018/6/25 10:12')
                  },
                  {
                    id: 8,
                    type: '解决问题',
                    before: '已解决',
                    after: '已解决',
                    handleType: '不是错误',
                    comment: '',
                    owner: '管理员',
                    time: Date.parse('2018/6/25 9:52')
                  },
                  {
                    id: 9,
                    type: '解决问题',
                    before: '开放中',
                    after: '已解决',
                    handleType: '解决',
                    comment: 'caihongtestwhe',
                    owner: '管理员',
                    time: Date.parse('2018/6/25 9:52')
                  }
                ]
              }
            ]
          },
        ],
      },
      {
        name: '登录',
        features: [
          {
            name: '密码修改',
            hours: 2,
            owner: ''
          },
          {
            name: '登录',
            hours: 2,
            owner: '王晗',
            bugs: [
              {
                id: '16EC656174B84A9BA3F496AC010602D7',
                name: '测试2',
                grade: '严重',
                description: 'aaa',
                reporter: '管理员',
                created: Date.parse('2019-07-24 14:39:15'),
                status: '开放中',
                solveType: '未解决',
                records: []
              },
              {
                id: '39626D10854041E998F4B82488365818',
                name: '登录失败提示信息不正确',
                grade: '次要',
                description: '登录失败提示信息不正确，多语言描述不正确，英文和日文。',
                reporter: '管理员',
                created: Date.parse('2018-06-26 17:35:02'),
                status: '开放中',
                solveType: '解决',
                records: [
                  {
                    id: 1,
                    type: '编辑bug',
                    before: '开放中',
                    after: '开放中',
                    handleType: '',
                    comment: '',
                    owner: '管理员',
                    time: Date.parse('2021-05-31 13:35:43')
                  },
                  {
                    id: 2,
                    type: '重新开启问题',
                    before: '已关闭',
                    after: '开放中',
                    handleType: '',
                    comment: 'Bug再现。',
                    owner: '管理员',
                    time: Date.parse('2021/5/31 13:34')
                  },
                  {
                    id: 3,
                    type: '关闭问题',
                    before: '开放中',
                    after: '已关闭',
                    handleType: '',
                    comment: 's',
                    owner: '管理员',
                    time: Date.parse('2018/7/2 21:45')
                  },
                  {
                    id: 4,
                    type: '重新开启问题',
                    before: '已关闭',
                    after: '开放中',
                    handleType: '',
                    comment: 's',
                    owner: '管理员',
                    time: Date.parse('2018/7/2 21:45')
                  },
                  {
                    id: 5,
                    type: '关闭问题',
                    before: '已解决',
                    after: '已关闭',
                    handleType: '',
                    comment: 's',
                    owner: '管理员',
                    time: Date.parse('2018/7/2 21:44')
                  },
                  {
                    id: 6,
                    type: '写备注',
                    before: '已解决',
                    after: '已解决',
                    handleType: '',
                    comment: 'x',
                    owner: '管理员',
                    time: Date.parse('2018/7/2 21:44')
                  },
                  {
                    id: 7,
                    type: '解决问题',
                    before: '已解决',
                    after: '已解决',
                    handleType: '解决',
                    comment: 's',
                    owner: '管理员',
                    time: Date.parse('2018/7/2 21:44')
                  },
                  {
                    id: 8,
                    type: '解决问题',
                    before: '已解决',
                    after: '已解决',
                    handleType: '解决',
                    comment: 's',
                    owner: '管理员',
                    time: Date.parse('2018/7/2 21:44')
                  },
                  {
                    id: 9,
                    type: '解决问题',
                    before: '已解决',
                    after: '已解决',
                    handleType: '错误重复',
                    comment: 'ss',
                    owner: '管理员',
                    time: Date.parse('2018/7/2 21:44')
                  },
                  {
                    id: 10,
                    type: '编辑bug',
                    before: '已解决',
                    after: '已解决',
                    handleType: '',
                    comment: 'dd',
                    owner: '管理员',
                    time: Date.parse('2018/6/27 23:44')
                  }
                ]
              }
            ],
          },
        ]
      },
      {
        name: '测试模块',
        features: [],
      },
    ],
  }, {
    id: 2,
    keyword: 'Bug',
    name: '软件缺陷管理系统',
    description: '软件缺陷管理系统',
    owner: '张景丽',
    created: '2016-07-27',
    modules: [
      {
        name: '项目管理',
        features: [
          {
            name: '项目列表',
            hours: 2,
            owner: 'Json',
          },
          {
            name: '项目添加',
            hours: 2,
            owner: 'LiLei',
          },
        ],
      },
      {
        name: 'bug管理',
        features: [
          {
            name: 'bug添加', hours: 2, owner: '张黎'
          },
          {
            name: 'bug解决', hours: 2, owner: '张景丽'
          },
        ],
      },
    ],
  }, {
    id: 3,
    keyword: '删除项目',
    name: '测试删除项目',
    description: '测试删除项目',
    owner: '管理员',
    created: '2021-05-31',
    modules: [],
  }, {
    id: 4,
    keyword: 'bbs',
    name: '虚拟社区系统',
    description: '虚拟社区系统',
    owner: '张景丽',
    created: '2016-09-13',
    modules: [
      {
        name: '个人中心',
        features: [
          {
            name: '我的话题', hours: 3, owner: '张黎'
          },
          {
            name: '编辑个人资料', hours: 2, owner: '王晗'
          },
          {
            name: '我的收藏', hours: 5, owner: '王晗'
          },
        ]
      },
      {
        name: '首页',
        features: [
          {
            name: '注册', hours: 4, owner: '张黎'
          },
          {
            name: '首页', hours: 12, owner: '王晗'
          },
          {
            name: '登录', hours: 2, owner: '白鹭'
          },
        ]
      },
    ],
  }, {
    id: 5,
    keyword: 'netp',
    name: '网络教学平台',
    description: '网络教学平台课程',
    owner: '张景丽',
    created: '2016-07-19',
    modules: [
      {
        name: '用户管理',
        features: [
          {
            name: '用户删除', hours: 2, owner: '白鹭'
          },
          {
            name: '用户修改', hours: 2, owner: 'Json'
          },
          {
            name: '用户添加', hours: 2, owner: 'LiLei'
          },
        ]
      },
    ],
  }, {
    id: 6,
    keyword: 'CRM',
    name: '客户关系管理系统',
    description: ' 客户关系管理系统',
    owner: '张景丽',
    created: '2016-08-09',
    modules: [
      {
        name: '用户管理',
        features: [
          {
            name: '用户添加', hours: 3, owner: 'Json'
          },
          {
            name: '用户停用', hours: 1, owner: 'LiLei'
          },
        ]
      },
      {
        name: '客户管理',
        features: [
          {
            name: '客户删除', hours: 1, owner: '白鹭'
          },
          {
            name: '客户添加', hours: 2, owner: '白鹭'
          },
        ]
      },
    ],
  }, {
    id: 7,
    keyword: 'CMS',
    name: '网站发布系统',
    description: '网站发布系统',
    owner: '李静莉',
    created: '2016-09-14',
    modules: [
      {
        name: '首页',
        features: [
          {
            name: '首页', hours: 5, owner: '张黎'
          },
          {
            name: '登录', hours: 4, owner: '王晗'
          },
        ]
      },
    ],
  }
]
const users: User[] = [
  {
    id: 1,
    username: "admin",
    realName: "管理员",
    role: "管理员",
    email: "admin@126.com"
  },
  {
    id: 2,
    username: "Json03",
    realName: "Json",
    role: "普通用户",
    email: "Json@126.com"
  },
  {
    id: 3,
    username: "abcabc",
    realName: "abc",
    role: "普通用户",
    email: "abc@qq.com"
  },
  {
    id: 4,
    username: "LiLei1",
    realName: "LiLei",
    role: "普通用户",
    email: "LiLei@126.com"
  },
  {
    id: 5,
    username: "likaifa",
    realName: "李开發",
    role: "管理员",
    email: "likaifa@qq.com"
  },
  {
    id: 6,
    username: "test02",
    realName: "test02",
    role: "普通用户",
    email: "test02@qq.com"
  },
  {
    id: 7,
    username: "zhangjingli",
    realName: "张景丽",
    role: "普通用户",
    email: "zhangjingli@neusoft.org"
  },
  {
    id: 8,
    username: "zhangli",
    realName: "张黎",
    role: "普通用户",
    email: "zhangli@neusoft.org"
  },
  {
    id: 9,
    username: "lijingli",
    realName: "李静莉",
    role: "普通用户",
    email: "lijingli@neusoft.org"
  },
  {
    id: 10,
    username: "wanghan",
    realName: "王晗",
    role: "普通用户",
    email: "wanghan@gmail.com"
  },
  {
    id: 11,
    username: "bailu1",
    realName: "白鹭",
    role: "普通用户",
    email: "bailu@neusoft.org"
  }
]
export default {
  projects: projects,
  users: users
}