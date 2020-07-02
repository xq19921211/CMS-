import request from '../interceptor';


/**
 * 根据栏目内容展示
 */
export const getContent = {
  baseUrl: '/cms/public/content/{id}',
  method: 'get',
  request: (id: string, params?: { Page?: number; PageSize?: number; }) => request({
    url: `/cms/public/content/${id}`,
    method: 'get',
    params
  })
};

/**
 * 浏览内容组
 */
export const getContentGroup = {
  baseUrl: '/cms/content/group',
  method: 'get',
  request: () => request({
    url: `/cms/content/group`,
    method: 'get'
  })
};

/**
 * 查询出每个标签中的内容
 */
export const getTagcontent = {
  baseUrl: '/cms/content/tagcontent/{id}',
  method: 'get',
  request: (id: string) => request({
    url: `/cms/content/tagcontent/${id}`,
    method: 'get'
  })
};

/**
 * 根据条件进行排序(整理)
 */
export const getRank = {
  baseUrl: '/cms/content/rank',
  method: 'get',
  request: (params?: { Page?: number; PageSize?: number; ContentId?: number; AddTime?: string; Directions?: any; }) => request({
    url: `/cms/content/rank`,
    method: 'get',
    params
  })
};

/**
 * 根据内容组展示内容
 */
export const getGroup = {
  baseUrl: '/cms/content/group/{GId}',
  method: 'get',
  request: (GId: string) => request({
    url: `/cms/content/group/${GId}`,
    method: 'get'
  })
};

/**
 * 展示标签，根据使用次数进行展示
 */
export const getTag = {
  baseUrl: '/cms/content/tag',
  method: 'get',
  request: (params?: { TagsName?: string; }) => request({
    url: `/cms/content/tag`,
    method: 'get',
    params
  })
};

/**
 * 内容搜索
 */
export const getCondition = {
  baseUrl: '/cms/content/condition',
  method: 'get',
  request: (params?: { Page?: number; PageSize?: number; StartTime?: string; EndTime?: string; ChannelID?: number; checkedLevel?: any; fieldName?: any; Keyword?: string; }) => request({
    url: `/cms/content/condition`,
    method: 'get',
    params
  })
};

/**
 * 添加内容组
 */
export const addContentgroup = {
  baseUrl: '/cms/content/contentgroup',
  method: 'post',
  request: (data?: { id?: number; title?: string; description?: string; }) => request({
    url: `/cms/content/contentgroup`,
    method: 'post',
    data
  })
};

/**
 * 添加到内容组
 */
export const addToContentgroup = {
  baseUrl: '/cms/content/{Id}/groupcontent',
  method: 'post',
  request: (Id: number,data:{gName:any}) => request({
    url: `/cms/content/${Id}/groupcontent`,
    method: 'post',
    data
  })
};

/**
 * 添加标签
 */
export const addLabel = {
  baseUrl: '/cms/content/label',
  method: 'post',
  request: (params?: { id?: number; }) => request({
    url: `/cms/content/label`,
    method: 'post',
    params
  })
};

/**
 * 添加内容
 */
export const addContent = {
  baseUrl: '/cms/content',
  method: 'post',
  request: (data?: { columnId?: number; id?: number; title?: string; subTitle?: string; imagePath?: any; videoPath?: any; addDate?: string; content?: string; author?: string; isTop?: boolean; isRecommend?: boolean; isHot?: boolean; isColor?: boolean; groupNameCollectionid?: number; tagsName?: any; checkedLevel?: any; filePath?: any; } | FormData) => request({
    url: `/cms/content`,
    method: 'post',
    data
  })
};

/**
 * 修改内容
 */
export const modifyContent = {
  baseUrl: '/cms/content',
  method: 'put',
  request: (params?: { id?: number; }, data?: { title?: string; subTitle?: string; imagePath?: any; videoPath?: any; addDate?: string; content?: string; author?: string; isTop?: boolean; isRecommend?: boolean; isHot?: boolean; isColor?: boolean; groupNameCollectionid?: number; tagsName?: any; checkedLevel?: any; linkUrl?: string; filePath?: any; } | FormData) => request({
    url: `/cms/content`,
    method: 'put',
    params,
    data
  })
};

