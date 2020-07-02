"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var axios_1 = require("axios");
var path = require("path");
var mode = process.argv[2] || 'all';
function getSwagger() {
    var swaggerUrl = 'http://192.168.1.212:3000/swagger/json';
    return new Promise(function (resolve, reject) {
        axios_1.default.get(swaggerUrl).then(function (res) {
            resolve(res.data);
        }).catch(function (err) {
            reject(err);
        });
    });
}
function writeFile(filePath, file) {
    fs.open(filePath, 'a+', function (err, fd) {
        if (err) {
            return console.error('打开文件失败');
        }
        else {
            try {
                var data = fs.readFileSync(fd, 'utf-8');
                if (!data) {
                    fs.writeFileSync(fd, "import request from '../interceptor';\n\n\n");
                }
            }
            catch (e) {
                console.error('读取文件失败！' + e);
            }
            try {
                fs.writeFileSync(fd, file);
            }
            catch (e) {
                console.error('文件写入失败' + e);
            }
        }
    });
}
function delDir(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                delDir(curPath);
            }
            else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}
function mkdirPath(pathStr) {
    var projectPath = path.join(process.cwd());
    var tempDirArray = pathStr.split('\\');
    for (var i = 0; i < tempDirArray.length; i++) {
        projectPath = projectPath + '/' + tempDirArray[i];
        if (fs.existsSync(projectPath)) {
            var tempstats = fs.statSync(projectPath);
            if (!(tempstats.isDirectory())) {
                fs.unlinkSync(projectPath);
                fs.mkdirSync(projectPath);
            }
        }
        else {
            fs.mkdirSync(projectPath);
        }
    }
    return projectPath;
}
function resolveDir(dir) {
    return path.join(dir);
}
function resolveDirs(dir) {
    return path.join(__dirname, dir);
}
var types = [{ type: 'object', show: '?: any' }, { type: 'boolean', show: '?: boolean' }, { type: 'array', show: '?: any' }, { type: 'string', show: '?: string' }, { type: 'integer', show: '?: number' }, { type: 'number', show: '?: number' }];
function modelFormat(data) {
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var element = data[key];
            var _loop_1 = function (key_1) {
                var prop = element.properties[key_1];
                if (prop.type) {
                    var show = types.filter(function (item) { return item.type == prop.type; })[0].show;
                    element.properties[key_1] = show;
                }
                else {
                    element.properties[key_1] = '?: any';
                }
            };
            for (var key_1 in element.properties) {
                _loop_1(key_1);
            }
        }
    }
    return data;
}
function switchUrl(url) {
    var a = url.replace(/\{/g, '${');
    return '`' + a + '`';
}
function getApiName(url, method) {
    var names = [{ method: 'get', name: 'get' }, { method: 'post', name: 'add' }, { method: 'put', name: 'modify' }, { method: 'patch', name: 'update' }, { method: 'delete', name: 'del' }];
    var surname = url.split('/')[url.split('/').length - 1].includes('{') ? url.split('/')[url.split('/').length - 2] : url.split('/')[url.split('/').length - 1];
    var name = names.filter(function (item) { return item.method == method; })[0].name;
    surname = surname.substring(0, 1).toUpperCase() + surname.substring(1);
    return name + surname;
}
function apiFormat(data, model) {
    var apis = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var element = data[key];
            var baseUrl = key;
            var _loop_2 = function (k) {
                var prop = element[k];
                var mothod = k;
                var parameters = prop.parameters;
                var name_1 = getApiName(baseUrl, mothod);
                var api = {
                    url: key,
                    method: mothod,
                    description: prop.summary,
                    tags: prop.tags,
                    name: name_1
                };
                if (parameters) {
                    parameters.forEach(function (item) {
                        var el = item;
                        var type = el.in;
                        if (type == 'path') {
                            if (api.path) {
                                api.path.push(el.name + ': string');
                            }
                            else {
                                api.path = [];
                                api.path.push(el.name + ': string');
                            }
                        }
                        else if (type == 'body') {
                            if (el.schema.$ref) {
                                var ref = el.schema.$ref.split('/')[el.schema.$ref.split('/').length - 1];
                                api.data = model[ref].properties;
                            }
                            else if (el.schema.properties) {
                                var properties = modelFormat({ schema: el.schema });
                                api.data = properties.schema.properties;
                            }
                        }
                        else if (type == 'query') {
                            var show = '?: any';
                            if (el.type) {
                                show = types.filter(function (i) { return i.type == el.type; })[0].show;
                            }
                            else if (el.schema.type) {
                                show = types.filter(function (i) { return i.type == el.schema.type; })[0].show;
                            }
                            if (api.params) {
                                api.params[el.name] = show;
                            }
                            else {
                                api.params = {};
                                api.params[el.name] = show;
                            }
                        }
                    });
                }
                apis.push(api);
            };
            for (var k in element) {
                _loop_2(k);
            }
        }
    }
    return apis;
}
function tagsFormat(tag) {
    var temp = [];
    tag.map(function (item, index) {
        if (temp.length == 0) {
            temp.push(item.name);
        }
        else {
            if (!temp.includes(item.name)) {
                temp.push(item.name);
            }
        }
    });
    return temp;
}
var apiTemplate = {
    description: function (des) { return "/**\n * " + des + "\n */\n"; },
    init: function (api) {
        var pathStr = '';
        var paramsStr = '';
        var params = '';
        var dataStr = '';
        var data = '';
        if (api.path) {
            api.path.forEach(function (item, index) {
                if (index) {
                    pathStr += ', ' + item;
                }
                else {
                    pathStr += item;
                }
            });
        }
        if (api.params) {
            if (pathStr) {
                paramsStr += ',';
            }
            params += ',\n    params';
            paramsStr += 'params?: {';
            for (var key in api.params) {
                if (api.params.hasOwnProperty(key)) {
                    var element = api.params[key];
                    paramsStr += key + element + ';';
                }
            }
            paramsStr += '}';
        }
        if (api.data) {
            if (paramsStr || pathStr) {
                dataStr += ',';
            }
            data += ',\n    data';
            dataStr += 'data?: {';
            for (var key in api.data) {
                if (api.data.hasOwnProperty(key)) {
                    var element = api.data[key];
                    dataStr += key + element + ';';
                }
            }
            dataStr += '}';
        }
        var template = 'export const ' + api.name + ' = {' + '\n' + '  ' + 'baseUrl: ' + '\'' + api.url.replace('/api', '') + '\'' + ',\n' + '  method: ' + '\'' + api.method + '\'' + ', \n' + '  request: (' + pathStr + paramsStr + dataStr + ') => request({\n    url:' + switchUrl(api.url.replace('/api', '')) + ',\n' + '    method: ' + '\'' + api.method + '\'' + params + data + '\n  })\n};\n\n';
        return this.description(api.description) + template;
    }
};
function filterApi(apis) {
    if (mode === 'bg') {
        var midTags_1 = ['commmon', 'service', 'role', 'user', 'menu', 'fileConfig', 'SMSVoice'];
        return apis.filter(function (item) { return !midTags_1.includes(item.tags[0]); });
    }
    else if (mode === 'service') {
        var str = fs.readFileSync('.env.dev').toString();
        var services = str.match(/VUE_APP_SERVICE_NAME.+/g);
        if (services) {
            var service_1 = services.map(function (item) {
                var temp = item.split('=')[1].trim();
                return '/' + temp;
            });
            var api = apis.filter(function (item) {
                var flag = false;
                service_1.forEach(function (i) {
                    if (item.url.includes(i)) {
                        flag = true;
                    }
                });
                return flag;
            });
            return api;
        }
        else {
            console.log('未在.env.dev中读取到服务，请先按格式设置服务名');
            return apis;
        }
    }
    else {
        return apis;
    }
}
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var basePath, path, data, api, mode, formatModel, formatApi, apis;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    basePath = './src/api/backgroundSystem';
                    path = resolveDirs(basePath);
                    return [4, getSwagger()];
                case 1:
                    data = _a.sent();
                    api = data.paths;
                    mode = data.definitions;
                    formatModel = modelFormat(mode);
                    formatApi = apiFormat(api, formatModel);
                    apis = filterApi(formatApi);
                    delDir(path);
                    mkdirPath(resolveDir(basePath));
                    apis.forEach(function (item) {
                        var str = apiTemplate.init(item);
                        var filePath = path + '/' + item.tags[0] + '.ts';
                        writeFile(filePath, str);
                    });
                    return [2];
            }
        });
    });
}
run();
