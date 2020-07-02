
<template>
  <div>
    <el-card v-if="old" style="min-height:100%;">
      <div slot="header" class="clearfix">
        <span @click="getAllRole">
          <i class="el-icon-refresh" :class="{rotate:rotateFlag}"></i> 刷新
        </span>
      </div>
      <el-form label-width="100px">
        <el-col :span="7">
          <el-form-item label="角色名">
            <el-input v-model="search.name" placeholder="角色名" @change="getAllRole"></el-input>
          </el-form-item>
        </el-col>
        <el-button class="ml-2" type="primary" plain @click="inRole" v-if="canImport">数据导入</el-button>
        <el-button class="ml-2" type="primary" plain @click="exRole" v-if="canExport">数据导出</el-button>
      </el-form>
      <div>
        <el-table
          v-if="tableData"
          :data="tableData"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange"
          v-loading="rotateFlag"
          border
          style="width: 100%"
        >
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="name" label="角色名" align="center"></el-table-column>
          <el-table-column label="开放注册" align="center">
            <template slot-scope="scope">{{scope.row.allowRegister?'是':'否'}}</template>
          </el-table-column>
          <el-table-column prop="userCount" label="用户数量（人）" align="center"></el-table-column>
          <el-table-column prop="tag" label="标识符" align="center"></el-table-column>
          <el-table-column prop="level" label="权限级别" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="210px">
            <template slot-scope="scope">
              <el-button
                plain
                size="mini"
                type="primary"
                v-if="canViewDetail"
                @click="
                $router.push(`/system/role/list/${scope.row.id}`)"
              >查看</el-button>
              <transition leave-active-class="slide-out" enter-active-class="slide-in">
                <div
                  v-show="tableRowIndex == scope.$index"
                  style="display:inline-block; margin-left:10px"
                >
                  <el-button
                    type="danger"
                    plain
                    size="mini"
                    @click="del(scope.row.id)"
                    v-if="canDelete"
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
    <transition name="fade-to-left" mode="out-in">
      <router-view></router-view>
    </transition>
    <import-role :visible.sync="importVisible" @refresh="getAllRole"></import-role>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import BaseView from "@/views/baseView";
// api
import { getAllRole, deleteRole, exportRole } from "@/api/middleSystem";
// 组件
import canAccessView from "@/utils/accessCheck";
import detail from "../detail/index.vue";
import importRole from "../import/index.vue";

@Component({
  components: {
    importRole
  }
})
export default class Role extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/role/list")
  ];

  // 视图数据
  private tableData: any = [];

  // 导出数据列表项
  private multipleSelection: any = [];

  // 按钮权限
  private canViewDetail = false;
  private canDelete = false;
  private canExport = false;
  private canImport = false;

  // 组件显隐
  private importVisible: boolean = false;

  // 分页
  private total = 0;
  private pageSize = 10;
  private currentPage = 1;

  // 视图样式属性
  private rotateFlag: boolean = false;
  private tableRowIndex = -1;
  private old: boolean = false;

  // 搜索项
  private search = {
    name: ""
  };

  private created() {
    this.canViewDetail = canAccessView(detail);
    this.canDelete = canAccessView( new ApiDescription("/role/{roleId}", HttpMethod.Delete) );
    this.canExport = canAccessView( new ApiDescription("/role/export", HttpMethod.Post) );
    this.canImport = canAccessView( new ApiDescription("/role/import", HttpMethod.Post) );
  }

  private handleSelectionChange(val: any) {
    this.multipleSelection = val;
  }

  private exRole() {
    let ids: string[] = [];
    this.multipleSelection.forEach((item: any) => {
      ids.push(item.id);
    });
    exportRole(ids).then((res: any) => {
      this.$message.success("导出成功！");
    });
  }

  private inRole() {
    this.$confirm(
      "请不要导入当前已经存在的角色，如有重复，请在文件中删除重复角色后导入！",
      "导入角色",
      {
        confirmButtonText: "继续",
        cancelButtonText: "取消",
        distinguishCancelAndClose: true,
        type: "warning"
      }
    )
      .then(() => {
        this.importVisible = true;
      })
      .catch((action: any) => {});
  }

  private del(userId: string) {
    this.$confirm("是否删除该角色?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "error"
    }).then(() => {
      deleteRole(userId).then(() => {
        this.getAllRole();
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    });
  }

  private getAllRole() {
    this.rotateFlag = true;
    getAllRole(this.search.name, this.currentPage, this.pageSize).then(
      (res: any) => {
        this.tableData = res.data;
        this.total = res.count;
        this.rotateFlag = false;
      }
    );
  }

  private mounted() {
    this.getAllRole();
  }

  private handleCurrentChange(val: number) {
    this.currentPage = val;
    this.getAllRole();
  }

  @Watch("$route", { immediate: true })
  private routeChange(route: any) {
    this.old = route.path == "/system/role/list";
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