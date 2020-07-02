export enum HttpMethod {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Delete = 'delete',
  Option = 'option',
  Head = 'head',
  Patch = 'patch'
}

export class ApiDescription {
  public method: string = 'get';
  public url: string = '';

  public constructor(url: string, method: string = 'get') {
    this.url = url;
    this.method = method;
  }
}
