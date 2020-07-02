<template>
   <div class="">
     <el-table
    :data="groupNamelist"
    style="width: 100%">
    <el-table-column label="内容组">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.title }}</span>
      </template>
    </el-table-column>
    <el-table-column label="内容组简介">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.description }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
      <el-dialog
          title="修改内容组"
          append-to-body
          :visible.sync="dialogVisible1"
          :before-close="backcontent"
          width="35%"
          >
          <el-form :model="gronpdata" style="margin-left:15%">
            <el-form-item label="内容组名称：" style="width:80%">
              <el-input v-model="gronpdata.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="内容组简介：" style="width:80%">
              <el-input v-model="gronpdata.description" autocomplete="off" type="textarea" :rows="3" ></el-input>
            </el-form-item>
            <div style="width:80%;display:flex;justify-content:flex-end;">
            <el-button type="info" @click="backcontent">取 消</el-button>
            <el-button type="success" @click="modify" >确 定</el-button>
          </div>
          </el-form>
        </el-dialog>
    </el-table-column>
  </el-table>
  <div style="margin-bottom:15px;border-bottom:1px solid #eee"></div>
    <el-button type="success" @click="dialogVisible = true">新建内容组</el-button>
    <el-dialog
      title="添加栏目组"
      append-to-body
      :visible.sync="dialogVisible"
      :before-close="contentback"
      width="35%"
      >
      <el-form :model="gronpdata" style="margin-left:15%">
        <el-form-item label="栏目组名称：" style="width:80%">
          <el-input v-model="gronpdata.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="栏目组简介：" style="width:80%">
          <el-input v-model="gronpdata.description" autocomplete="off" type="textarea" :rows="3" ></el-input>
        </el-form-item>
        <div style="width:80%;display:flex;justify-content:flex-end;">
        <el-button type="info" @click="contentback">取 消</el-button>
        <el-button type="success" @click="addgroup" >确 定</el-button>
      </div>
      </el-form>
    </el-dialog>
 </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import {getContentGroup, addContentgroup,modifyGroup ,delGroup} from "@/api/backgroundSystem/Content";

  @Component({
    components: {}
  })
  export default class conten extends BaseView {
    public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/user/list")
  ];

  //内容组
  private gronpdata:any={
    id:"",
    title: "",
    description: "",
  }
  
  private backList(){
   this.gronpdata={}
  }
  private backcontent(){
    this.dialogVisible1 = false
    this.gronpdata={}
  }
  private contentback(){
    this.dialogVisible = false
    this.gronpdata={}
  }
  private dialogVisible = false
  private dialogVisible1 = false
  //内容组
  private groupNamelist:any = []
  private checkAll:boolean = false
  private checkedlist:any = []
  private isIndeterminate:boolean = true
  private delList = []

  private handleCheckAll(val:any) { 
        this.checkedlist = val ? this.groupNamelist : [];
        this.isIndeterminate = false;
 }
  private handleChecked(value:any) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.groupNamelist.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.groupNamelist.length;
        this.delList = value
        console.log(this.delList)
      }
  
  //获取内容组名
  private getlist(){
   getContentGroup.request().then(
          (res)=>{
          this.groupNamelist = res
         console.log(this.groupNamelist)
        }
      )
  }

  private created(){
     this.getlist()
  }
  
  //修改及删除内容组
 private handleEdit(row:any) {
      console.log(row);
      this.dialogVisible1 = true
    this.gronpdata.id = row.id
    this.gronpdata.title = row.title
    this.gronpdata.description = row.description
    
    }
 private modify(){
   let {id,title,description} = this.gronpdata
    modifyGroup.request(id,{
      id,title,description
    }
    ).then(res=>{
       this.$message.success("修改成功！")
       this.dialogVisible1 = false
       this.getlist()
     })
 }
 private handleDelete(row:any) {
    console.log(row);
    this.$confirm("即将删除该栏目组, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=>
      delGroup.request(row.id).then(
       (res)=>{
      this.$message.success("删除成功！");
      this.getlist()
     }
    )
  )  
  }
  //添加内容组
  private addgroup() {
    let { title, description } = this.gronpdata;
    addContentgroup.request({ title, description }).then(res => {
      this.$message.success("添加成功！");
      this.gronpdata = {}
      this.getlist()
      this.dialogVisible=false
    });
  }
}
</script>
<style lang="scss" scoped>
  ::-webkit-scrollbar{
  display: none;
}
</style>