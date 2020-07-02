// 缩略图转换函数
export const abbreviation = (resource: string, width: number, height: number) => {
    if (typeof (resource) === 'string') {
        width = width || 35;
        height = height || 50;
        let arr = resource.split(".");
        arr[arr.length - 2] = arr[arr.length - 2] + `_${width}_${height}_crop`;
        let str = '';
        arr.map((item: any, index: number) => {
            if (arr.length - 1 !== index) {
                str += `${item}.`;
            } else {
                str += item;
            }
        });
        return str;
    } else {
        return resource;
    }
};
