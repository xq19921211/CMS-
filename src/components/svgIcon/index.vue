<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class SvgIcon extends Vue {
  @Prop(String)
  private iconClass!: string;

  @Prop(String)
  private className?: string;

  get iconName() {
    return `#icon-${this.iconClass}`;
  }

  get svgClass() {
    if (this.className) {
      return 'svg-icon ' + this.className;
    } else {
      return 'svg-icon';
    }
  }
}
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 16px;
  height: 100%;
  fill: currentColor;
  overflow: hidden;
  text-align: center;
  margin-right:5px;
}
</style>
