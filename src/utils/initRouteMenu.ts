import system from '@/router/system';

export function initRouteMenu(target: any, menu: object[]): any {
  const base: string = '/api';
  let matched: string[] = [];
  menu.forEach((item: any) => {
    if (item.url === `${base}/user/list`) {
      matched.push('user');
    }
    if (item.url === `${base}/role/list`) {
      matched.push('role');
    }
  });
}
