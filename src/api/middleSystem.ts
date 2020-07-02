import request from './interceptor';
import system from './paths/system';

/**
 * @description 获取token
 */
export const getToken = () =>
  request({
    url: system.auth.token
  });

/**
 * @description 获取验证码
 */
export const getCaptcha = () =>
  request({
    url: system.auth.captcha
  });

/**
 * @description 校验验证码
 * @param {string} code
 */
export const checkCaptcha = (code: string) =>
  request({
    method: 'post',
    url: system.auth.captcha,
    data: {
      code
    }
  });

/**
 * @description 登录
 * @param {string} account
 * @param {string} password
 */
export const login = (account: string, password: string, captcha: string) =>
  request({
    method: 'post',
    url: system.auth.login,
    data: {
      account,
      password,
      captcha
    }
  });

/**
 * @description 获取当前用户信息
 */
export const getUserInfo = () =>
  request({
    url: system.user.base
  });

/**
 * @description 获取用户列表
 * @param {number} page 指定分页
 * @param {number} pageSize 分页大小
 */
export const getUserList = (
  nickname: string,
  roleId: string,
  page: number = 1,
  pageSize: number = 100,
  phone: string
) =>
  request({
    url: system.user.list,
    params: {
      nickname,
      roleId,
      page,
      pageSize,
      phone
    }
  });

/**
 * @description 获取指定用户详情
 * @param {string} userId 用户id
 */
export const getUserDetail = (userId: string) =>
  request({
    url: `${system.user.base}/${userId}`
  });

/**
 * @description 添加用户
 * @param {string} account 账号
 * @param {string} password 密码
 * @param {string} roleId 角色id
 * @param {string} phone 电话号码
 */
export const addUser = (
  account: string,
  password: string,
  roleId: string,
  nickname: string,
  phone: string,
  detail: any
) =>
  request({
    method: 'post',
    url: system.user.base,
    data: {
      account,
      password,
      roleId,
      nickname,
      phone,
      detail
    }
  });

export const getUserStatus = (userIds: string[]) =>
  request({
    url: `${system.user.base}/status`,
    method: 'post',
    data: {
      userIds
    }
  });

/**
 * 从后台服务获取用户的注册信息并合并返回
 * @param {string} userId 用户id
 */
export const getUserBackend = (userId: string) =>
  request({
    url: `${system.user.base}/${userId}/detail`
  });

export const modifyUserBackendInfo = (userId: string, detail: any) =>
  request({
    url: `${system.user.base}/info/${userId}/detail`,
    data: {
      detail
    },
    method: 'put'
  });

/**
 * @description 修改用户密码
 * @param {string} userId 用户id
 * @param {string} password 密码
 */
export const updateUserPass = (userId: string, password: string) =>
  request({
    method: 'put',
    url: `${system.user.password}/${userId}`,
    data: {
      password
    }
  });

/**
 * @description 忘记密码重置
 */
export const forgetPassword = (
  account: string,
  PhoneNumbers: string,
  msgcaptcha: string,
  newPassword: string
) =>
  request({
    method: 'put',
    url: `${system.auth.forget}`,
    data: {
      account,
      PhoneNumbers,
      msgcaptcha,
      newPassword
    }
  });

/**
 * @description 修改当前用户密码
 * @param {string} oldPassword 旧密码
 * @param {string} newPassword 新密码
 */
export const modifyUserPass = (oldPassword: string, newPassword: string) =>
  request({
    method: 'put',
    url: system.user.password,
    data: {
      oldPassword,
      newPassword
    }
  });

/**
 * @description 修改指定用户基础信息
 * @param {string} userId
 * @param {string} nickname
 * @param {string} phone
 */
export const modifyUserInfo = (
  userId: string,
  nickname: string,
  phone: string,
  roleId: string
) =>
  request({
    method: 'put',
    url: `${system.user.info}/${userId}`,
    data: {
      nickname,
      phone,
      roleId
    }
  });

