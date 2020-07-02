import request from '../interceptor';


/**
 * 内容转移
 */
export const modifyContentmigration = {
  baseUrl: '/cms/migration/contentmigration',
  method: 'put', 
  request: (data?: {columnID?: number;moveColumnID?: number;isRemove?: boolean;}) => request({
    url:`/cms/migration/contentmigration`,
    method: 'put',
    data
  })
};

/**
 * 栏目转移
 */
export const modifyChannelmigration = {
  baseUrl: '/cms/migration/channelmigration',
  method: 'put', 
  request: (data?: {columnID?: number;moveColumnID?: number;isRemove?: boolean;}) => request({
    url:`/cms/migration/channelmigration`,
    method: 'put',
    data
  })
};

