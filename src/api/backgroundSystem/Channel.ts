import request from '../interceptor';


/**
 * 浏览栏目
 */
export const getChannel = {
  baseUrl: '/cms/public/channel',
  method: 'get', 
  request: () => request({
    url:`/cms/public/channel`,
    method: 'get',
  })
};

/**
 * 添加栏目
 */
export const addChannel = {
  baseUrl: '/cms/channel',
  method: 'post', 
  request: (data?: {parentId?: number;channelName?: string;indexName?: string;keywords?: any;imagePath?: any;content?: string;isAddColumns?: boolean;description?: string;isAddContent?: boolean;} | FormData) => request({
    url:`/cms/channel`,
    method: 'post',
    data
  })
};

/**
 * 浏览虚拟栏目
 */
export const getValues = {
  baseUrl: '/cms/channel/values',
  method: 'get', 
  request: (params?: {id?: number;}) => request({
    url:`/cms/channel/values`,
    method: 'get',
    params
  })
};

// 添加图片
export const addImage = {
  baseUrl: '/cms/content/image',
  method: 'post', 
  request: (data?:{imagePath?: any}|FormData) => request({
    url:`/cms/content/image`,
    method: 'post',
    data
  })
};


/**
 * 添加栏目虚拟字段
 */
export const addValues = {
  baseUrl: '/cms/channel/values',
  method: 'post', 
  request: (params?: {id?: number;}) => request({
    url:`/cms/channel/values`,
    method: 'post',
    params
  })
};

/**
 * 浏览栏目下的子栏目
 */
export const getSubtopic = {
  baseUrl: '/cms/public/channel/{id}/subtopic',
  method: 'get', 
  request: (id: string) => request({
    url:`/cms/public/channel/${id}/subtopic`,
    method: 'get'
  })
};

/**
 * 浏览栏目组
 */
export const getChannelGroup = {
  baseUrl: '/cms/channel/group',
  method: 'get', 
  request: () => request({
    url:`/cms/channel/group`,
    method: 'get'
  })
};

/**
 * 修改栏目组
 */
export const modifyGroup = {
  baseUrl: '/cms/channel/group/{id}',
  method: 'put', 
  request: (id: string,data?: {id?: number;groupName?: string;description?: string;}) => request({
    url:`/cms/channel/group/${id}`,
    method: 'put',
    data
  })
};

/**
 * 添加栏目组
 */
export const addGroup = {
  baseUrl: '/cms/channel/group',
  method: 'post', 
  request: (data?: {id?: number;groupName?: string;description?: string;sort?: number;}) => request({
    url:`/cms/channel/group`,
    method: 'post',
    data
  })
};

/**
 * 删除栏目组
 */
export const delGroup = {
  baseUrl: '/cms/channel/group/{id}',
  method: 'delete', 
  request: (id: string) => request({
    url:`/cms/channel/group/${id}`,
    method: 'delete'
  })
};

/**
 * 查询某一个栏目组包含的栏目
 */
export const getGroup = {
  baseUrl: '/cms/channel/group/{id}',
  method: 'get', 
  request: (id: string) => request({
    url:`/cms/channel/group/${id}`,
    method: 'get'
  })
};

/**
 * 查询一条栏目详情
 */
export const getId = {
  baseUrl: '/cms/channel/getchonnerid/id',
  method: 'get', 
  request: (params?: {id?: number;}) => request({
    url:`/cms/channel/getchonnerid/id`,
    method: 'get',
    params
  })
};

/**
 * 进行栏目调整排序
 */
export const modifySort = {
  baseUrl: '/cms/channel/sort/{ColumnId}',
  method: 'put', 
  request: (ColumnId: string,data?: {upOrDowns?:any;number?:number}) => request({
    url:`/cms/channel/sort/${ColumnId}`,
    method: 'put',
    data
  })
};

/**
 * 进行栏目组调整排序
 */
export const modifyGroupsort = {
  baseUrl: '/cms/channel/groupsort/{groupId}',
  method: 'put', 
  request: (groupId: string,data?: {upOrDowns?: any;}) => request({
    url:`/cms/channel/groupsort/${groupId}`,
    method: 'put',
    data
  })
};

/**
 * 对栏目添加栏目组
 */
export const modifyGroupchannel = {
  baseUrl: '/cms/channel/id/groupchannel',
  method: 'put', 
  request: (params?: {Gid?: number;Id?: number;}) => request({
    url:`/cms/channel/id/groupchannel`,
    method: 'put',
    params
  })
};

/**
 * 修改栏目
 */
export const modifyChannel = {
  baseUrl: '/cms/channel/{id}',
  method: 'put', 
  request: (id?: number,data?: {id?: number;channelName?: string;indexName?: string;keywords?: any;imageUrl?: any;content?: string;}| FormData) => request({
    url:`/cms/channel/${id}`,
    method: 'put',
    data
  })
};

/**
 * 删除栏目成功
 */
export const delChannel = {
  baseUrl: '/cms/channel/{id}',
  method: 'delete', 
  request: (id: string) => request({
    url:`/cms/channel/${id}`,
    method: 'delete'
  })
};

/**
 * 修改栏目虚拟字段
 */
export const modifyValues = {
  baseUrl: '/cms/channel/id/values',
  method: 'put', 
  request: (params?: {id?: number;}) => request({
    url:`/cms/channel/id/values`,
    method: 'put',
    params
  })
};

/**
 * 虚拟栏目字段删除
 */
export const delValue = {
  baseUrl: '/cms/channel/value',
  method: 'delete', 
  request: (params?: {id?: number;}) => request({
    url:`/cms/channel/value`,
    method: 'delete',
    params
  })
};

/**
 * 根据条件导出数据
 */
export const addContent = {
  baseUrl: '/cms/channel/content',
  method: 'post', 
  request: (params?: {id?: number;}) => request({
    url:`/cms/channel/content`,
    method: 'post',
    params
  })
};

