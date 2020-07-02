<template>
<el-card class="box-card" v-if="old" style="height:100%;flex:1;transition: width 0.2s linear;">
  <div class="transfer">
    <h4>批量转移</h4>
    <div class="clm">
      <span>从栏目</span>
      <div style="width:220px;height:350px;border:1px solid #e3e3e3;margin-left:280px;background:#fff;overflow-y:scroll">
        <el-tree
          :data="treeData"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          highlight-current
          show-checkbox
          check-strictly
          @check-change="handleCheckChange"
        >
        </el-tree>
      </div>
    </div>
    <div class="clm">
      <span>转移到站点</span>
      <el-select v-model="value1" placeholder="请选择" style="width:30%;margin-left:250px">
        <el-option
          label="松滋司法局"
          value="松滋司法局"
        ></el-option>
      </el-select>
    </div>
    <div class="clm">
      <span>转移到栏目</span>
      <el-select v-model="value2" placeholder="请选择" style="width:30%;margin-left:250px" @change="change">
        <el-option
          v-for="item in tableData"
          :key="item.id"
          :label="item.channelName"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div class="clm">
      <span>转移类型</span>
      <el-select v-model="value" placeholder="请选择" style="width:30%;margin-left:265px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="clm">
      <span>转移后删除</span>
      <el-radio v-model="moveData.isRemove" label="1" style="margin-left:250px">是</el-radio>
      <el-radio v-model="moveData.isRemove" label="0">否</el-radio>
    </div>
    <hr style="margin:10px 0;opacity:0.3">
    <p style="width:100%;text-align:center">
      <el-button size="medium" type="success" @click="moveContent">转移</el-button>
    </p>
  </div>
</el-card>
</template>
<script lang="ts">
  import BaseView from "@/views/baseView";
  import canAccessView from "@/utils/accessCheck";
  import { Vue, Component, Watch } from "vue-property-decorator";
  import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
  import { getChannel } from "@/api/backgroundSystem/Channel";
  import formatTree from "@/utils/formatTree";
  import {migrationChannel,migrationContent,migrationAll} from "@/api/backgroundSystem/Content"

  @Component({
    components: {}
  })
  export default class massTransfer extends BaseView {
     public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription(getChannel.baseUrl, getChannel.method)
  ];
  
  // 视图数据
  private treeData: any = [];
  private moveData:any = {
    moveColumnID:[],
    columnID:"",
    isRemove:"1"
  }
  private options= [{
    value: '仅转移内容',
    label: '仅转移内容'
  },
  {
    value: '仅转移栏目',
    label: '仅转移栏目'
  },
  {
    value: '转移栏目及内容',
    label: '转移栏目及内容'
  }]
  value= ''
  value1= ''
  value2= ''
  data:any = []
  defaultProps= {
    children: 'children',
    label: 'label'
  }
  private tableData:any = []
  private created(){
   this.upData()
  }
  private upData(){
    getChannel
      .request()
      .then((res: any) => {
        let tree = formatTree({
        arrayList: res,
        pidStr: "parentId",
        label: "channelName"
      });
      this.treeData = tree;
      this.tableData = res
      console.log(this.tableData)
      })
  }
  private handleCheckChange(val:any) {
   if(val){
      if (this.data.indexOf(val.id)!=-1) {
            this.data.splice(this.data.indexOf(val.id),1)
      }else{this.data.push(parseInt(val.id))}
      console.log(this.data)
    }
}
 private change(val:any){
   this.moveData.columnID = val
   console.log(val)
 }
  // 视图样式属性
  private rotateFlag: boolean = false;
  private tableRowIndex = -1;
  private old: boolean = false;

 @Watch("$route", { immediate: true })
  private routeChange(route: any) {
    this.old = route.path == "/site/main/massTransfer";
    this.upData()
  }   
 //转移栏目
 private moveContent(){
   console.log(this.value)
   let moveColumnID = this.data
   let columnID = parseInt(this.moveData.columnID)
   let isRemove = this.moveData.isRemove == true
   console.log(isRemove)
   if(this.value == "仅转移栏目"){
   migrationChannel.request(
    {columnID,moveColumnID,isRemove}
   ).then(
    res=>{
    this.$message.success("转移成功")
    this.upData()
    this.data =[]
    this.value = ""
    this.value1 = ""
    this.value2 = ""
  })
  }else
  if(this.value == "仅转移内容"){
   migrationContent.request(
    {columnID,moveColumnID,isRemove}
   ).then(
    res=>{
    this.$message.success("转移成功")
    this.upData()
    this.data =[]
    this.value = ""
    this.value1 = ""
    this.value2 = ""
  })
  }else
  if(this.value == "转移栏目及内容"){
   migrationAll.request(
    {columnID,moveColumnID,isRemove}
   ).then(
    res=>{
    this.$message.success("转移成功")
    this.upData()
    this.data =[]
    this.value = ""
    this.value1 = ""
    this.value2 = ""
  })
  }else{
    this.$message.warning("请选择转移类型")
  }
 }
}
</script>

<style lang="scss" scoped>
 .clm{
   display: flex;
   justify-content: start;
   padding: 10px;
 }

</style>