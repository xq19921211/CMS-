<template>
<div>
 <el-card class="box-card" v-if="old" style="height:100%;flex:1;transition: width 0.2s linear;">
  <div slot="header" class="clearfix" @click="upData">
    <span><i class="el-icon-refresh"></i>刷新</span>
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
        <el-col :span="6" class="mr-0">
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
            <el-select
              placeholder="请选择"
              v-model="searchData.checkedLevel"
              @change="types"
            >
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
            <el-select
              collapse-tags
              placeholder="请选择"
              v-model="typeData1"
              @change="states"
            >
              <el-option v-for="(item,key) of ContentType" :key="key" :label="item" :value="key"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4" class="mr-0">
          <el-form-item label="关键字">
            <el-input
              placeholder="请输入内容"
              v-model="searchData.Keyword"
              clearable
              style="width:90%"
            ></el-input>
          </el-form-item>
        </el-col>
      <el-col :span="4" class="mr-0">
          <el-button type="primary" @click="search" style="height:40px">搜索</el-button>
          <el-button @click="reset" style="height:40px">重置</el-button>
      </el-col>
    </el-form>
    <div class="searbom" style="margin-top:20px">
      <el-table 
       :data="tableData" 
       style="width:99%;" 
       max-height="565"
       :row-class-name="tableRowClassName" 
       ref="multipleTable"
       border
      @selection-change="handleSelectionChange"
       >
        <el-table-column type="selection" width="50" ></el-table-column>
        <el-table-column label="标题内容" prop="title" width="700">
          <template slot-scope="scope">
            <a href="#">{{scope.row.title}}</a>
          </template>
        </el-table-column>
        <el-table-column label="栏目" prop="channelName" width="300"></el-table-column>
        <el-table-column label="删除时间" prop="addDate" width="300"></el-table-column>
        <el-table-column label="状态" prop="checkedLevel"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div style="height:15px;width:99%;background:#e6eced;"></div> -->
      <el-row style="margin-top:15px">
        <el-button @click="dialogVisible = true">选择显示项</el-button>
        <el-dialog
          title="设置显示项"
          :visible.sync="dialogVisible"
          append-to-body
          :before-close="handleClose">
           <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group style="padding-left:5%" v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox style="width:25%;font-size:20px" v-for="item in ContentType" :label="item" :key="item">{{item}}</el-checkbox>
              </el-checkbox-group>
          <span slot="footer" style="display:flex;justify-content:flex-end">  
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
        <el-button @click="resContent">还原</el-button>
        <el-button>全部还原</el-button>
        <el-button>清空回收站</el-button>
        <el-button @click="delContent">删除</el-button>
      </el-row>
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
</div>
</template>

<script lang="ts">
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import { Vue, Component, Watch } from "vue-property-decorator";
import { getChannel } from "@/api/backgroundSystem/Channel";
import { recyclebinContent,restoreContent,emptyRecyclebin ,recyclebinAllContent} from "@/api/backgroundSystem/Content";
import { formatDate } from "@/utils/filters"

@Component({
  components: {}
})
export default class recyclebin extends BaseView {
    public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/user/list")
  ];
      
    private dialogVisible=false
    private checkAll= false
    private checkedCities= ["标题"]
    private isIndeterminate= true
    private typeData:any = []
    private typeData1:any = []
    private channelId?: string;
    private grouplist:any = []
    private tableData:any = []
    private copyData:any = []
    private multipleSelection:any=[]
    private publicData:any = []
    private cid:any = []
    private allID:any = []
 
  //搜索项
  private searchData:any = [
    {
      ChannelID:"",
      Alldate: "",
      checkedLevel:"",
      fieldName:"",
      Keyword: ""
    }]
  //状态
  private stateList:any = [
    {"0":"全部"},
    {"2":"草稿"},
    {"4":"待审核"},
    {"8":"已审核"},
    {"-2":"已撤销"}
  ]
  //目标
  private ContentType:any = [
    "标题",
    "副标题",
    "图片",
    "视频",
    "文件",
    "作者",
    "外部链接",
    "开始时间",
    "结束时间",
    "内容组",
    "标签",
    "审核原因",
  ]
 