/**
 * 敏感词
 */
export const getKword = {
  baseUrl: '/cms/content/kword',
  method: 'get',
  request: (params?: { Content?: string; }) => request({
    url: `/cms/content/kword`,
    method: 'get',
    params
  })
};

/**
 * 虚拟内容添加
 */
export const addVirtual = {
  baseUrl: '/cms/content/virtual',
  method: 'post',
  request: () => request({
    url: `/cms/content/virtual`,
    method: 'post'
  })
};

/**
 * 内容复制
 */
export const addCopy = {
  baseUrl: '/cms/content/{Id}/copy',
  method: 'post',
  request: (Id: string, data?: { columnId?: number; }) => request({
    url: `/cms/content/${Id}/copy`,
    method: 'post',
    data
  })
};

/**
 * 内容剪切
 */
export const addCut = {
  baseUrl: '/cms/content/{Id}/cut',
  method: 'post',
  request: (Id: string, data?: { oldColumnId?: number; newColumnId?: number; }) => request({
    url: `/cms/content/${Id}/cut`,
    method: 'post',
    data
  })
};

/**
 * 内容引用成功
 */
export const addReference = {
  baseUrl: '/cms/content/{Id}/reference',
  method: 'post',
  request: (Id: string, data?: { columnId?: number; }) => request({
    url: `/cms/content/${Id}/reference`,
    method: 'post',
    data
  })
};

/**
 * 根据条件导出数据
 */
export const exportContent = {
  baseUrl: '/cms/content/content',
  method: 'post',
  request: (data?: { checkedLevel?: any; starTime?: string; endTime?: string; files?: string; }) => request({
    url: `/cms/content/content`,
    method: 'post',
    data
  })
};

/**
 * 添加敏感词
 */
export const addKeyword = {
  baseUrl: '/cms/content/keyword',
  method: 'post',
  request: (data?: { keywords?: string; alternative?: string; grades?: any; }) => request({
    url: `/cms/content/keyword`,
    method: 'post',
    data
  })
};

/**
 * 取消内容组(某条内容取消分组)
 */
export const modifyContentGroup = {
  baseUrl: '/cms/content/{id}/group',
  method: 'put',
  request: (id: string) => request({
    url: `/cms/content/${id}/group`,
    method: 'put'
  })
};

/**
 * 修改标签
 */
export const modifyTag = {
  baseUrl: '/cms/content/tag/{id}',
  method: 'put',
  request: (id: string, params?: { TagName?: string; }) => request({
    url: `/cms/content/tag/${id}`,
    method: 'put',
    params
  })
};

/**
 * 删除标签
 */
export const delTag = {
  baseUrl: '/cms/content/tag/{id}',
  method: 'delete',
  request: (id: string) => request({
    url: `/cms/content/tag/${id}`,
    method: 'delete'
  })
};

/**
 * 修改内容组
 */
export const modifyGroup = {
  baseUrl: '/cms/content/group/{Id}',
  method: 'put',
  request: (Id: string, data?: { id?: number; title?: string; description?: string; }) => request({
    url: `/cms/content/group/${Id}`,
    method: 'put',
    data
  })
};

/**
 * 获取属性
 */
export const getAttribute = {
  baseUrl: '/cms/content/{id}/attribute',
  method: 'get',
  request: (id: string) => request({
    url: `/cms/content/${id}/attribute`,
    method: 'get'
  })
};

/**
 * 添加属性
 */
export const modifyAttribute = {
  baseUrl: '/cms/content/{id}/attribute',
  method: 'put',
  request: (id: string, data?: { isTop?: boolean; isRecommend?: boolean; isHot?: boolean; isColor?: boolean; }) => request({
    url: `/cms/content/${id}/attribute`,
    method: 'put',
    data
  })
};

/**
 * 将内容从此标签移除
 */
export const modifyTagsremoved = {
  baseUrl: '/cms/content/{Id}/tagsremoved',
  method: 'put',
  request: (Id: string, params?: { TagId?: number; }) => request({
    url: `/cms/content/${Id}/tagsremoved`,
    method: 'put',
    params
  })
};

