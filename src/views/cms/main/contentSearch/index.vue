<template>
  <div>
    <el-card class="box-card" v-if="old" style="min-height:100%">
      <div slot="header" class="clearfix" @click="upData">
        <span>
          <i class="el-icon-refresh"></i>刷新
        </span>
        <div class="card-btn-1">
          <el-button @click="delContent">删除</el-button>
          <el-button @click="transfer">转移</el-button>
          <el-button @click="checks">审核</el-button>
          <el-button @click="addToGroup">添加到内容组</el-button>
          <el-button @click="dialogVisible = true">选择显示项</el-button>
        </div>
      </div>
      <el-form label-width="60px">
        <el-col :span="3" class="mr-1">
          <el-form-item label="栏目">
            <el-select placeholder="请选择" v-model="searchData.ChannelID">
              <el-option
                v-for="item in grouplist"
                :key="item.id"
                :label="item.channelName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" class="">
          <el-form-item label="时间">
            <el-date-picker
              class="sp"
              v-model="searchData.Alldate"
              style="width:95%"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3" class="mr-1">
          <el-form-item label="状态">
            <el-select placeholder="请选择" v-model="searchData.checkedLevel" @change="types">
              <el-option
                v-for="(item,key) in stateList"
                :label="Object.values(item).toString()"
                :value="Object.keys(item).toString()"
                :key="key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3" class="mr-2">
          <el-form-item label="目标">
            <el-select collapse-tags placeholder="请选择" v-model="typeData" @change="states">
              <el-option v-for="item in ContentType" :key="item.prop" :label="item.label" :value="item.prop">{{item.label}}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4" class="mr-0">
          <el-form-item label="关键字">
            <el-input placeholder="请输入内容" v-model="searchData.Keyword" clearable style="width:90%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" class="mr-0">
          <el-button type="primary" @click="search" style="height:40px">搜索</el-button>
          <el-button @click="resets" style="height:40px">重置</el-button>
        </el-col>
      </el-form>

      <div>
        <el-table
          :data="tableData"
          style="width:100%"
          :row-class-name="tableRowClassName"
          ref="multipleTable"
          border
          :row-key="getRowKey"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" :reserve-selection="true"></el-table-column>
          <el-table-column label="标题内容" prop="title">
            <template slot-scope="scope">
              <a href="#">{{scope.row.title}}</a>
            </template>
          </el-table-column>
          <el-table-column v-for="col in Alllabel" :prop="col.prop" :label="col.label" :key="col.prop">
          </el-table-column>
          <el-table-column label="栏目" prop="channelName" width="200"></el-table-column>
          <el-table-column label="状态" prop="checkedLevel" width="100"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        class="pagination"
      ></el-pagination>
      <div class="footer-info">
        <span>当前页面数据条数：{{tableData.length}}</span>
        <el-divider direction="vertical"></el-divider>
        <span>总数据条数：{{total}}</span>
      </div>
    </el-card>
    <show-dialog :visible.sync="dialogVisible" @showLabel="showLabel"/>
    <content-group :visible.sync="dialogVisible1" :publicGroup="publicGroup" @group="resets"/>
    <check-content :visible.sync="dialogVisible2" :publicContent="publicContent" @content="resets"/>
  </div>
</template>

<script lang="ts">
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import { Vue, Component, Watch } from "vue-property-decorator";
import { getChannel } from "@/api/backgroundSystem/Channel";
import {
  getContentGroup,
  getCondition,
  recoveryContent,
  modifyAudit,
  addToContentgroup
} from "@/api/backgroundSystem/Content";
import { formatDate } from "@/utils/filters";
import showDialog from "./dialog/showDialog.vue"
import contentGroup from "./dialog/contentGroup.vue"
import checkContent from "./dialog/checkContent.vue"

