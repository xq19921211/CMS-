import request from '../interceptor';


/**
 * 素材展示
 */
export const getMaterial = {
  baseUrl: '/cms/material',
  method: 'get', 
  request: (params?: {Page?: number;PageSize?: number;Name?: string;Type?: any;}) => request({
    url:`/cms/material`,
    method: 'get',
    params
  })
};

/**
 * 上传
 */
export const addMaterial = {
  baseUrl: '/cms/material',
  method: 'post', 
  request: (data?: {name?: string;type?: any;url?: string;}) => request({
    url:`/cms/material`,
    method: 'post',
    data
  })
};

/**
 * 修改图文
 */
export const modifyMaterial = {
  baseUrl: '/cms/material/{id}',
  method: 'put', 
  request: (id: string,data?: {name?: string;type?: any;url?: string;}) => request({
    url:`/cms/material/${id}`,
    method: 'put',
    data
  })
};

/**
 * 删除图文
 */
export const delMaterial = {
  baseUrl: '/cms/material/{id}',
  method: 'delete', 
  request: (id: string) => request({
    url:`/cms/material/${id}`,
    method: 'delete'
  })
};

/**
 * 移入分组
 */
export const modifyMove = {
  baseUrl: '/cms/material/{id}/move',
  method: 'put', 
  request: (id: string,data?: {groupId?: number;}) => request({
    url:`/cms/material/${id}/move`,
    method: 'put',
    data
  })
};

/**
 * 新建分組
 */
export const addGroup = {
  baseUrl: '/cms/material/group',
  method: 'post', 
  request: (data?: {groupName?: string;}) => request({
    url:`/cms/material/group`,
    method: 'post',
    data
  })
};

/**
 * 修改分組
 */
export const modifyGroup = {
  baseUrl: '/cms/material/group/{id}',
  method: 'put', 
  request: (id: string,data?: {groupName?: string;}) => request({
    url:`/cms/material/group/${id}`,
    method: 'put',
    data
  })
};

/**
 * 删除分組
 */
export const delGroup = {
  baseUrl: '/cms/material/group/{id}',
  method: 'delete', 
  request: (id: string) => request({
    url:`/cms/material/group/${id}`,
    method: 'delete'
  })
};