/**
* @description 修改指定用户基础信息
* @param {string} userId
* @param {string} nickname
* @param {string} phone
* @param {any} detail
*/
export const modifyUserInfoWithBackend = (
  userId: string,
  nickname: string,
  phone: string,
  roleId: string,
  detail: any
) =>
  request({
    method: 'put',
    url: `${system.user.info}/${userId}`,
    data: {
      nickname,
      phone,
      roleId,
      detail
    }
  });

/**
 * @description 删除用户
 * @param {string} userId 用户id
 */
export const deleteUser = (userId: string) =>
  request({
    method: 'delete',
    url: `${system.user.base}/${userId}`
  });

export const fetchAllRole = () =>
  request({
    url: system.role.list
  });

/**
 * @description 获取所有角色
 * @param {number} page
 * @param {number} pageSize
 */
export const getAllRole = (
  name?: string,
  page: number = 1,
  pageSize: number = 10000
) =>
  request({
    url: system.role.list,
    params: {
      page,
      pageSize,
      name
    }
  });

/**
 * @description 获取指定角色
 * @param {string} roleId 角色id
 */
export const getRole = (roleId: string) =>
  request({
    url: `${system.role.base}/${roleId}`
  });

/**
 * @description 添加角色
 * @param {string} name 角色名称
 * @param {object[]} api 可访问的api
 * @param {boolean} allowRegister 是否开放注册
 * @param {boolean} isAdminRole 是否可以访问后台
 */
export const addRole = (
  name: string,
  api: object[],
  allowRegister: boolean,
  isAdminRole: boolean,
  tag: string,
  level: number,
  roleTag: object[]
) =>
  request({
    method: 'post',
    url: system.role.base,
    data: {
      name,
      api,
      allowRegister,
      isAdminRole,
      tag,
      level,
      roleTag
    }
  });

/**
 * @description 修改角色
 * @param {string[]} api 可访问的api的id
 * @param {boolean} allowRegister 是否开放注册
 * @param {boolean} isAdminRole 是否可以访问后台
 */
export const updateRole = (
  roleId: string,
  name: string,
  api: string[],
  allowRegister: boolean,
  isAdminRole: boolean,
  tag: string,
  level: number,
  roleTag: object[]
) =>
  request({
    url: `${system.role.base}/${roleId}`,
    method: 'put',
    data: {
      name,
      api,
      allowRegister,
      isAdminRole,
      tag,
      level,
      roleTag
    }
  });

/**
 * 获取角色的服务角色标识
 * @param roleId 
 */
export const getRoleTags = (
  roleId: string
) =>
  request({
    url: `${system.role.base}/${roleId}/tags`,
    method: 'get'
  });

/**
 * @description 删除角色
 * @param {string} roleId 角色id
 */
export const deleteRole = (roleId: string) =>
  request({
    method: 'delete',
    url: `${system.role.base}/${roleId}`
  });

/**
 * @description 获取路由菜单
 */
export const getRouteMenu = () =>
  request({
    url: system.menu.list
  });

export const exportRole = (roleIds: string[]) =>
  request({
    method: "post",
    url: `${system.role.base}/export`,
    data: {
      roleIds
    },
    responseType: 'blob'
  });

export const importRole = (roleFile: any) =>
  request({
    method: "post",
    url: `${system.role.base}/import`,
    data: {
      roleFile
    }
  });

/**
 * @description 获取所有服务
 * @param {number} page 指定分页
 * @param {number} pageSize 分页大小
 * @param {string} name 按名称搜索服务时的服务名称
 */
export const getAllService = (
  page: number = 1,
  pageSize: number = 10,
  name?: string,
  userInfoManage?: boolean
) =>
  request({
    url: system.service.list,
    params: {
      page,
      pageSize,
      name,
      userInfoManage
    }
  });

/**
 * @description 获取服务
 * @param {string} appId 服务唯一标识
 */