@Component({
  components: {showDialog,contentGroup,checkContent}
})
export default class contentSearch extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/user/list")
  ];

  private dialogVisible = false;
  private dialogVisible1 = false;
  private dialogVisible2 = false;
  private checkAll = false;
  private checkList:any = []
  private typeData: any = [];
  private channelId?: string;
  private grouplist: any = [];
  private contentlist:any = [];
  private tableData: any = [];
  private copyData: any = [];
  private publicData: any = [];
  private publicGroup :any = []
  private publicContent:any = []
  private contentgroupID:any = []

  //搜索项
  private searchData: any = [
    {
      ChannelID: "",
      Alldate: "",
      checkedLevel: "",
      fieldName: "",
      Keyword: ""
    }
  ];
  //状态
  private stateList: any = [
    { "0": "全部" },
    { "2": "草稿" },
    { "4": "待审核" },
    { "8": "已审核" },
    { "-2": "已撤销" }
  ];
  //目标
  private ContentType: any = [
    {prop:"subTitle",label:"副标题"},
    {prop:"author",label:"作者"},
    {prop:"addDate",label:"时间"},
    {prop:"content",label:"内容"},
    {prop:"tagsName",label:"标签"},
    {prop:"linkUrl",label:"外部链接"}
  ];

  //状态及目标下拉选值
  private types(val: any) {
    //console.log(val);
    this.searchData.checkedLevel = val;
  }
  private states(val: any) {
    console.log(val);
    this.searchData.fieldName = val;
  }
  // 分页属性
  private total = 0;
  private pageSize = 10;
  private currentPage = 1;

  // 视图样式属性
  private rotateFlag: boolean = false;
  private tableRowIndex = -1;
  private old: boolean = false;

  @Watch("$route", { immediate: true })
  private routeChange(route: any) {
    this.old = route.path == "/site/main/contentSearch";
    this.currentPage = 1;
    this.searchData = {};
  }

  private activated() {
   getChannel.request().then(res => {
      this.grouplist = res;
    });
    this.upData();
  }
  //内容搜索
  private search() {
    let {
      ChannelID,
      Alldate,
      checkedLevel,
      fieldName,
      Keyword
    } = this.searchData;
    
    if (Alldate == undefined) {
      getCondition
        .request({
          ChannelID,
          checkedLevel,
          fieldName,
          Keyword
        })
        .then((res:any) => {
          console.log(res);
          for(let i=0 ;i<res.data.length;i++){
          res.data[i].addDate = res.data[i].addDate.substring(0,10)
          }  
          this.tableData = res.data;
          this.currentPage = 1;
          this.total = res.count;
        })
        .catch(err => this.$message.error("查询失败"));
    } else {
      let Start = new Date(this.searchData.Alldate[0]).getTime();
      let StartTime = formatDate(Start).toString();
      let End = new Date(this.searchData.Alldate[1]).getTime();
      let EndTime = formatDate(End).toString();
      console.log(StartTime, EndTime);
      getCondition
        .request({
          ChannelID,
          StartTime,
          EndTime,
          checkedLevel,
          fieldName,
          Keyword
        })
        .then((res:any) => {
          console.log(res);
          this.tableData = res.data;
          this.currentPage = 1;
          this.total = res.count;
        })
        .catch(err => this.$message.error("查询失败"));
    }
  }

  //重置(初始化)
  private reset() {
    this.rotateFlag = true;
    this.searchData = {};
    getCondition
      .request({
        PageSize: this.pageSize,
        Page: this.currentPage
      })
      .then((res:any) => {
        for(let i=0 ;i<res.data.length;i++){
        res.data[i].addDate = res.data[i].addDate.substring(0,10)
        }  
        this.tableData = res.data;
        this.total = res.count;
        this.rotateFlag = false;
        //console.log(res);
        this.copyData = (() => JSON.stringify(this.tableData))();
        let copyData1 = JSON.parse(this.copyData);
    });
  }
  private resets(){
    this.reset();
    (this.$refs as any).multipleTable.clearSelection()
  }
  //提示
  private hintMessage(){
   this.$alert("请选择一条内容", "提示", {
        confirmButtonText: "确定",
        type: "warning"
      });
  }
  private getRowKey (row:any) {
      return row.id
    }
  //转移
  private transfer(){
    this.$message.error('此功能尚未开放');
  }
  //删除内容
  private delContent() {
    if (this.publicData.length === 0) {
      this.hintMessage()
    } else {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        for (let i = 0; i < this.publicData.length; i++) {
          recoveryContent.request(this.publicData[i].id).then(res => {
            this.$message.success("删除成功");
            this.upData();
            (this.$refs as any).multipleTable.clearSelection()
          });
        }
      });
    }
  }
  //获取内容组
  addToGroup(){
  if (this.publicData.length === 0) {
      this.hintMessage()
    }else{
      getContentGroup.request().then(
        (res)=>{
        this.contentlist = res
        console.log(this.contentlist)
      }
    )
      this.dialogVisible1 = true
      this.publicGroup =this.publicData
    }
  }
 
  //审核
  private checks() {
    this.publicContent=[]
   if (this.publicData.length === 0) {
      this.hintMessage()
    } else {
    this.dialogVisible2 = true;
    this.publicData.forEach((ele:any) => {
      this.publicContent.push(ele.title)
      console.log(this.publicContent)
    });
   }
  }

  // 分页
  private handleCurrentChange(val: number) {
    this.currentPage = val;
    this.upData();
  }
  // 获取选中当前row参数
  private handleSelectionChange(val: any) {
    this.publicData = val;
    console.log(val);
  }
  private handleClick(row: any) {
    console.log(row);
  }

  private upData() {
    this.reset();
  }
  private groupChange(id:any){
    this.contentgroupID = id
    console.log(this.contentgroupID)
  }
  private tableRowClassName({ row, rowIndex }: any) {
    if (rowIndex % 2 == 1) {
      return "odd";
    }
  }
  //显示项
  private Alllabel:any = []
  private showLabel(value:any){
   this.Alllabel = value
  }
}
</script>

<style lang="scss">
.seartop {
  display: flex;
  padding: 10px;
  font-size: 14px;
  max-height: 60px;
}
.el-table__fixed-right-patch {
  width: 0 !important;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>
