<template>
    <el-dialog
          title="审核内容"
          :visible.sync="dialogVisible2"
          width="30%"
          append-to-body
          :before-close="cancelCheck"
        >
          <el-form :model="checkContent">
            <el-form-item label="内容标题" :label-width="formLabelWidth">
              <span>{{publicContent}}</span>
            </el-form-item>
            <el-form-item label="审核状态" :label-width="formLabelWidth">
              <el-select v-model="checkContent.checkedLevel" placeholder="请选择" style="width:80%">
                <el-option
                  v-for="(item,key) in checkType"
                  :key="key"
                  :label="Object.values(item).toString()"
                  :value="Object.keys(item).toString()"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="转移到栏目" :label-width="formLabelWidth">
              <el-select v-model="checkContent.ChannelID" placeholder="<保持原栏目不变>" style="width:80%">
                <el-option
                  v-for="item in grouplist"
                  :key="item.id"
                  :label="item.channelName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核原因" :label-width="formLabelWidth">
              <el-input
                v-model="checkContent.contentCause"
                autocomplete="off"
                style="width:80%"
                type="textarea"
                rows="4"
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer">
            <el-button @click="cancelCheck">取 消</el-button>
            <el-button type="primary" @click="checkContents">确 定</el-button>
          </span>
        </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
import { getChannel } from "@/api/backgroundSystem/Channel";
import { modifyAudit } from "@/api/backgroundSystem/Content";

@Component({
  components: {}
})
export default class checkContent extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/user/list")
  ];
@Prop() public visible: any;

@Prop() private publicContent:any

private grouplist: any = [];
private formLabelWidth:string = "120px"

//审核
  private checkContent: any = {
    contentID: [],
    checkedLevel: "",
    contentCause: "",
    isShift: true,
    ChannelID: ""
  };
  private checkType: any = [
    { "2": "草稿" },
    { "4": "待审核" },
    { "8": "终审通过" },
    { "-2": "终审退稿" }
  ];
  //提示
  private hintMessage(){
   this.$alert("请选择一条内容", "提示", {
        confirmButtonText: "确定",
        type: "warning"
      });
  }

  //提交审核
  private checkContents() {
    modifyAudit.request().then();
  }

  //取消审核
  private checkContentCopy: any = (
    () => JSON.stringify(this.checkContent)
    )();
  private cancelCheck() {
    this.dialogVisible2 = false;
    this.$emit("content")
    console.log(this.checkContentCopy)
    this.checkContent = JSON.parse(this.checkContentCopy);
  }
  get dialogVisible2() {
    return this.visible;
  }
  set dialogVisible2(v) {
    this.$emit("update:visible", v);
  }
  
  private created(){
    getChannel.request().then(res => {
      this.grouplist = res;
    });
  }
  
}
</script>
