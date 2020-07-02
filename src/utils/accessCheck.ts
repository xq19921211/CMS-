import BaseView from '@/views/baseView';
import { ApiDescription } from './apiDescription';
import store from '@/store';

/**
 * 检查当前用户是否可以访问指定视图
 * @param view 视图
 */
export default function canAccessView<TView extends BaseView>(
  view:
    | {
      necessaryApis: ApiDescription[];
      new(): TView;
    }
    | ApiDescription[]
    | any
): boolean {
  let necessaryApis: ApiDescription[] = [];
  // 传入的参数是数组
  if (view instanceof Array) {
    // 直接取用
    necessaryApis = view;
    // 传入的参数是一个class 或者说是组件
  } else {
    if (view.url && view.method) {
      necessaryApis = [view];
    } else if (view.necessaryApis) {
      // 取出组件种定义的必须apis字段
      necessaryApis = view.necessaryApis;
    } else { return true; }
  }
  // 视图没有任何必要的api 则允许访问
  if (!necessaryApis || necessaryApis.length === 0) {
    return true;
  }

  // 取出用户的权限访问菜单
  let list = store.getters.menuList;

  // 循环必要的api数组
  for (let nApi of necessaryApis) {
    let flag = false;
    // 循环用户权限菜单
    for (let api of list) {
      // 用户权限菜单中 含有此页面的必须api 则允许访问
      if (api.url === `/api${nApi.url}` && api.method === nApi.method) {
        flag = true;
        // console.log(`${api.url}&${api.method} - /api${nApi.url}&${nApi.method}`)
        break;
      }
    }
    // 拒绝访问
    if (!flag) {
    //console.log(nApi);
      return false;
    }
  }
  return true;
}
