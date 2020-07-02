<template>
  <div class="content">
    <channeltree ref="tree" @clickNode="getNode" @initData="initData" />
    <transition name="fade-to-left" mode="out-in">
      <keep-alive>
        <component
          :is="component"
          :channelName="channelName"
          :groupName="groupName"
          :indexName="indexName"
          :parentId="parentId"
          :channel="channel"
          @change="change"
          @updateTree="updateTree"
        />
      </keep-alive>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";

import channeltree from "@/components/channelTree/index.vue";
import list from "./list.vue";
import modify from "./modify.vue";
import add from "./add.vue";

import { getChannel } from "@/api/backgroundSystem/Channel";

@Component({
  components: { channeltree, list, modify, add }
})
export default class Channel extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/user/list")
  ];

  // 视图数据
  private groupName: string = "";
  private parentId: any = 0;
  private indexName: string = "";
  private channel: any = {};
  private channelName: string = "";
  
  // 动态组件名
  private component: string = "list";

  private created() {}

  // 接收栏目列表子组件数据
  private getNode(data?: any) {
    this.parentId = data.id;
    this.channelName = data.channelName;
    this.groupName = data.groupName;
    this.component = "list";
    if (this.$route.path !== "/site/main/channel") {
      this.$router.push("/site/main/channel");
    }
  }

  // 初始化栏目
  private data: any = { id: 0 };
  private initData() {
    this.getNode(this.data);
  }

  // 组件切换
  private change(v: string, channel: any) {
    this.component = v;
    if (channel) {
      this.channel = channel;
    }
  }

  // 刷新栏目
  private updateTree() {
    (this.$refs as any).tree.initData();
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex: 1;
}
</style>
