<template>
  <div>
    <el-card style="min-height:100%;">
      <div slot="header" class="clearfix">
        <span @click="initData">
          <i class="el-icon-refresh" :class="{rotate:rotateFlag}"></i> 刷新
        </span>
      </div>
      <el-table
        :data="tableData"
        border
        v-loading="rotateFlag"
        :row-class-name="tableRowClassName"
        style="width: 100%"
      >
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="url" label="地址" align="center"></el-table-column>
        <el-table-column prop="method" label="方法" align="center"></el-table-column>
        <el-table-column prop="description" label="描述" align="center"></el-table-column>
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
    </el-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { getAllApi } from "@/api/middleSystem";
import { ApiDescription } from "@/utils/apiDescription";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";

@Component
export default class ServiceApi extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/api/list")
  ];
  private tableData: object[] = [];
  private total = 0;
  private pageSize = 12;
  private currentPage = 1;
  private rotateFlag = false;

  private created() {
    this.initData();
  }

  private initData() {
    this.rotateFlag = true;
    getAllApi(this.currentPage, this.pageSize).then((res: any) => {
      this.tableData = res.data;
      this.total = res.total;
      this.rotateFlag = false;
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
