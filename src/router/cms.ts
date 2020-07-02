import Layout from '@/layout/index.vue';

export default {
    path: '/site',
    name: 'site',
    redirect: '/site/main',
    meta: {
        title: '站点管理',
        icon: 'setting'
    },
    component: Layout,
    children: [
        {
            path: 'main',
            name: 'main',
            redirect: '/site/main/contents',
            component: () => import('@/views/cms/main/index.vue'),
            meta: {
                title: '信息管理',
                icon: 'xx'
            },
            children: [
                {
                    path: 'contents',
                    name: 'contents',
                    component: () => import('@/views/cms/main/contents/index.vue'),
                    meta: {
                        title: '内容管理'
                    },
                    children: [
                        {
                            path: 'add',
                            name: 'add',
                            component: () => import('@/views/cms/main/contents/add.vue'),
                            meta: {
                                title: '新增内容'
                            },
                            hidden: true
                        },
                        {
                            path: 'modify',
                            name: 'modify',
                            component: () => import('@/views/cms/main/contents/modify.vue'),
                            meta: {
                                title: '修改内容'
                            },
                            hidden: true
                        }
                    ]
                },
                {
                    path: 'channel',
                    name: 'channel',
                    component: () => import('@/views/cms/main/Channel/index.vue'),
                    meta: {
                        title: '栏目管理'
                    },
                    children: [
                        {
                            path: 'add',
                            name: 'add',
                            component: () => import('@/views/cms/main/Channel/add.vue'),
                            meta: {
                                title: '新增栏目'
                            },
                            hidden: true
                        },
                        {
                            path: 'modify',
                            name: 'modify',
                            component: () => import('@/views/cms/main/Channel/modify.vue'),
                            meta: {
                                title: '修改栏目'
                            },
                            hidden: true
                        }
                    ]
                },
                {
                    path: 'contentSearch',
                    name: 'contentSearch',
                    component: () => import('@/views/cms/main/contentSearch/index.vue'),
                    meta: {
                        title: '内容搜索'
                    }
                },
                {
                    path: 'contentSubmit',
                    name: 'contentSubmit',
                    component: () => import('@/views/cms/main/contentSubmit/index.vue'),
                    meta: {
                        title: '投稿内容'
                    }
                },
                {
                    path: 'mycontent',
                    name: 'mycontent',
                    component: () => import('@/views/cms/main/myContent/index.vue'),
                    meta: {
                        title: '我的内容'
                    }
                },
                {
                    path: 'massTransfer',
                    name: 'massTransfer',
                    component: () => import('@/views/cms/main/massTransfer/index.vue'),
                    meta: {
                        title: '批量转移'
                    }
                },
                {
                    path: 'contentAudit',
                    name: 'contentAudit',
                    component: () => import('@/views/cms/main/contentAudit/index.vue'),
                    meta: {
                        title: '内容审核'
                    }
                },
                {
                    path: 'recyclebin',
                    name: 'recyclebin',
                    component: () => import('@/views/cms/main/recyclebin/index.vue'),
                    meta: {
                        title: '内容回收站'
                    }
                }
            ]
        },
        {
            path: 'display',
            name: 'display',
            redirect: '/site/dispaly',
            component: () => import('@/views/cms/display/index.vue'),
            meta: {
                title: '显示管理',
                icon: 'xs'
            },
            children: [
                {
                    path: 'templateManagement',
                    name: 'templateManagement',
                    component: () => import('@/views/cms/display/templateManagement/index.vue'),
                    meta: {
                        title: '模板管理'
                    }
                },
                {
                    path: 'projectManagement',
                    name: 'projectManagement',
                    component: () => import('@/views/cms/display/projectManagement/index.vue'),
                    meta: {
                        title: '专题管理'
                    }
                },
                {
                    path: 'matchingTemplate',
                    name: 'matchingTemplate',
                    component: () => import('@/views/cms/display/matchingTemplate/index.vue'),
                    meta: {
                        title: '匹配模板'
                    }
                },
                {
                    path: 'includeFile',
                    name: 'includeFile',
                    component: () => import('@/views/cms/display/includeFile/index.vue'),
                    meta: {
                        title: '包含文件管理'
                    }
                },
                {
                    path: 'styleFile',
                    name: 'styleFile',
                    component: () => import('@/views/cms/display/styleFile/index.vue'),
                    meta: {
                        title: '样式文件管理'
                    }
                },
                {
                    path: 'scriptFile',
                    name: 'scriptFile',
                    component: () => import('@/views/cms/display/scriptFile/index.vue'),
                    meta: {
                        title: '脚本文件管理'
                    }
                },
                {
                    path: 'onlineAnalytical',
                    name: 'onlineAnalytical',
                    component: () => import('@/views/cms/display/onlineAnalytical/index.vue'),
                    meta: {
                        title: '模板在线解析'
                    }
                },
                {
                    path: 'languageReference',
                    name: 'languageReference',
                    component: () => import('@/views/cms/display/languageReference/index.vue'),
                    meta: {
                        title: '模板语言参考'
                    }
                },
            ]
        },
        {
            path: 'setting',
            name: 'setting',
            redirect: '/site/setting/siteset',
            component: () => import('@/views/cms/setting/index.vue'),
            meta: {
                title: '设置管理',
                icon: 'sz'
            },
            children: [
                {
                    path: 'siteset',
                    name: 'siteset',
                    component: () => import('@/views/cms/setting/siteset/index.vue'),
                    meta: {
                        title: '站点设置'
                    }
                },
                {
                    path: 'groupLabel',
                    name: 'groupLabel',
                    component: () => import('@/views/cms/setting/groupLabel/index.vue'),
                    meta: {
                        title: '组别与标签设置'
                    }
                },
                {
                    path: 'field',
                    name: 'field',
                    component: () => import('@/views/cms/setting/field/index.vue'),
                    meta: {
                        title: '字段设置'
                    }
                },
                {
                    path: 'uploading',
                    name: 'uploading',
                    component: () => import('@/views/cms/setting/uploading/index.vue'),
                    meta: {
                        title: '上传设置'
                    }
                },
                {
                    path: 'transmit',
                    name: 'transmit',
                    component: () => import('@/views/cms/setting/transmit/index.vue'),
                    meta: {
                        title: '跨站转发设置'
                    }
                },
                {
                    path: 'staticPage',
                    name: 'staticPage',
                    component: () => import('@/views/cms/setting/staticPage/index.vue'),
                    meta: {
                        title: '静态页生成设置'
                    }
                }
            ]
        },
        {
            path: 'generate',
            name: 'generate',
            redirect: '/site/generate/homePage',
            component: () => import('@/views/cms/generate/index.vue'),
            meta: {
                title: '生成管理',
                icon: 'sc'
            },
            children: [
                {
                    path: 'homePage',
                    name: 'homePage',
                    component: () => import('@/views/cms/generate/homePage/index.vue'),
                    meta: {
                        title: '生成首页'
                    }
                },
                {
                    path: 'column',
                    name: 'column',
                    component: () => import('@/views/cms/generate/column/index.vue'),
                    meta: {
                        title: '生成栏目页'
                    }
                },
                {
                    path: 'content1',
                    name: 'content1',
                    component: () => import('@/views/cms/generate/content1/index.vue'),
                    meta: {
                        title: '生成内容页'
                    }
                },
                {
                    path: 'paper',
                    name: 'paper',
                    component: () => import('@/views/cms/generate/paper/index.vue'),
                    meta: {
                        title: '生成文件页'
                    }
                },
                {
                    path: 'special',
                    name: 'special',
                    component: () => import('@/views/cms/generate/special/index.vue'),
                    meta: {
                        title: '生成专题'
                    }
                },
                {
                    path: 'Agenerate',
                    name: 'Agenerate',
                    component: () => import('@/views/cms/generate/Agenerate/index.vue'),
                    meta: {
                        title: '一键生成'
                    }
                },
                {
                    path: 'schedule',
                    name: 'schedule',
                    component: () => import('@/views/cms/generate/schedule/index.vue'),
                    meta: {
                        title: '生成进度查看'
                    }
                }
                
            ]
        }
    ]
};
