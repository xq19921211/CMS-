<template>
  <div class="content">
    <keep-alive>
      <channeltree ref="tree" @clickNode="getNode" />
    </keep-alive>
    <transition name="fade-to-left" mode="out-in">
      <keep-alive>
        <component
          :is="component"
          :channelName="channelName"
          :channelId="channelId"
          :content="content"
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

import { getContent } from "@/api/backgroundSystem/Content";
@Component({
  components: { channeltree, list, modify, add }
})
export default class Content extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription(getContent.baseUrl,getContent.method)
  ];

  // 视图数据
  private channelName: string = "";
  private channelId: string = "";
  private contentId: string = "";
  private content: any = {};
  // 动态组件名
  private component: string = "list";

  private created() {}

  // 接收栏目列表子组件数据
  private getNode(data?: any) {
    this.channelId = data.id;
    this.channelName = data.channelName;
    this.component = "list";
    if (this.$route.path !== "/site/main/contents") {
      this.$router.push("/site/main/contents");
    }
  }

  // 组件切换
  private change(v: string, content: any) {
    this.component = v;
    if (content) {
      this.content = content;
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
}
</style>
