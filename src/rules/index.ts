// 登录表单字段验证规则
export const loginFormRule = {
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
};

// 添加用户表单字段验证规则
export const addUserFormRule = {
  nickname: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  roleId: [
    { required: true, message: '请为用户分配角色', trigger: 'blur,change' }
  ]
};

// 修改用户密码
export const updateUserPassFormRule = {
  password: [{ required: true, message: '请填写密码', trigger: 'blur' }]
};

// 添加服务
export const addServiceFormRule = {
  appId: [{ required: true, message: '请填写服务唯一标识', trigger: 'blur' }],
  name: [{ required: true, message: '请填写服务名称', trigger: 'blur' }],
  englishName: [
    { required: true, message: '请填写服务的英文名称', trigger: 'blur' }
  ],
  endpoints: {
    protocol: [{ required: true, message: '请填写网络协议', trigger: 'blur' }],
    ip: [{ required: true, message: '请填写ip地址', trigger: 'blur' }],
    port: [{ required: true, message: '请填写端口', trigger: 'blur' }],
    appSecret: [{ required: true, message: '请填写服务秘钥', trigger: 'blur' }]
  },
  defaultVersion: [
    { required: true, message: '请填写版本号', trigger: 'blur' }
  ],
  state: [
    { required: true, message: '请设置是否有任意服务节点在线', trigger: 'blur' }
  ],
  enabled: [
    { required: true, message: '请设置是否有任意服务节点在线', trigger: 'blur' }
  ]
};

// 修改服务
export const updateServiceFormRule = {
  name: [{ required: true, message: '请填写服务名称', trigger: 'blur' }],
  englishName: [
    { required: true, message: '请填写服务的英文名称', trigger: 'blur' }
  ],
  endpoints: {
    ip: [{ required: true, message: '请填写ip地址', trigger: 'blur' }],
    port: [{ required: true, message: '请填写端口', trigger: 'blur' }],
    appSecret: [{ required: true, message: '请填写服务秘钥', trigger: 'blur' }]
  },
  defaultVersion: [
    { required: true, message: '请填写版本号', trigger: 'blur' }
  ],
  state: [
    { required: true, message: '请设置是否有任意服务节点在线', trigger: 'blur' }
  ],
  enabled: [
    { required: true, message: '请设置是否有任意服务节点在线', trigger: 'blur' }
  ]
};

// 添加角色
export const addRoleFormRule = {
  name: [{ required: true, message: '请填写角色名称', trigger: 'blur' }],
  tag: [{ required: true, message: '请填写角色标识符', trigger: 'blur' }],
  level: [{
    required: true, type: 'number', message: '权限级别须为数字值', trigger: 'blur', validator: (r: any, v: any, c: any) => {
      if (v != '') {
        if (!(/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(v)) {
          c(new Error("权限级别须为数字值"));
        } else {
          c();
        }
      } else {
        c();
      }
    }
  }],
  api: {
    type: 'array',
    required: true,
    message: '请为角色分配权限',
    trigger: 'change'
  },
  allowRegister: [
    { required: true, message: '请设置是否开放注册', trigger: 'blur' }
  ],
  isAdminRole: [
    { required: true, message: '请设置是否可以访问后台', trigger: 'blur' }
  ]
};

// 添加行驶路线
export const addBusLineFormRule = {
  name: [{ required: true, message: '请填写线路名', trigger: 'blur' }],
  type: [
    { required: true, message: '请选择上学/放学', trigger: 'blur,change' }
  ],
  school: [
    { required: true, message: '请选择所属学校', trigger: 'blur,change' }
  ],
  list: {
    name: [{ required: true, message: '请填写停靠点名称', trigger: 'blur' }],
    longitude: [{ required: true, message: '请填写经度', trigger: 'blur' }],
    latitude: [{ required: true, message: '请填写纬度', trigger: 'blur' }],
    distance: [
      { required: true, message: '请填写到下一停靠点距离', trigger: 'blur' }
    ]
  }
};