/**
 * 将内容移入回收站
 */
export const recoveryContent = {
  baseUrl: '/cms/content/{cid}',
  method: 'put',
  request: (cid: string | number) => request({
    url: `/cms/content/${cid}`,
    method: 'put'
  })
};

/**
 * 展示回收站内容
 */

export const recyclebinContent = {
  baseUrl: '/cms/recyclebin',
  method: 'get',
  request: (params?: { Page?: number; PageSize?: number; StartTime?: string; EndTime?: string; ChannelID?: number; checkedLevel?: any; fieldName?: any; Keyword?: string; }) => request({
    url: `/cms/recyclebin`,
    method: 'get',
    params
  })
}

//获取回收站所有内容

export const recyclebinAllContent = {
  baseUrl: '/cms/recyclebin/content',
  method: 'get',
  request: () => request({
    url: `/cms/recyclebin/content`,
    method: 'get',
  })
}

/**
 * 还原回收站内容
 */
export const restoreContent = {
  baseUrl: '/cms/recyclebin',
  method: 'put',
  request: (data?: { cid: string }) => request({
    url: `/cms/recyclebin`,
    method: 'put',
    data
  })
};

/**
* 清空回收站内容
*/
export const emptyRecyclebin = {
  baseUrl: '/cms/recyclebin/content',
  method: 'delete',
  request: (data?: { cid: any }) => request({
    url: `/cms/recyclebin/content`,
    method: 'delete',
    data
  })
};

/**
 * 转移栏目
 */
export const migrationChannel = {
  baseUrl: '/cms/migration/channel',
  method: 'put',
  request: (data?: { columnID?: any; moveColumnID?: any; isRemove?: boolean }) => request({
    url: '/cms/migration/channel',
    method: 'put',
    data
  })
}

/**
 * 转移内容
 */
export const migrationContent = {
  baseUrl: '/cms/migration/content',
  method: 'put',
  request: (data?: { columnID?: any; moveColumnID?: any; isRemove?: boolean }) => request({
    url: '/cms/migration/content',
    method: 'put',
    data
  })
}

/**
 * 转移栏目及内容
 */
export const migrationAll = {
  baseUrl: '/cms/migration/channelandcontent',
  method: 'put',
  request: (data?: { columnID?: any; moveColumnID?: any; isRemove?: boolean }) => request({
    url: '/cms/migration/channelandcontent',
    method: 'put',
    data
  })
}

/**
 * 审核内容
 */
export const modifyAudit = {
  baseUrl: '/cms/content/audit',
  method: 'put',
  request: (data?: { contentID?: any; checkedLevel?: any; contentCause?: string; isShift?: boolean; channelID?: number; }) => request({
    url: `/cms/content/audit`,
    method: 'put',
    data
  })
};

/**
 * 进行调整排序
 */
export const modifySort = {
  baseUrl: '/cms/content/{ContentId}/sort',
  method: 'put',
  request: (ContentId: string, data?: { upOrDowns?: any; }) => request({
    url: `/cms/content/${ContentId}/sort`,
    method: 'put',
    data
  })
};

/**
 * 调整组排序
 */
export const modifyGroupsort = {
  baseUrl: '/cms/content/{GroupId}/groupsort',
  method: 'put',
  request: (GroupId: string, data?: { upOrDowns?: any; }) => request({
    url: `/cms/content/${GroupId}/groupsort`,
    method: 'put',
    data
  })
};

/**
 * 从内容组中移除
 */
export const modifyGroups = {
  baseUrl: '/cms/content/{id}/groups',
  method: 'put',
  request: (id: string) => request({
    url: `/cms/content/${id}/groups`,
    method: 'put'
  })
};

/**
 * 删除内容组
 */
export const delGroup = {
  baseUrl: '/cms/content/group/{id}',
  method: 'delete',
  request: (id: string) => request({
    url: `/cms/content/group/${id}`,
    method: 'delete'
  })
};

/**
 * 删除敏感词
 */
export const delKeyword = {
  baseUrl: '/cms/content/keyword/{id}',
  method: 'delete',
  request: (id: string) => request({
    url: `/cms/content/keyword/${id}`,
    method: 'delete'
  })
};

