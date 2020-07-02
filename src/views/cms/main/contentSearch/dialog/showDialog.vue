<template>
    <el-dialog
          title="设置显示项"
          :visible.sync="dialogVisible"
          append-to-body
          :before-close="handleClose"
        >
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group
            style="padding-left:5%"
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              style="width:25%;font-size:20px"
              v-for="item in ContentType"
              :label="item.label"
              :key="item.prop"
            >{{item.label}}</el-checkbox>
          </el-checkbox-group>
          <span slot="footer" style="display:flex;justify-content:flex-end">
            <el-button type="primary" @click="confirmShow">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";

@Component({
  components: {}
})
export default class showDialog extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/user/list")
  ];

@Prop() public visible: any;

private checkedCities:any = []
private isIndeterminate:boolean = true
private checkAll:boolean = false;

private ContentType: any = [
    {prop:"subTitle",label:"副标题"},
    {prop:"author",label:"作者"},
    {prop:"addDate",label:"时间"},
    {prop:"content",label:"内容"},
    {prop:"tagsName",label:"标签"},
    {prop:"linkUrl",label:"外部链接"}
  ];

private handleClose() {
    this.dialogVisible = false;
  }

//显示项
  private Alllabel:any = []
  private handleCheckAllChange(val: any) {
    this.ContentType.forEach((item:any)=> {
      this.Alllabel.push(item.label)
    });
    this.checkedCities = val ? this.Alllabel : [];
    this.isIndeterminate = false;
  }
  private handleCheckedCitiesChange(value: any) {
    let checkedCount = value.length;
    this.checkAll = checkedCount === this.ContentType.length;
    this.isIndeterminate = checkedCount > 0 && checkedCount < this.ContentType.length;
  }
  private confirmShow() {
        this.Alllabel = []
        for (var i = 0; i < this.ContentType.length; i++) {
          for (var j = 0; j < this.checkedCities.length; j++) {
            console.log(this.checkedCities[j])
            if (this.ContentType[i].label == this.checkedCities[j]) {
               this.Alllabel.push(this.ContentType[i]);
            }
          }
          console.log(this.Alllabel);
          this.$emit("showLabel",this.Alllabel)
          this.dialogVisible = false;
        } 
      }
  get dialogVisible() {
    return this.visible;
  }
  set dialogVisible(v) {
    this.$emit("update:visible", v);
  }
}
</script>
