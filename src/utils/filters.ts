export const formatSvg = (html: string) => {
  return html.replace(
    'width="150" height="50" viewBox="0,0,150,50"',
    'width="100" height="38" viewBox="0,0,150,60"'
  );
};

// 格式化api列表用于饿了么树形组件使用
export const formatTree = (arr: any[], disabled: boolean = false) => {
  let tags: any = [];
  let tree: any = [];
  arr.forEach((item: any) => {
    item.disabled = disabled ? true : false;
    tags.push(item.tag);
  });
  tags = [...new Set(tags)];
  let count = 0;
  tags.forEach((item: any, index: number) => {
    count++;
    tree.push({
      id: index,
      name: item,
      tag: item,
      children: []
    });
  });
  tree.forEach((item: any, index: number) => {
    item.disabled = disabled ? true : false;
    arr.forEach((value) => {
      if (value.tag === item.tag) {
        value.id = ++count;
        item.children.push(value);
      }
    });
  });
  return tree;
};


// 定义过滤器，用于转换后端返回的 空字符， NaN, null, undefine
type v = number | string | undefined | null;
export const formatNull = <T extends v>(value: T): string | number => {
  if (value === null || value === 'undefined' || value === '') {
    return '暂无';
  } else if (value === 'NaN') {
    return 0;
  } else {
    return value as string;
  }
};


// 日期格式化
/**
 * 
 * @param  { d } 日期
 * @param { fmt } 格式
 */
export function dateFormat(d: string, fmt: string) {
  let ret;
  let date = new Date(d);
  const opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };

  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? ((opt as any)[k]) : ((opt as any)[k].padStart(ret[1].length, "0")));
    }
  }
  return fmt;
}


// 时间戳转标准时间

export function formatDate(value:number) {
  const date:any = new Date(value);
  const YY = date.getFullYear() + '-';
  const MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  const DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  const hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  const mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  const ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return YY + MM + DD + " " + hh + mm + ss;
}