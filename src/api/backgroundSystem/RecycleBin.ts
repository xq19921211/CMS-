import request from '../interceptor';


/**
 * 还原
 */
export const modifyRecyclebin = {
  baseUrl: '/cms/recyclebin',
  method: 'put', 
  request: (data?: {restoreId?: any;}) => request({
    url:`/cms/recyclebin`,
    method: 'put',
    data
  })
};

/**
 * 清空回收站
 */
export const delContent = {
  baseUrl: '/cms/recyclebin/content',
  method: 'delete', 
  request: (data?: {restoreId?: any;}) => request({
    url:`/cms/recyclebin/content`,
    method: 'delete',
    data
  })
};

/**
 * 展示
 */
export const getRecyclebin = {
  baseUrl: '/cms/recyclebin',
  method: 'get', 
  request: (params?: {Page?: number;PageSize?: number;StartTime?: string;EndTime?: string;ChannelID?: number;checkedLevel?: any;fieldName?: any;Keyword?: string;}) => request({
    url:`/cms/recyclebin`,
    method: 'get',
    params
  })
};

