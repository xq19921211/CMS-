<template>
  <div>
      <el-button type="success">添加标签</el-button>
  </div>
</template>

<script lang="ts">

import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
@Component({
    components: {}
  })
 export default class contag extends BaseView{
  
 }

</script>

<style lang="scss" scoped>
</style>