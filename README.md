# 注意!!!

项目拉下来第一件事把`.git`文件删了

# vue-admin-template-typescript-element

## 安装依赖
```
npm install
```

### 运行
```
npm run dev
```

### 业务部分文件位置约定
- 中台api在src/api/middleSystem.ts
- 后台api在src/api下新建文件夹编写
- 路由部分在src/router下新建文件，并引入到src/router/index.ts中
- 视图部分在src/view下新建文件夹

### 服务配置约定
- 应按以下格式配置服务（以 VUE_APP_SERVICE_NAME 开头即可）
```
#service name
VUE_APP_SERVICE_NAME = schoolbus
VUE_APP_SERVICE_NAME_NoOmission = NoOmission
VUE_APP_SERVICE_NAME_Personnel = personnel

```



### 自定义脚本npm run initApi
- 此命令用于获取http://192.168.1.212:3000上的swagger数据，将swagger数据转换为可直接使用的.ts文件
- npm run initApi 表示获取所有api
- npm run initApi bg 表示只生成后台api
- npm run initApi service 表示只生成特定服务的api
- npm run initApi service 只有在 .env.dev 文件中按格式配置了服务名才会生效

### 视图编写细节参考
参考校车项目 [国联校车后台管理系统](http://git.gl-ns.com/SDG/SchoolBusManagementSystemWeb).
