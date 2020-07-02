<template>
  <div class="ncontent">
    <el-card v-if="old" style="width:0;height:100%;flex:1; transition: width 0.2s linear;">
      <div slot="header" class="clearfix">
        <span @click="initData">
          <i class="el-icon-refresh" :class="{rotate:rotateFlag}"></i>
          {{channelName}}
        </span>
        <div class="card-btn-1">
          <el-button v-if="canAdd" @click="addContent" plain type="primary">添加内容</el-button>
          <el-button
            v-if="canDelete && multipleSelection.length > 0"
            @click="delContent(multipleSelection)"
            plain
            type="danger"
          >删除内容</el-button>
        </div>
      </div>
      <el-form label-width="100px"></el-form>
      <div>
        <el-table
          v-if="tableData"
          :data="tableData"
          :row-class-name="tableRowClassName"
          v-loading="rotateFlag"
          @selection-change="handleSelectionChange"
          style="width: 100%"
          border
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="title" label="标题" align="center"></el-table-column>
          <el-table-column prop="author" label="作者" align="center"></el-table-column>
          <el-table-column prop="attribute" label="属性" align="center">
            <template slot-scope="scope">
              <span v-for="(item,index) in icon" :key="index">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="item.label"
                  placement="top"
                  v-if="scope.row[item.field]"
                >
                  <svg-icon
                    :icon-class="item.icon"
                    v-if="scope.row[item.field]"
                    style="width:16px;height:16"
                  ></svg-icon>
                </el-tooltip>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="300">
            <template slot-scope="scope">
              <transition leave-active-class="slide-out" enter-active-class="slide-in">
                <div
                  v-show="tableRowIndex == scope.$index"
                  style="display:inline-block;margin-left:10px"
                >
                  <el-button
                    plain
                    size="mini"
                    type="primary"
                    v-if="canAttribute"
                    @click="setAttribute(scope.row.id)"
                  >属性</el-button>
                  <el-button
                    plain
                    type="warning"
                    size="mini"
                    v-if="canUpdate"
                    @click="modifyContent(scope.row)"
                  >修改</el-button>
                  <el-button
                    type="danger"
                    plain
                    size="mini"
                    v-if="canDelete"
                    @click="delContent(scope.row)"
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

    <set-attribute
      :visible.sync="attributeDialogVisible"
      :contentId="currentContentId"
      @refresh="initData"
    />
    <router-view @upcontent="upcontent"></router-view>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import { getContent, recoveryContent } from "@/api/backgroundSystem/Content";
import { formatTree } from "../../../../utils/filters";

// 组件
import setAttribute from "./dialog/setAttribute.vue";
import add from "./add.vue";
import modify from "./modify.vue";

Vue.filter("Attribute", function(value: any) {
  if (value == "isTop") return "顶置";
  if (value == "isRecommend") return "推荐";
  if (value == "isHot") return "热点";
  if (value == "isColor") return "醒目";
});

@Component({
  components: { setAttribute }
})
export default class ContentList extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription(getContent.baseUrl, getContent.method)
  ];

  @Prop()
  private channelName?: string;
  @Prop()
  private channelId?: string;

  // 视图数据
  private tableData: any = [];
  private icon: Array<{ label: string; field: string; icon: string }> = [
    {
      label: "置顶",
      field: "isTop",
      icon: "top"
    },
    {
      label: "推荐",
      field: "isRecommend",
      icon: "recommend"
    },
    {
      label: "热点",
      field: "isHot",
      icon: "hot"
    },
    {
      label: "醒目",
      field: "isColor",
      icon: "color"
    }
  ];

  private multipleSelection: Array<any> = [];
  private currentContentId: string | number = "";

  // 组件显隐控制
  private attributeDialogVisible: boolean = false;

  // 按钮权限控制
  private canUpdate: boolean = false;
  private canAttribute: boolean = false;
  private canDelete: boolean = false;
  private canAdd: boolean = false;

  // 分页属性
  private total = 0;
  private pageSize = 10;
  private currentPage = 1;

  // 视图样式属性
  private rotateFlag: boolean = false;
  private tableRowIndex = -1;
  private old: boolean = false;

  // 搜索项
  private search = {};

  private created() {
    this.canUpdate = canAccessView(modify);
    this.canAdd = canAccessView(add);
    this.canAttribute = canAccessView(setAttribute);
    this.canDelete = canAccessView(
      new ApiDescription(recoveryContent.baseUrl, recoveryContent.method)
    );
  }

  private upcontent() {
    this.initData();
  }

  private initData() {
    this.rotateFlag = true;
    getContent
      .request(<string>this.channelId, {
        PageSize: this.pageSize,
        Page: this.currentPage
      })
      .then((res: any) => {
        this.tableData = res.data;
        this.total = res.count;
        this.rotateFlag = false;
      });
  }

  // 设置属性
  private setAttribute(id: string | number) {
    this.currentContentId = id;
    this.attributeDialogVisible = true;
  }

  // 添加内容
  private addContent() {
    if (!this.channelId) {
      this.$alert("请选择栏目后在进行添加", "提示", {
        confirmButtonText: "确定",
        type: "warning"
      });
    } else {
      this.$router.push({
        path: "contents/add",
        query: { channelId: this.channelId, channelName: this.channelName }
      });
    }
  }

  // 修改内容
  private rowData: any = {};
  private modifyContent(row: any) {
    this.rowData = row;
    this.$router.push({
      path: "contents/modify",
      query: { rowdata: this.rowData }
    });
  }

  // 删除内容（如果是多选则批量删除，单选则转为数组删除）
  private async delContent(
    row:
      | Array<{ id: number; [key: string]: string | number }>
      | { id: number; [key: string]: string | number }
  ) {
    try {
      await this.delTip();
    } catch (error) {
      return;
    }
    if (!Array.isArray(row)) {
      row = [row];
    }
    let list = row.map(item => recoveryContent.request(item.id));
    Promise.all(list).then(() => {
      this.$message.success("删除成功！");
      this.initData();
    });
  }

  // 删除提示
  private delTip() {
    return new Promise((resolve, reject) => {
      this.$confirm("即将删除该内容, 是否继续?", "提示", {
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

  //table多选
  private handleSelectionChange(v: any) {
    this.multipleSelection = v;
  }

  // 搜索方法
  private searchHandle(str: string | number) {
    this.currentPage = 1;
    if (str == "reset") {
    }
    this.initData();
  }

  // 分页
  private handleCurrentChange(val: number) {
    this.currentPage = val;
    this.initData();
  }

  private activated() {
    if (this.channelId) {
      this.initData();
    }
  }

  @Watch("$route", { immediate: true })
  private routeChange(route: any) {
    this.old = route.path == "/site/main/contents";
  }

  @Watch("channelId", { immediate: true })
  private channelChange() {
    if (this.channelId) {
      this.initData();
    }
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
.ncontent {
  display: flex;
  flex: 1;
}
</style>
