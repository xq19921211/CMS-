<template>
  <el-card style="min-height:100%; flex:1; transition: width 0.2s linear;">
    <div slot="header" class="clearfix">
      <span @click="initData">栏目-{{channelName}}-添加内容</span>
    </div>
    <div class="content">
      <el-scrollbar>
        <el-form ref="addContentform" :model="formData" label-width="150px">
          <el-col :span="16" :offset="3">
            <el-form-item label="标题" prop="title">
              <el-input v-model.trim="formData.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16" :offset="3">
            <el-form-item label="副标题" prop="subTitle">
              <el-input v-model.trim="formData.subTitle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16" :offset="3">
            <el-form-item label="作者" prop="author">
              <el-input v-model.trim="formData.author"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16" :offset="3">
            <el-form-item label="添加时间" prop="addDate">
              <el-date-picker
                class="sp"
                v-model="formData.addDate"
                type="datetime"
                placeholder="选择添加时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="16" :offset="3">
            <el-form-item label="图片附件" prop="imagePath">
              <el-upload
                ref="uploadImage"
                action
                :auto-upload="false"
                multiple
                :limit="2"
                list-type="picture"
                accept="image/jpg, image/jpeg, image/png"
              >
                <el-button size="small" type="primary">选取文件</el-button>
              </el-upload>
            </el-form-item>
          </el-col>

          <el-col :span="16" :offset="3">
            <el-form-item label="视频附件" prop="videoPath">
              <el-upload
                ref="uploadVideo"
                action
                :auto-upload="false"
                multiple
                :limit="1"
                accept="video/mp4"
                :on-change="uploadSize"
              >
                <el-button size="small" type="primary">选取文件</el-button>
              </el-upload>
            </el-form-item>
          </el-col>

          <el-col :span="16" :offset="3">
            <el-form-item label="标签" prop="tagsName">
              <el-tag
                :key="tag"
                v-for="tag in formData.tagsName"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >{{tag}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              />
              <el-button v-else class="button-new-tag" size="small" @click="showInput">添加标签</el-button>
            </el-form-item>
          </el-col>

          <el-col :span="16" :offset="3">
            <el-col :span="6">
              <el-form-item label="是否置顶内容" prop="isTop">
                <el-switch v-model="formData.isTop" class="mr-1"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否推荐内容" prop="isRecommend">
                <el-switch v-model="formData.isRecommend" class="mr-1"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否热点内容" prop="isHot">
                <el-switch v-model="formData.isHot" class="mr-1"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否醒目内容" prop="isColor">
                <el-switch v-model="formData.isColor" class="mr-1"></el-switch>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="22">
            <el-form-item label="内容" prop="comments">
              <ueditor ref="ueditor" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item style="display: flex;justify-content: flex-end;margin-bottom:50px">
              <el-button type="primary" @click="addContent">立即添加</el-button>
              <el-button @click="back">取消</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-scrollbar>
    </div>
  </el-card>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import { formatDate } from "@/utils/filters";
import { addContent } from "@/api/backgroundSystem/Content";
// import editor from "./editor.vue";
import ueditor from "@/components/ueditor/ueditor.vue";

@Component({
  components: {
    ueditor
  }
})
export default class addContents extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription(addContent.baseUrl, addContent.method)
  ];

  private channelName?: any;

  private channelId?: any;

  // 组件显隐控制
  private addVisible: boolean = false;
  private updataPasswordVisible: boolean = false;

  // 视图数据
  private formData: any = {
    tagsName: [],
    title: "",
    subTitle: "",
    author: "",
    addDate: new Date(),
    isTop: false,
    isRecommend: false,
    isHot: false,
    isColor: false,
    comments: ""
  };
  private formDataCopy: any = (() => JSON.stringify(this.formData))();
  // 标签属性
  private inputVisible = false;
  private inputValue = "";

  private created() {
    this.channelId = this.$route.query.channelId;
    this.channelName = this.$route.query.channelName;
  }

  private uploadSize(file: any) {
    console.log(file);
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      this.$message.error("上传视频大小不能超过10MB!");
      return false;
    }
  }

  private initData() {}

  // 添加内容
  private addContent() {
    let formData = new FormData();
    let imagePath = "";
    let videoFilePath = "";
    let filePath = "";
    if ((this.$refs as any).uploadImage.uploadFiles.length > 0) {
      imagePath = (this.$refs as any).uploadImage.uploadFiles[0].raw;
    }
    if ((this.$refs as any).uploadVideo.uploadFiles.length > 0) {
      videoFilePath = (this.$refs as any).uploadVideo.uploadFiles[0].raw;
    }
    formData.append("imagePath", imagePath);
    formData.append("videoFilePath", videoFilePath);

    if (this.formData.tagsName.length == 1) {
      formData.append("tagsName", " ");
    }

    this.formData.tagsName.forEach((item: string) => {
      formData.append("tagsName", item);
    });
    formData.append("columnId", <string>this.channelId);
    formData.append("title", this.formData.title);
    formData.append("subTitle", this.formData.subTitle);
    formData.append("author", this.formData.author);
    formData.append("addDate", formatDate(this.formData.addDate));
    formData.append("isTop", this.formData.isTop);
    formData.append("isRecommend", this.formData.isRecommend);
    formData.append("isHot", this.formData.isHot);
    formData.append("isColor", this.formData.isColor);
    const ueditorContent = (this.$refs as any).ueditor.content;
    formData.append("content", ueditorContent);

    addContent
      .request(formData)
      .then((res: any) => {
        this.$message.success("添加成功！");
        this.clearData();
        this.$emit("upcontent");
        this.$router.push("/site/main/contents");
      })
      .catch(err => this.$message.warning("请选择添加时间"));
  }
  private back() {
    this.$router.push("/site/main/contents");
  }

  // 删除标签
  private handleClose(tag: any) {
    this.formData.tagsName.splice(this.formData.tagsName.indexOf(tag), 1);
  }
  // 显示标签输入框
  showInput() {
    this.inputVisible = true;
    this.$nextTick(() => {
      (this.$refs.saveTagInput as any).$refs.input.focus();
    });
  }

  // 添加标签
  private handleInputConfirm() {
    let inputValue = this.inputValue;
    if (inputValue) {
      this.formData.tagsName.push(inputValue);
    }
    this.inputVisible = false;
    this.inputValue = "";
  }

  private clearData() {
    (this.$refs as any).uploadImage.clearFiles();
    (this.$refs as any).uploadVideo.clearFiles();
    this.formData = JSON.parse(this.formDataCopy);
    (this.$refs as any).ueditor.content = "";
  }

  private deactivated() {
    // this.clearData();
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: calc(100vh - 200px);
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
