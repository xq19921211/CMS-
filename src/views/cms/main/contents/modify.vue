<template>
  <el-card style="min-height:100%; flex:1; transition: width 0.2s linear;">
    <div slot="header" class="clearfix">
      <span @click="initData">栏目-{{formData.channelName}}-修改内容</span>
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
                :limit="3"
                :file-list="imageFileList"
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
                :limit="3"
                :file-list="videoFileList"
                accept="video/mp4, video/flv"
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
              <ueditor ref="ueditor" :comments="formData.content" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item style="display: flex;justify-content: flex-end;margin-bottom:50px">
              <el-button type="primary" @click="modifyContent">立即修改</el-button>
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
import { modifyContent } from "@/api/backgroundSystem/Content";
// import editor from "./editor.vue";
import ueditor from "@/components/ueditor/ueditor.vue";

@Component({
  components: {
    ueditor
  }
})
export default class modifyContents extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription(modifyContent.baseUrl, modifyContent.method)
  ];

  @Prop()
  private channelId?: string;
  @Prop()
  private channelName?: string;

  // 组件显隐控制
  private addVisible: boolean = false;
  private updataPasswordVisible: boolean = false;

  // 视图数据
  private formData: any = {
    tagsName: [],
    title: "",
    subTitle: "",
    author: "",
    addDate: "",
    isTop: false,
    isRecommend: false,
    isHot: false,
    isColor: false,
    comments: ""
  };
  // 标签属性
  private inputVisible = false;
  private inputValue = "";

  // 文件列表
  private imageFileList: any = [];
  private videoFileList: any = [];

  private created() {
    this.formData = this.$route.query.rowdata;
    this.formData = JSON.parse(JSON.stringify(this.formData));
    this.formData.imagePath.forEach((item: string) => {
      this.imageFileList.push({
        url: item.replace("http://192.168.10.200:9000", "/image")
      });
    });
    this.formData.videoFilePath.forEach((item: string) => {
      this.videoFileList.push({ url: item });
    });
  }

  private initData() {}

  private clearData() {
    this.imageFileList = [];
    this.videoFileList = [];
    (this.$refs as any).uploadImage.clearFiles();
    (this.$refs as any).uploadVideo.clearFiles();
  }

  private deactivated() {
    this.clearData();
  }
  private back() {
    this.$router.push("/site/main/contents");
  }
  // 修改内容
  private modifyContent() {
    let formData = new FormData();
    let imagePath = "";
    let videoFilePath = "";
    let filePath = "";

    let imagePathFiles = (this.$refs as any).uploadImage.uploadFiles;
    if (imagePathFiles.length > 0) {
      if (imagePathFiles.length == 1) {
        if (imagePathFiles[0].raw) {
          formData.append("imagePath", imagePathFiles[0].raw);
          console.log(imagePathFiles[0].raw);
        } else {
          formData.append("imagePath", " ");
          formData.append(
            "imagePath",
            imagePathFiles[0].url.replace(
              "/image",
              "http://192.168.10.200:9000"
            )
          );
        }
      } else {
        imagePathFiles.forEach((item: any) => {
          if (item.raw) {
            formData.append("imagePath", item.raw);
          } else {
            formData.append(
              "imagePath",
              item.url.replace("/image", "http://192.168.10.200:9000")
            );
          }
        });
      }
    } else {
      formData.append("imagePath", imagePath);
    }
    let videoPathFiles = (this.$refs as any).uploadVideo.uploadFiles;
    if (videoPathFiles.length > 0) {
      if (videoPathFiles.length == 1) {
        if (videoPathFiles[0].raw) {
          formData.append("videoFilePath", videoPathFiles[0].raw);
        } else {
          formData.append("videoFilePath", " ");
          formData.append("videoFilePath", videoPathFiles[0].url);
        }
      } else {
        videoPathFiles.forEach((item: any) => {
          if (item.raw) {
            formData.append("videoFilePath", item.raw);
          } else {
            formData.append("videoFilePath", item.url);
          }
        });
      }
    } else {
      formData.append("videoFilePath", videoFilePath);
    }

    if (this.formData.tagsName.length == 1) {
      formData.append("tagsName", " ");
    }

    this.formData.tagsName.forEach((item: string) => {
      formData.append("tagsName", item);
    });

    formData.append("title", this.formData.title);
    formData.append("subTitle", this.formData.subTitle);
    formData.append("author", this.formData.author);
    formData.append("addDate", formatDate(this.formData.addDate));
    formData.append("isTop", this.formData.isTop);
    formData.append("isRecommend", this.formData.isRecommend);
    formData.append("isHot", this.formData.isHot);
    formData.append("isColor", this.formData.isColor);
    formData.append("content", (this.$refs as any).ueditor.content);

    modifyContent
      .request({ id: this.formData.id }, formData)
      .then((res: any) => {
        this.$message.success("修改成功！");
        this.$emit("upcontent");
        this.$router.push("/site/main/contents");
      });
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
  private uploadSize(file: any) {
    console.log(file);
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      this.$message.error("上传视频大小不能超过10MB!");
      return false;
    }
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
  margin-left: 10px;
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
