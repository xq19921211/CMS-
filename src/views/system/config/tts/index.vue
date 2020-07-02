
<template>
  <div>
    <el-card  style="min-height:100%;">
      <div slot="header" class="clearfix">
        <span @click="initData">
          <i class="el-icon-refresh" :class="{rotate:rotateFlag}"></i> tts配置
        </span>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="消息模板描述" align="center">
          <el-table-column prop="Id" label="消息标识符" align="center"></el-table-column>
          <el-table-column prop="Name" label="消息名称" align="center"></el-table-column>
          <el-table-column prop="Type" label="消息种类" align="center"></el-table-column>
          <el-table-column prop="Parameters" label="消息字段" align="center">
            <template slot-scope="scope">{{scope.row.Parameters || '暂无'}}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="消息模板" align="center">
          <el-table-column prop="Id" label="消息标识符" align="center"></el-table-column>
          <el-table-column prop="Template" label="消息模板" align="center">
            <template slot-scope="scope">{{scope.row.Template || '暂无'}}</template>
          </el-table-column>
          <el-table-column prop="DefaultSign" label="默认消息签名" align="center">
            <template slot-scope="scope">{{scope.row.DefaultSign || '暂无'}}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              size="mini"
              @click="currentRow = scope.row; visible = true"
            >设置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <update :visible.sync="visible" :detailData="currentRow" @refresh="initData" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ApiDescription } from "@/utils/apiDescription";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
import { getMsgTemp } from "@/api/middleSystem";
import update from "./update.vue";


@Component({
  components: { update }
})
export default class TtsConfig extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/message/template/settings")
  ];
  private detailData: object = {};
  private tableData: any = [];
  private visible: boolean = false;
  private canUpdate: boolean = false;
  private rotateFlag: boolean = false;
  private currentRow: any = {};

  private created() {
    this.initData();
    this.canUpdate = canAccessView(update);
  }

  private initData() {
    this.rotateFlag = true;
    getMsgTemp(2).then((res) => {
      this.detailData = res;
      this.tableData = JSON.parse(JSON.stringify(res)).map((item: any) => {
        let obj = {};
        return Object.assign(obj, item.Descriptor, item.Template);
      });
      this.rotateFlag = false;
    });
  }
}
</script>

