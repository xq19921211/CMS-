/**
 * @description minio 图片转换函数
 * @param { obj } 
 */
export default function eachObj(obj: any) {
    if (typeof obj === 'object') {
        for (let i in obj) {
            if (typeof obj[i] === 'object') {
                eachObj(obj[i]);
            } else {
                if (obj[i].toString().indexOf('schoolbus') !== -1) {
                    obj[i] = parseFilePath(obj[i].toString());
                }
            }
        }
    } else {
        return obj;
    }
    return obj;
}

function parseFilePath(raw: string) {

    let parts = raw.replace('://', '').split('/');
    if (parts.length === 3) {
        let bucket = parts[1];
        let  filename = parts[2];
        return `/image/${bucket}/${filename}`;
    }
    // 不符合格式要求的无法转换
    return raw;
}

