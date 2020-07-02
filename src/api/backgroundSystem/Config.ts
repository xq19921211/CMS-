import request from '../interceptor';


/**
 * 修改系统配置
 */
export const modifyConfig = {
  baseUrl: '/cms/config',
  method: 'put', 
  request: (data?: {picture?: string;paging?: string;wrapTitle?: string;lineWrapSubtitle?: string;sensitiveWordDetection?: string;reviewMechanism?: string;}) => request({
    url:`/cms/config`,
    method: 'put',
    data
  })
};

/**
 * 内容系统配置
 */
export const getConfig = {
  baseUrl: '/cms/config',
  method: 'get', 
  request: () => request({
    url:`/cms/config`,
    method: 'get'
  })
};