export const getService = (appId: string) =>
  request({
    url: `${system.service.base}/${appId}`
  });

/**
 * 添加服务
 * @param {string}  appId
 * @param {string}  name
 * @param {string}  englishName
 * @param {string} ip
 * @param {string} port
 * @param {string} appSecret
 * @param {string} defaultVersion
 * @param {string} state
 */
export const addService = (
  appId: string,
  name: string,
  englishName: string,
  endpoints: {
    protocol: string;
    ip: string;
    port: string;
    appSecret: string;
  },
  defaultVersion: string,
  state: boolean,
  enabled: boolean
) =>
  request({
    url: `${system.service.base}`,
    method: 'post',
    data: {
      appId,
      name,
      englishName,
      endpoints,
      defaultVersion,
      state,
      enabled
    }
  });

/**
 * 修改服务
 *
 * @export
 * @param {string} appId
 * @param {string} name
 * @param {string} englishName
 * @param {{
 *     ip: string;
 *     port: string;
 *     appSecret: string;
 *   }} endpoints
 * @param {string} defaultVersion
 * @param {boolean} state
 */
export function updateService(
  appId: string,
  name: string,
  englishName: string,
  endpoints: {
    ip: string;
    port: string;
    appSecret: string;
  },
  defaultVersion: string,
  state: boolean,
  enabled: boolean
) {
  return request({
    url: `${system.service.base}/${appId}`,
    method: 'put',
    data: {
      name,
      englishName,
      endpoints,
      defaultVersion,
      state,
      enabled
    }
  });
}

/**
 * 删除服务
 * @param appId
 */
export const deleteService = (appId: string) =>
  request({
    url: `${system.service.base}/${appId}`,
    method: 'delete'
  });

/**
 * @description 获取所有api
 * @param {number} page 指定分页
 * @param {number} pageSize 分页大小
 * @param {string} name 以api名称筛选时的名称
 * @param {string} appId 以服务id筛选时的服务id
 */
export const getAllApi = (
  page?: number,
  pageSize?: number,
  name?: string,
  appId?: string
) =>
  request({
    url: system.api.list,
    params: {
      page,
      pageSize,
      name,
      appId
    }
  });


/**
* @description 获取附件上传配置
*/
export const getFileConfig = () =>
  request({
    url: `${system.fileConfig.base}`
  });


/**
 * @description 修改附件上传配置
 */
export const updateFileConfig = (
  id: number | string,
  fileSize: number | string,
  mimetype: string[]
) =>
  request({
    url: `${system.fileConfig.base}/${id}`,
    method: 'put',
    data: {
      fileSize,
      mimetype
    }
  });


/**
* @description 发送短信验证码
*/
export const sendMsgCaptcha = (PhoneNumbers: string) =>
  request({
    url: `${system.auth.msgcaptcha}`,
    method: 'post',
    data: { PhoneNumbers }
  });


/**
* @description 获取消息模板配置
*/
export const getMsgTemp = (Type: number | string) =>
  request({
    url: `${system.message.settings}`,
    params: { Type }
  });


/**
* @description 设置消息模板
*/
export const setMsgTemp = (
  Id: number | string,
  Template: string,
  DefaultSign: string
) =>
  request({
    url: `${system.message.base}`,
    method: 'post',
    data: {
      Id,
      Template,
      DefaultSign
    }
  });



/**
* @description 获取操作信息
*/
export const getOperationInfo = {
  baseUrl: `${system.operationInfo.base}`,
  method: "get",
  request: (params: {
    page?: number;
    pageSize?: number;
  }) => request({
    url: `${system.operationInfo.base}`,
    params
  })
};

/**
* @description 清空操作信息
*/
export const clearOperationInfo = {
  baseUrl: `${system.operationInfo.base}`,
  method: "delete",
  request: () => request({
    url: `${system.operationInfo.base}`,
    method: 'delete'
  })
};