//状态及目标下拉选值
 private types(val:any){
   console.log(val)
   this.searchData.checkedLevel = val
  }
 private states(val:any){
    console.log(val)
    this.searchData.fieldName = val
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
    this.old = route.path == "/site/main/recyclebin";
    this.currentPage = 1
    this.searchData = {}
  }

  private activated(){  
    getChannel
      .request().then(
      (res)=>{
      this.grouplist = res
    }
    )
    recyclebinAllContent
    .request().then(
      res=>{
      //console.log(res)
      for(let i=0;i<(res as any).length;i++){
       this.allID.push((res as any)[i].id)
      }
      console.log(this.allID)
      }
    )
    this.upData()
   }
   private deactivated(){
     this.allID = []
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
      recyclebinContent
        .request({
          ChannelID,
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
    } else {
      let Start = new Date(this.searchData.Alldate[0]).getTime();
      let StartTime = formatDate(Start).toString();
      let End = new Date(this.searchData.Alldate[1]).getTime();
      let EndTime = formatDate(End).toString();
      console.log(StartTime, EndTime);
      recyclebinContent
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
   private reset(){
    this.rotateFlag = true;
    this.searchData = {}
    recyclebinContent.request({
      PageSize: this.pageSize,
      Page: this.currentPage
    }).then(
      (res:any)=>{
        //console.log(res.data)
        this.tableData = res.data;
        this.total = res.count;
        this.rotateFlag = false;
        //console.log(res)
        this.copyData = (() => JSON.stringify(this.tableData))()
        let copyData1 = JSON.parse(this.copyData)
      })
   }
   
   // 搜索方法
  private searchHandle(str: string | number) {
    this.currentPage = 1;
    if (str == "reset") {
    }
    this.upData();
  }

  // 分页
  private handleCurrentChange(val: number) {
    this.currentPage = val;
    this.upData();
  }

  // 删除
  private delContent(){
    if(this.publicData.length===0){
      this.$alert('请选择一条内容', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
    })
   }else{
     this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(()=>{
       console.log(this.publicData)
       for(let i=0;i<this.publicData.length;i++){
        this.cid.push(this.publicData[i].id)
        emptyRecyclebin.request(
        {cid:this.cid}
       ).then(
         res=>{
          this.$message.success("删除成功")
          this.cid = []
          this.upData()
         }
      )}
     })
   }
  }

  //还原
 private resContent(){
    if(this.publicData.length===0){
      this.$alert('这么多美女，你不选一个吗', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
    })
   }else{
     this.$confirm('此操作将还原该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(()=>{
      for(let i=0;i<this.publicData.length;i++){
       this.cid.push(this.publicData[i].id)
       restoreContent.request(
        {cid:this.cid}
       ).then(
         res=>{
          this.$message.success("还原成功")
          this.upData()
         }
      )}
     })
   }
  }

  // 选中获取当前row参数
   private handleSelectionChange(val:any){
     console.log(val)
     this.publicData = val
    }
  // 查看获取当前row参数
   private handleClick(row:any) {
      console.log(row);
    }
   private handleClose(){
    this.dialogVisible = false
    }
   private upData(){
     this.reset()
   }
  private tableRowClassName({ row, rowIndex }: any) {
    if (rowIndex % 2 == 1) {
      return "odd";
    }
  }
   private handleCheckAllChange(val:any) {
        this.checkedCities = val ? this.ContentType : [];
        this.isIndeterminate = false;
      }
   private handleCheckedCitiesChange(value:any) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.ContentType.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.ContentType.length;
   }
}
</script>

<style lang="scss">

.seartop,.block {
  display: flex;
} 
.el-table__fixed-right-patch{
  width: 0 !important;
}
.el-table .success-row {
    background: #f0f9eb;
  }
</style>
