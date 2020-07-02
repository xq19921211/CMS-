<template>
  <div class="channel-container">
    <el-card class="channel-tree">
      <div slot="header" class="clearfix header">
        <span @click="initData" >栏目列表</span>
      </div>
      <div>
        <el-tree
          :data="treeData"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          class="sp"
          highlight-current
        >
          <span class="custom-tree-node" slot-scope="{ node }">
            <span @click="clickNode(node)" class="node">
              <svg-icon icon-class="wjj" class="svg"></svg-icon>
              {{ node.label }}
            </span>
          </span>
        </el-tree>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import formatTree from "@/utils/formatTree";

import { getChannel } from "@/api/backgroundSystem/Channel";

@Component({
  components: {}
})
export default class channelTree extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription(getChannel.baseUrl, getChannel.method)
  ];

  // 视图数据
  private treeData: any = [];

  private created() {
    this.initData();
  }

  //动态刷新栏目列表
  private initData() {
    getChannel.request().then((res: any) => {
      let tree = formatTree({
        arrayList: res,
        pidStr: "parentId",
        label: "channelName"
      });
      this.treeData = tree;
      this.$emit("initData")
    });
  }

  private clickNode(node: any) {
    let data = node.data;
    this.$emit("clickNode", data);
  }

}
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
}
.node {
  display: inline-block;
  padding: 10px 0;
  .svg {
    width: 17px;
    height: 14px;
  }
}

.channel-container {
  height: 100%;
  overflow:scroll;
  margin-right: 20px;
  transition: width 0.2s linear;
}
.channel-tree {
  min-width: 200px;
  height: 100%;
  overflow:scroll;
  transition: width 0.2s linear;
}
::-webkit-scrollbar{
  display: none;
}
</style>
