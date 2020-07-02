<template>
  <el-card style="min-height:100%; flex:1; transition: width 0.2s linear;">
    <div slot="header" class="clearfix">
      <span @click="initData">修改栏目：{{formData.channelName}}</span>
    </div>
    <div class="content">
      <el-scrollbar>
        <el-form ref="setChannelform" :model="formData" label-width="150px">
          <el-col :span="16" :offset="3">
            <el-form-item label="栏目名称" prop="channelName">
              <el-input v-model.trim="formData.channelName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16" :offset="3">
            <el-form-item label="栏目索引" prop="indexName">
              <el-input v-model.trim="formData.indexName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16" :offset="3">
            <el-form-item label="页面描述" prop="description">
              <el-input v-model.trim="formData.description"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16" :offset="3">
            <el-form-item label="关键字列表" prop="keywords">
              <el-input v-model.trim="formData.keywords[0]"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16" :offset="3">
            <el-form-item label="所属栏目组" prop="groupName">
              <el-select
                placeholder="请选择"
                v-model="formData.groupName"
                @change="change"
                style="width:50%"
              >
                <el-option
                  v-for="item in grouplist"
                  :key="item.id"
                  :label="item.groupName"
                  :value="item.id"
                ></el-option>
              </el-select>
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
                <el-button size="small" type="primary">选取图片</el-button>
                <!-- <span> 请选择 .jpg / .jpeg / .png格式 </span> -->
              </el-upload>
            </el-form-item>
          </el-col>

          <el-col :span="16" :offset="3">
            <el-col :span="6">
              <el-form-item label="可以添加栏目" prop="isAddColumns">
                <el-switch v-model="formData.isAddColumns" class="mr-1"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="可以添加内容" prop="isAddContent">
                <el-switch v-model="formData.isAddContent" class="mr-1"></el-switch>
              </el-form-item>
            </el-col>
          </el-col>

          <el-col :span="22">
            <el-form-item label="栏目内容" prop="content">
              <ueditor ref="ueditor" :comments="formData.content" />
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item style="display: flex;justify-content: flex-end;margin-bottom:50px">
              <el-button type="primary" @click="setChannel">立即修改</el-button>
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

import {
  modifyChannel,
  getChannelGroup,
  getChannel
} from "@/api/backgroundSystem/Channel";
import ueditor from "@/components/ueditor/ueditor.vue";

@Component({
  components: {
    ueditor
  }
})
export default class modifyChannels extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/user/list")
  ];
  @Prop()
  private channelName?: string;
  @Prop()
  private parentId?: number;
  @Prop()
  private channel?: any;
  @Prop()
  private groupName?: string;
  @Prop()
  private groupNameID?: string;
  // 组件显隐控制
  private addVisible: boolean = false;
  private updataPasswordVisible: boolean = false;

  // 视图数据
  private formData: any = {
    parentId: 0,
    channelName: "",
    indexName: "",
    groupNameID: 0,
    groupName: [],
    keywords: [""],
    imagePath: [],
    content: "",
    isAddColumns: true,
    description: "",
    isAddContent: true
  };

  // 栏目组列表
  private grouplist: any = [];

  // 文件列表
  private imageFileList: any = [];

  //手动上传图片
  // private uploadFile(p: any) {
  //   console.log(p.file);
  //   this.formData.imagePath.unshift(p.file);
  // }
  //  private submitUpload() {
  //   (this.$refs as any).upload.submit();
  // }

  private created() {
    this.initData();
    this.formData = this.$route.query.rowdata;
    this.formData = JSON.parse(JSON.stringify(this.formData));
    //console.log(this.channel)
    this.formData.imagePath.forEach((item: string) => {
      this.imageFileList.push({ url: item });
    });
  }

  private initData() {
    getChannelGroup.request().then(res => {
      console.log(res);
      this.grouplist = res;
      //console.log(this.grouplist)
    });
  }

  private clearData() {
    this.imageFileList = [];
    (this.$refs as any).uploadImage.clearFiles();
    (this.$refs as any).setChannelform.resetFields();
  }

  private activated() {
    this.initData();
    this.formData = this.$route.query.rowdata;
    //console.log(this.formData.content)
  }

  private deactivated() {
    this.clearData();
  }

  private change(id: any) {
    this.formData.groupNameID = id;
  }
  private back() {
    this.$router.push("/site/main/channel");
  }
  // 修改内容
  private setChannel() {
    let formData = new FormData();
    let imagePath: any = [""];
    let imagePathFiles = (this.$refs as any).uploadImage.uploadFiles;
    if (imagePathFiles.length > 0) {
      if (imagePathFiles.length == 1) {
        if (imagePathFiles[0].raw) {
          formData.append("imagePath", imagePathFiles[0].raw);
        } else {
          formData.append("imagePath", "");
          formData.append("imagePath", imagePathFiles[0].url);
        }
      } else {
        imagePathFiles.forEach((item: any) => {
          if (item.raw) {
            formData.append("imagePath", item.raw);
          } else {
            formData.append("imagePath", item.url);
          }
        });
      }
    } else {
      formData.append("imagePath", imagePath);
    }

    formData.append("keywords", this.formData.keywords[0]);
    formData.append("groupName", this.formData.groupName);
    formData.append("groupNameID", this.formData.groupNameID);
    formData.append("parentId", this.formData.parentId);
    formData.append("channelName", this.formData.channelName);
    formData.append("indexName", this.formData.indexName);
    formData.append("description", this.formData.description);
    formData.append("content", (this.$refs as any).ueditor.content);

    modifyChannel.request(this.formData.id, formData).then((res: any) => {
      this.$message.success("修改成功！");
      this.$emit("uprow", this.formData.id);
      this.$router.push("/site/main/channel");
    });
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: calc(100vh - 200px);
  position: relative;
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
