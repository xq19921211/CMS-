import request from '../interceptor';


/**
 * 批量新增字段
 */
export const addBatch = {
  baseUrl: '/cms/fieldssetup/batch',
  method: 'post', 
  request: (data?: {id?: number;channelId?: number;tableName?: string;fieldName?: any;displayName?: string;sort?: number;help?: string;ddsplay?: string;isHorizontal?: string;isVisibleInList?: string;}) => request({
    url:`/cms/fieldssetup/batch`,
    method: 'post',
    data
  })
};

/**
 * 修改字段
 */
export const modifyField = {
  baseUrl: '/cms/fieldssetup/field/{id}',
  method: 'put', 
  request: (id: string,data?: {fieldName?: string;displayName?: string;sort?: number;help?: string;ddsplay?: string;isHorizontal?: string;isVisibleInList?: string;}) => request({
    url:`/cms/fieldssetup/field/${id}`,
    method: 'put',
    data
  })
};

/**
 * 删除字段
 */
export const delField = {
  baseUrl: '/cms/fieldssetup/field/{id}',
  method: 'delete', 
  request: (id: string) => request({
    url:`/cms/fieldssetup/field/${id}`,
    method: 'delete'
  })
};

/**
 * 浏览内容字段
 */
export const getContent = {
  baseUrl: '/cms/fieldssetup/content',
  method: 'get', 
  request: () => request({
    url:`/cms/fieldssetup/content`,
    method: 'get'
  })
};

/**
 * 浏览栏目虚拟字段
 */
export const getChannel = {
  baseUrl: '/cms/fieldssetup/channel',
  method: 'get', 
  request: () => request({
    url:`/cms/fieldssetup/channel`,
    method: 'get'
  })
};

/**
 * 新增字段
 */
export const addField = {
  baseUrl: '/cms/fieldssetup/field',
  method: 'post', 
  request: (data?: {id?: number;channelId?: number;tableName?: string;fieldName?: string;displayName?: string;sort?: number;help?: string;ddsplay?: string;isHorizontal?: string;isVisibleInList?: string;}) => request({
    url:`/cms/fieldssetup/field`,
    method: 'post',
    data
  })
};

