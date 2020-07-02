<template>
  <component v-bind="generateLink(url)">
    <el-menu-item :index="url">
      <slot/>
    </el-menu-item>
  </component>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { isExternal } from '@/utils';
@Component
export default class Link extends Vue {
  @Prop() public url!: string;

  private generateLink(url: string): object {
    if (isExternal(url)) {
      return {
        is: 'a',
        href: url,
        target: '_blank',
        rel: 'noopener noreferrer'
      };
    }
    return {
      is: 'router-link',
      to: url
    };
  }
}
</script>
