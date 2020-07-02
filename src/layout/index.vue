<template>
  <div class="app-wrapper">
    <Sidebar/>
    <div class="app-main">
      <Navbar/>
      <Container/>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Navbar from './navbar/index.vue';
import Sidebar from './sidebar/index.vue';
import Container from './container/index.vue';

@Component({
  components: {
    Navbar,
    Sidebar,
    Container
  }
})
export default class Layout extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/styles/variable.scss";
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .app-main {
    position: fixed;
    left: 0;
    top: 0;
    width: calc(100% - #{$sidebarWidth});
    height: 100%;
    margin-left: $sidebarWidth;
  }
}
</style>