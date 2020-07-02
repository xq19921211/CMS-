/**
    * @description 将扁平化数据 转换成 树状结构
    * @param {Array} arrayList 扁平化的数据
    * @param {String} pidStr parentId的key名
    * @param {String} idStr id的key名
    * @param {String} childrenStr children的key名
        */
type params = {
    arrayList: Array<any>;
    pidStr?: string;
    idStr?: string;
    childrenStr?: string;
    label?: string;
}

export default function format({ arrayList, pidStr = 'pid', idStr = 'id', childrenStr = 'children', label = 'label' }: params) {
    // 用来储存{key: obj}格式的对象
    let listOjb: any = {};
    // 用来储存最终树形结构数据的数组
    let treeList: Array<any> = [];
    // 将数据变换成{key: obj}格式，方便下面处理数据
    for (let i = 0; i < arrayList.length; i++) {
        listOjb[arrayList[i][idStr]] = arrayList[i];
        // 添加label属性
        listOjb[arrayList[i][idStr]].label = arrayList[i][label];
    }
    // 根据pid来将数据进行格式化
    for (let j = 0; j < arrayList.length; j++) {
        // 判断父级是否存在
        let haveParent = listOjb[arrayList[j][pidStr]]
        if (haveParent) {
            // 如果有没有父级children字段，就创建一个children字段
            !haveParent[childrenStr] && (haveParent[childrenStr] = [])
            // 在父级里插入子项
            haveParent[childrenStr].push(arrayList[j])
        } else {
            // 如果没有父级直接插入到最外层
            treeList.push(arrayList[j])
        }
    }
    return treeList
}