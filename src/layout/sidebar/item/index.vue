<template>
  <div class="menu-wrapper" v-if="!item.hidden">
    <link-to v-if="!item.children||item.children&&allChildAreHidden(item.children)" :url="basePath">
      <svg-icon :icon-class="item.meta&&item.meta.icon"></svg-icon>
      {{item.meta.title}}
    </link-to>

    <el-submenu v-else :index="item.path">
      <template slot="title">
        <svg-icon :icon-class="item.meta&&item.meta.icon"></svg-icon>
        <span>{{item.meta.title}}</span>
      </template>
      <menu-item
        v-for="route in item.children"
        :index="route.path"
        :key="route.path"
        :item="route"
        :base-path="resolvePath(route.path)"
        style="margin-left:-10px"
      />
    </el-submenu>
  </div>
</template>
<script lang="ts">
import Path from 'path';
import { Vue, Component, Prop } from 'vue-property-decorator';
import linkTo from './link.vue';

@Component({
  name: "menuItem",
  components: {
    linkTo
  }
})
export default class MenuItem extends Vue {
  @Prop() private item!: any;
  @Prop() private basePath!: string;

  private allChildAreHidden(children: any) {
    const hiddenChildren = children.filter((item: any) => {
      return item.hidden;
    });
    return hiddenChildren.length === children.length;
  }

  private resolvePath(routePath: string): string {
    return Path.resolve(this.basePath, routePath);
  }
}
</script>
<style lang="sass">

</style>>
