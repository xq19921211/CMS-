<template>
  <el-card style="min-height:100%; flex:1; transition: width 0.2s linear;">
    <div slot="header" class="clearfix">
      <span @click="initData">{{channelName}} ∠ 添加栏目</span>
    </div>
    <div class="content">
      <el-scrollbar>
        <el-form ref="addChannelform" :model="formData" label-width="150px">
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
              <el-input v-model.trim="formData.keywords"></el-input>
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
                <el-button size="small" type="primary">选取图片</el-button>
                <!-- <span> 请选择 .jpg / .jpeg / .png格式 </span> -->
              </el-upload> 
            </el-form-item>
          </el-col>
          <el-col :span="16" :offset="3">
            <el-form-item label="所属栏目组" prop="groupName">
              <el-select placeholder="请选择" v-model="formData.groupName" @change="change" style="width:50%">
                <el-option  
                  v-for="item in grouplist"
                  :key="item.id"
                  :label="item.groupName"
                  :value="item.id"
                  >
                </el-option>
              </el-select>
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
              <ueditor ref="ueditor"/>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item style="display: flex;justify-content: flex-end;margin-bottom:50px">
              <el-button type="primary" @click="addChannel">立即添加</el-button>
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

import { addChannel , getChannelGroup } from "@/api/backgroundSystem/Channel";
import ueditor from "@/components/ueditor/ueditor.vue"

@Component({
  components: {
   ueditor
  }
})
export default class addChannels extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/user/list")
  ];
 
  private channelName?: any;
 
  private parentId?:any;
  @Prop()
  private content?:string

  // 组件显隐控制
  private addVisible: boolean = false;
  private updataPasswordVisible: boolean = false;

  // 视图数据
  private formData: any = {
    channelName: "",
    indexName: "",
    groupNameID:0,
    groupName: "",
    keywords: "",
    content: "",
    isAddColumns: true,
    description: "",
    isAddContent: true
  };
  //栏目组
  private grouplist:any = []

  private formDataCopy:any = (() => JSON.stringify(this.formData))();
  
  private created() {
     getChannelGroup.request().then(
      (res)=>{
      this.grouplist = res
      //console.log(this.grouplist)
    }
    )
     this.parentId = this.$route.query.parentId
     this.channelName = this.$route.query.channelName
  }

  private change(id:any){
   this.formData.groupNameID = id
  }

  private initData() {
    this.clearData();
    getChannelGroup.request().then(
      (res)=>{
      this.grouplist = res
      //console.log(this.grouplist)
    }
    )
  }
  // 添加栏目
  private addChannel() {
    let formData = new FormData();
    let imagePath = [];
    if ((this.$refs as any).uploadImage.uploadFiles.length > 0) {
      imagePath = (this.$refs as any).uploadImage.uploadFiles[0].raw;
       console.log(imagePath)
    }
    formData.append("keywords", this.formData.keywords);
    formData.append("groupName",this.formData.groupName);
    formData.append("groupNameID",this.formData.groupNameID);
    formData.append("imagePath",imagePath);
    formData.append("parentId", <any>this.parentId);
    formData.append("channelName", this.formData.channelName);
    formData.append("indexName", this.formData.indexName);
    formData.append("isAddColumns", this.formData.isAddColumns);
    formData.append("isAddContent", this.formData.isAddContent);
    formData.append("description", this.formData.description);
    formData.append("content", (this.$refs as any).ueditor.content);
    
    addChannel.request(formData).then((res: any) => {
      this.$message.success("添加成功！");
      this.clearData();
      this.$emit("upTree")
      this.$router.push("/site/main/channel");  
    });
  }
  private back(){this.$router.push("/site/main/channel");}
  //手动上传图片
  // private uploadFile(p: any) {
  //   console.log(p.file);
  //   this.formData.imagePath.unshift(p.file);
  // }
  //  private submitUpload() {
  //   (this.$refs as any).upload.submit();
  // }

  private clearData(){
    (this.$refs as any).uploadImage.clearFiles();
    this.formData = JSON.parse(this.formDataCopy);
    (this.$refs as any).ueditor.content = ""
  }
 
  private activated(){
   this.initData();
  }

  private deactivated(){
    //console.log(this.formDataCopy)
     this.clearData();
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
