<template>
  <div class="ncontent">
    <el-card style="width:0;height:100%;flex:1;transition: width 0.2s linear;" v-if="old">
      <div slot="header" class="clearfix">
        <span @click="getList">
          <i class="el-icon-refresh" :class="{rotate:rotateFlag}"></i>
          {{channelName}}
        </span>
        <div class="card-btn-1">
          <el-button v-if="canAdd" @click="addChannel" plain type="primary">添加栏目</el-button>
        </div>
      </div>
      <el-form label-width="100px"></el-form>
      <div>
        <el-table
          v-if="tableData"
          ref="tablist"
          :data="tableData"
          :row-class-name="tableRowClassName"
          v-loading="rotateFlag"
          style="width:100%;"
          max-height="690"
          row-key="id"
          border
        >
          <el-table-column prop="channelName" label="栏目名"></el-table-column>
          <el-table-column prop="groupName" label="所属栏目组" align="center"></el-table-column>
          <el-table-column prop="indexName" label="栏目索引" align="center"></el-table-column>
          <el-table-column prop label="上升" align="center" width="100%">
            <template slot-scope="scope">
              <span @click="upLayer(scope.row.id, scope.row.parentId, 1)">
                <svg-icon
                  icon-class="up"
                  class="svg primary"
                  :class="canClick(scope.row.id, scope.row.parentId, 1)"
                ></svg-icon>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop label="下降" align="center" width="100%">
            <template slot-scope="scope">
              <span @click="downLayer(scope.row.id, scope.row.parentId, 2)">
                <svg-icon
                  icon-class="down"
                  class="svg warning"
                  :class="canClick(scope.row.id, scope.row.parentId, 2)"
                ></svg-icon>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200">
            <template slot-scope="scope">
              <transition leave-active-class="slide-out" enter-active-class="slide-in">
                <div
                  v-show="tableRowIndex == scope.$index"
                  style="display:inline-block; margin-left:10px"
                >
                  <el-button
                    plain
                    type="warning"
                    size="mini"
                    v-if="canUpdatePassword"
                    @click="modifyChannel(scope.row)"
                  >修改</el-button>
                  <el-button
                    type="danger"
                    plain
                    size="mini"
                    v-if="canDelete"
                    @click="delChannel(scope.row)"
                  >删除</el-button>
                </div>
              </transition>

              <transition leave-active-class="slide-out" enter-active-class="slide-in">
                <el-button
                  type="info"
                  size="mini"
                  plain
                  v-show="tableRowIndex != scope.$index"
                  @click="tableRowIndex = scope.$index"
                  class="ml-1"
                >操作</el-button>
              </transition>
            </template>
          </el-table-column>
        </el-table>
        <div class="footer-info">
          <span style="color:#409EFF">所有栏目数据条数：{{total}}</span>
        </div>
      </div>
    </el-card>
    <!-- <transition name="fade-to-left" mode="out-in"> -->
    <router-view @upTree="upTree" @uprow="uprow"></router-view>
    <!-- </transition> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import formatTree from "@/utils/formatTree";
import channeltree from "@/components/channelTree/index.vue";
import {
  getChannel,
  delChannel,
  modifySort
} from "@/api/backgroundSystem/Channel";

@Component({
  components: { channeltree }
})
export default class ChannelList extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/user/list")
  ];

  // 组件显隐控制
  private addVisible: boolean = false;
  private updataPasswordVisible: boolean = false;

  // 视图数据
  private tableData: any = [];
  private originData: any = [];
  @Prop()
  private groupName?: string;
  @Prop()
  private parentId?: any;
  @Prop()
  private channelName?: any;

  private total = 0;

  //上升下降
  private upDown: any = {
    upOrdowns: 0,
    number: 1
  };

  // 按钮权限控制
  private canUpdatePassword: boolean = true;
  private canDelete: boolean = true;
  private canAdd: boolean = true;

  // 视图样式属性
  private rotateFlag: boolean = false;
  private tableRowIndex = -1;
  private old: boolean = false;

  // 搜索项
  private search = {};

  private initData() {
    this.rotateFlag = true;
    getChannel.request().then((res: any) => {
      this.tableData = res.filter((item: any) => item.id === this.parentId);
      this.rotateFlag = false;
    });
  }

  // 添加栏目
  private addChannel() {
    this.$router.push({
      path: "channel/add",
      query: { parentId: this.parentId, channelName: this.channelName }
    });
  }

  // 修改栏目
  private rowData: any = {};
  private modifyChannel(row: any) {
    this.rowData = row;
    this.$router.push({
      path: "channel/modify",
      query: { rowdata: this.rowData }
    });
  }

  // 删除栏目
  private async delChannel(row: any) {
    try {
      await this.delTip();
    } catch (error) {
      return;
    }
    delChannel.request(row.id).then(() => {
      this.$message.success("删除成功！");
      this.$emit("updateTree");
      this.getList();
    });
  }

  // 删除提示
  private delTip() {
    return new Promise((resolve, reject) => {
      this.$confirm("即将删除该栏目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  }

  //上升
  private upLayer(id: any, parentId: any, type: number) {
    if (this.canClick(id, parentId, type)) {
      return;
    }
    this.upDown.upOrdowns = 2;
    modifySort.request(id, this.upDown).then(res => {
      this.$message.success("调整成功");
      this.getList();
      this.$emit("updateTree");
    });
  }

  //下降
  private downLayer(id: any, parentId: any, type: number) {
    if (this.canClick(id, parentId, type)) {
      return;
    }
    this.upDown.upOrdowns = 4;
    modifySort.request(id, this.upDown).then(res => {
      this.$message.success("调整成功");
      this.getList();
      this.$emit("updateTree");
    });
  }

  private upTree() {
    this.$emit("updateTree");
  }

  private uprow(rowid: any) {
    getChannel.request().then((res: any) => {
      this.tableData = res.filter((item: any) => item.id == rowid);
    });
  }

  private activated() {
    this.getList();
  }

  // 如果parentId == 0，则拉取所有列表
  getList() {
    if (this.parentId == 0) {
      this.getAll();
    } else {
      this.initData();
    }
  }

  private getAll() {
    this.rotateFlag = true;
    getChannel.request().then((res: any) => {
      this.total = res.length;
      this.originData = res;
      let tree = formatTree({
        arrayList: res,
        pidStr: "parentId",
        label: "channelName"
      });
      this.tableData = tree;
      this.rotateFlag = false;
    });
  }

  // 上升下降能否点击判断
  private canClick(id: any, parentId: any, type: number) {
    let list = this.originData.filter((item: any) => item.parentId == parentId);
    let index = list.map((item: any) => item.id).indexOf(id);
    if (type === 1) {
      return index == 0 ? "disable" : "";
    } else if (type === 2) {
      let length = list.length;
      return length == index + 1 ? "disable" : "";
    }
  }

  @Watch("parentId", { immediate: true })
  private channelChange() {
    this.getList();
  }

  @Watch("$route", { immediate: true })
  private routeChange(route: any) {
    this.old = route.path == "/site/main/channel";
  }

  private tableRowClassName({ row, rowIndex }: any) {
    if (rowIndex % 2 == 1) {
      return "odd";
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
}
::-webkit-scrollbar {
  display: none;
}
.ncontent {
  display: flex;
  flex: 1;
}
.svg {
  width: 50px;
  height: 28px;
  cursor: pointer;
  &.disable {
    cursor: not-allowed;
    color: #909399;
  }
}
</style>
