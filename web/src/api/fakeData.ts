import type {Project} from '@/types/project'

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
            name: 'bss', hours: 1, owner: '管理员'
          },
        ]
      },
      {
        name: '首页',
        features: [
          {
            name: '导航栏', hours: 1, owner: '李开發'
          },
          {
            name: '广告栏', hours: 1, owner: '张黎'
          },
        ]
      },
      {
        name: '登录',
        features: [
          {
            name: '密码修改', hours: 2, owner: ''
          },
          {
            name: '登录', hours: 2, owner: '王晗'
          },
        ]
      },
      {
        name: '测试模块',
        features: []
      },
    ],
  },{
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
            name: '项目列表', hours: 2, owner: 'Json'
          },
          {
            name: '项目添加', hours: 2, owner: 'LiLei'
          },
        ]
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
        ]
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

export default {
  projects: projects
}