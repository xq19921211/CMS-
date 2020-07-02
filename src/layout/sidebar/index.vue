<template>
  <div class="sidebar">
    <div class="logo">
      <img src="../../assets/sidebar/logo-sidebar.png" alt />
    </div>
    <el-scrollbar>
      <el-menu
        v-if="routes"
        @select="select"
        :default-active="$route.matched[2]?$route.matched[2].path:$route.path"
        background-color="#0f2e65"
        text-color="#fff"
        active-text-color="#09508c"
      >
        <menu-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import canAccessView from '@/utils/accessCheck';
import { Vue, Component, Prop } from 'vue-property-decorator';
import menuItem from './item/index.vue';

@Component({
  components: {
    menuItem
  }
})
export default class Sidebar extends Vue {
  private routes: any = null;
  public select(index: any, indexPath: any) {}
  private async accessCheck(routes: any[]): Promise<any[]> {
    let results: any[] = [];
    for (let route of routes) {
      let component: any;
      // 组件存在
      if (route.component) {
        try {
          component = (await route.component()).default;
        } catch (e) {}
      }
      // 组件不存在 或者 存在的组件能访问
      if (!component || canAccessView(component)) {
        let result = Object.assign({}, route);
        // 有子路由
        if (route.children) {
          // 返回能访问的子组件数组
          result.children = await this.accessCheck(route.children);
          // 子路由全部不可访问且路由属性具有重定向 也就是栏目页
          // if(result.children.length == 0 && route.redirect){
          //   console.log(route)
          //   // 忽略当前路由 直接返回
          //   return results;
          // }
        }
        // 过滤掉空路由
        if (!result.children || result.children.length > 0) {
          // 加入路由表
          results.push(result);
        }
      }
    }
    return results;
  }

  private created() {
    this.accessCheck((this.$router as any).options.routes).then(
      (res) => (this.routes = res)
    );
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/variable.scss';
.sidebar {
  width: $sidebarWidth;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  border-right: 1px solid $borderColor;
  background: #0f2e65;
  .el-scrollbar {
    height: calc(100% - 60px);
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}
.logo {
  background: #0f2e65;
  height: $navbarHeight;
  padding-top: 6px;
  text-align: center;
}
</style>
<style lang="scss">
.sidebar {
  .el-scrollbar {
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}
</style>

