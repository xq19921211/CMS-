import Vue from 'vue';
import router from '@/router';
import canAccessView from '../utils/accessCheck';
import { dateFormat } from '@/utils/filters';

export default abstract class BaseView extends Vue {
  public constructor() {
    super();
    if (!this.canAccess()) {
      // router.push({ path: '/404' });
      // this.$message('没权限');
    }
  }

  // 全局日期格式化方法
  public $dateFormat: (d: string, fmt: string) => string = dateFormat;

  /**
   * 检查当前访问者是否满足所需的必要Api
   */
  public canAccess(): boolean {
    return canAccessView(this.constructor);
  }

}
