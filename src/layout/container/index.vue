<template>
  <div class="container">
    <transition name="fade-transform" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class Container extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/styles/variable.scss';
.container {
  position: relative;
  background: rgb(243,243,243);
  height: calc(100% - #{$navbarHeight});
  width: 100%;
  padding: 20px;
  overflow: auto;
  & > div {
    height: 100%;
  }
}
</style>
