<template>
    <el-dialog
          title="添加到内容组"
          :visible.sync="dialogVisible1"
          width="30%"
          append-to-body
          :before-close="handleClose1"
        >
          <el-checkbox-group v-model="checkList" @change="groupChange">
               <el-checkbox v-for="item in contentlist" :label="item.title" :key="item.id">
                 {{item.title}}
               </el-checkbox>
          </el-checkbox-group>
          <span slot="footer">
            <el-button @click="handleClose1">取 消</el-button>
            <el-button type="primary" @click="addToContent">确 定</el-button>
          </span>
        </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
import {
  getContentGroup,
  addToContentgroup
} from "@/api/backgroundSystem/Content";

@Component({
  components: {}
})
export default class contentGroup extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/user/list")
  ];

@Prop() public visible: any;
@Prop() private publicGroup:any

private contentgroupID:any=[]

private checkList:any = []
private contentlist:any = []

//提示
  private hintMessage(){
   this.$alert("请选择一条内容", "提示", {
        confirmButtonText: "确定",
        type: "warning"
      });
  }
private handleClose1() {
    this.dialogVisible1 = false;
    this.$emit("group")
  }
private groupChange(id:any){
    this.contentgroupID = id
    console.log(this.contentgroupID)
  }

  //添加到内容组
  private addToContent(){
    console.log(this.publicGroup)
    addToContentgroup.request(
       parseInt(this.publicGroup[0].id),
       {gName:this.contentgroupID}
      ).then(res=>{
        this.contentgroupID = []
        this.dialogVisible1 = false
      })
  }
  get dialogVisible1() {
    return this.visible;
  }
  set dialogVisible1(v) {
    this.$emit("update:visible", v);
  }

  private created(){
    getContentGroup.request().then(
        (res)=>{
        this.contentlist = res
        console.log(this.contentlist)
      }
    )
    console.log(this.publicGroup)
  }
}
</script>
