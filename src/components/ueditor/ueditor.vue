<template>
  <vue-ueditor-wrap v-model="content" :config="ueConfig" @ready="ready" mode="listener"></vue-ueditor-wrap>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import { addImage } from "@/api/backgroundSystem/Channel";
import VueUeditorWrap from "vue-ueditor-wrap";

@Component({
  components: {
    VueUeditorWrap
  }
})
export default class Ueditor extends BaseView {
  
  private content: string = "";
  @Prop()
  private comments?: string;
  private ueConfig = {
    // 初始容器高度
    initialFrameHeight: 400,
    // 初始容器宽度
    initialFrameWidth: "100%",
    // 上传文件接口
    enableAutoSave: false,
    elementPathEnable: false,
    wordCount: false,
    UEDITOR_HOME_URL: "/UEditor/",
    initialContent: "",

    // 图片上传地址
    imageActionName: process.env.VUE_APP_UEDITOR_SIMPLEUPLOADURL_PATH,
    // 图片上传字段
    imageFieldName: "imagePath",
    // 视频上传地址
    videoActionName: process.env.VUE_APP_UEDITOR_VIDEOUPLODEURL_PATH,
    // 视频上传字段
    videoFieldName: "videFilePath",
    // 附件上传地址
    fileActionName: process.env.VUE_APP_UEDITOR_FILEACTIONNAME_PATH,
    // 附件上传字段
    fileFieldName: 'filePath',
    // 多图上传在线管理获取素材列表地址
    imageManagerActionName: process.env.VUE_APP_UEDITOR_IMAGEMANAGERACTIONNAME_PATH,
    // 文件上传在线管理获取素材列表地址
    fileManagerActionName: process.env.VUE_APP_UEDITOR_IMAGEMANAGERACTIONNAME_PATH,
    // 图片路径替换
    imgUrl: process.env.VUE_APP_IMAGE_PATH,
    // api根路径
    serverUrl: process.env.VUE_APP_BASE_PATH
  };

  private mounted() {
    this.content = this.ueConfig.initialContent;
  }

  @Watch("comments", { immediate: true })
  private channelChange() {
    if (this.comments) {
      this.content = this.ueConfig.initialContent = this.comments;
    } else {
      this.content = "";
    }
  }
  //实例
  ready() {}
}
</script>