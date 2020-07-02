/**
 * @description 图像拼接
 * @param {[]}  饿了么上传文件组件 的文件数组
 * @returns { File }  返回拼接好的 new File()
 */
export const splicePhoto = async (fileList: any) => {
    // 如果文件列表长度不大于1则直接返回Flies
    if (fileList.length > 1) {
        let canvas = document.createElement('canvas');
        let ctx: any = canvas.getContext("2d");
        ctx.fillStyle = 'rgba(255, 255, 255, 0)';
        let imageArr: any = [];
        let flag = 0;
        // 将文件列表中的图片url转为image对象 并等图片全部加载完毕之后进行下一步
        await new Promise((resolve, reject) => {
            fileList.map((item: any, index: number) => {
                let image = new Image();
                image.src = item.url;
                image.onload = () => {
                    imageArr.push(image);
                    flag++;
                    if (flag === fileList.length) {
                        resolve();
                    }
                };
            });
        });
        // canvas的宽度取所有图片中最宽的
        canvas.width = imageArr.reduce((itemA: any, itemB: any) => itemA.width > itemB.width ? itemA.width : itemB.width);
        // canvas的高度取所有图片的高度总和
        let height = 0;
        imageArr.map((item: any) => {
            height += item.height;
        });
        canvas.height = height;
        // 在canvas上画图 ，当前图片在y轴的位置为，前面几张图的高度和
        let h = 0;
        imageArr.map((item: any) => {
            ctx.drawImage(item, 0, h);
            h += item.height;
        });
        let flie = null;
        // 将canvas转为blob之后转为File
        await new Promise((resolve, reject) => {
            canvas.toBlob((blob: any) => {
                flie = new File([blob], "png", { type: "image/png", lastModified: Date.now() });
                resolve();
            });
        });
        return flie;
    } else if (fileList.length === 1) {
        return fileList[0].raw;
    } else {
        // console.error('请检查使用图片转换函数所传参数');
    }
};



