<template>
  <div>
    <el-card style="min-height:100%;">
      <div slot="header" class="clearfix">
        <span @click="initData">
          <i class="el-icon-refresh" :class="{rotate:rotateFlag}"></i> 刷新
        </span>
        <el-button v-if="canDelete" class="card-btn-1" @click="clear" plain type="warning">清空操作信息</el-button>
      </div>

      <div>
        <el-table
          :data="tableData"
          :row-class-name="tableRowClassName"
          v-loading="rotateFlag"
          border
          style="width: 100%"
        >
          <el-table-column prop="user" width="150" label="操作用户" align="center"></el-table-column>
          <el-table-column prop="time" width="200" label="操作时间" align="center"></el-table-column>
          <el-table-column prop="location" label="操作地址" align="center"></el-table-column>
          <el-table-column label="操作描述" align="center">
            <template slot-scope="scope">
              <div
                :class="scope.row.type == 0 ? 'danger' : scope.row.type == 1 ? 'success' : scope.row.type == 2 ? 'warning' : scope.row.type == 2 ? 'info' : ''"
              >{{scope.row.describe}}</div>
            </template>
          </el-table-column>
        </el-table>

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
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
// api
import { getOperationInfo, clearOperationInfo } from "@/api/middleSystem";

@Component({
  components: {}
})
export default class OperationList extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription(getOperationInfo.baseUrl, getOperationInfo.method)
  ];

  // 视图属性
  private tableData: object[] = [];

  // 组件显隐

  // 按钮权限
  private canDelete: boolean = false;

  // 分页
  private total = 0;
  private pageSize = 10;
  private currentPage = 1;

  // 视图样式属性
  private rotateFlag: boolean = false;
  private tableRowIndex = -1;

  // 搜索项
  private search = {};

  private created() {
    let canDel = canAccessView(
      new ApiDescription(clearOperationInfo.baseUrl, clearOperationInfo.method)
    );
    let userInfoLevel = this.$store.getters.userInfo.role.level;
    // 只有超管且有权限才能清除操作信息
    this.canDelete = userInfoLevel == 0 && canDel;
    this.initData();
  }

  private clear(appId: string) {
    this.$confirm("是否清空操作信息?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.clearOperationInfo();
      })
      .catch((error: any) => {});
  }

  // 初始化数据
  private initData() {
    this.rotateFlag = true;
    getOperationInfo
      .request({ page: this.currentPage, pageSize: this.pageSize })
      .then((res: any) => {
        this.tableData = res.data;
        this.total = res.count;
        this.rotateFlag = false;
      });
  }

  // 清空操作信息
  private clearOperationInfo() {
    clearOperationInfo.request().then(() => {
      this.initData();
      this.$message({
        type: "success",
        message: "清除成功!"
      });
    });
  }

  private handleCurrentChange(val: number) {
    this.currentPage = val;
    this.initData();
  }

  private tableRowClassName({ row, rowIndex }: any) {
    if (rowIndex % 2 == 1) {
      return "odd";
    }
  }
}
</script>

<style lang="scss" scoped>
</style>