import VueRouter from 'vue-router';
import { RouterOptions } from 'vue-router';
import { RouteConfig } from 'vue-router';

/**
 * 修复routes中的自定义hidden属性报错信息
 * 给默认VueRouter的声明文件添加自定义属性，
 */

export default class Router extends VueRouter {
    constructor(options: Options) {
        super(options);
    }
}

interface Options extends RouterOptions {
    routes?: Config[];

}

interface Config extends RouteConfig {
    hidden?: boolean;
}

