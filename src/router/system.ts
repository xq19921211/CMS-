import Layout from '@/layout/index.vue';

export default {
  path: '/system',
  name: 'system',
  redirect: '/system/user',
  meta: {
    title: '系统设置',
    icon: 'setting'
  },
  component: Layout,
  children: [
    {
      path: 'user',
      name: 'user',
      redirect: '/system/user/list',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: '用户管理',
        icon: 'user'
      },
      children: [
        {
          path: 'list',
          name: 'userList',
          component: () => import('@/views/system/user/list/index.vue'),
          meta: {
            title: '用户列表'
          }
        }
      ]
    },
    {
      path: 'role',
      name: 'role',
      redirect: '/system/role/list',
      component: () => import('@/views/system/role/index.vue'),
      meta: {
        title: '权限管理',
        icon: 'role'
      },
      children: [
        {
          path: 'list',
          name: 'roleList',
          component: () => import('@/views/system/role/list/index.vue'),
          meta: {
            title: '角色列表'
          },
          children: [
            {
              path: ':id',
              name: 'roleDetail',
              component: () => import('@/views/system/role/detail/index.vue'),
              meta: {
                title: '角色详情'
              },
              hidden: true
            }
          ]
        },
        {
          path: 'add',
          name: 'addRole',
          component: () => import('@/views/system/role/add/index.vue'),
          meta: {
            title: '添加角色'
          }
        }
      ]
    },
    {
      path: 'service',
      name: 'service',
      redirect: '/system/service/list',
      component: () => import('@/views/system/service/index.vue'),
      meta: {
        title: '服务管理',
        icon: 'service'
      },
      children: [
        {
          path: 'list',
          name: 'serviceList',
          component: () => import('@/views/system/service/list/index.vue'),
          meta: {
            title: '服务列表'
          }
        },
        {
          path: 'add',
          name: 'addService',
          hidden: true,
          component: () => import('@/views/system/service/add/index.vue'),
          meta: {
            title: '添加服务'
          }
        },
        {
          path: 'apis',
          name: 'apis',
          component: () => import('@/views/system/service/apis/index.vue'),
          meta: {
            title: '所有接口'
          }
        }
      ]
    },
    {
      path: 'config',
      name: 'config',
      redirect: '/system/config/file',
      component: () => import('@/views/system/config/index.vue'),
      meta: {
        title: '配置管理',
        icon: 'config'
      },
      children: [
        {
          path: 'file',
          name: 'file',
          component: () => import('@/views/system/config/file/index.vue'),
          meta: {
            title: '上传配置'
          }
        },
        {
          path: 'message',
          name: 'message',
          component: () => import('@/views/system/config/message/index.vue'),
          meta: {
            title: '短信配置'
          }
        },
        {
          path: 'voice',
          name: 'voice',
          component: () => import('@/views/system/config/voice/index.vue'),
          meta: {
            title: '语音配置'
          }
        },
        {
          path: 'tts',
          name: 'tts',
          component: () => import('@/views/system/config/tts/index.vue'),
          meta: {
            title: 'tts配置'
          }
        }
      ]
    },
    {
      path: 'operation',
      name: 'operation',
      redirect: '/system/operation',
      component: () => import('@/views/system/operation/index.vue'),
      meta: {
        title: '操作管理',
        icon: 'operation'
      },
      children: [
        {
          path: 'list',
          name: 'operationList',
          component: () => import('@/views/system/operation/list/index.vue'),
          meta: {
            title: '操作列表'
          }
        }
      ]
    }
  ]
};
