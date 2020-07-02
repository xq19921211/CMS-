<template>
  <div>
    <el-card  style="min-height:100%;">
      <div slot="header" class="clearfix">
        <span @click="getAllService">
          <i class="el-icon-refresh" :class="{rotate:rotateFlag}"></i> 刷新
        </span>
        <el-button
          v-if="canAdd"
          class="card-btn-1"
          @click="addVisible = true"
          plain
          type="primary"
        >添加服务</el-button>
      </div>
      <el-form label-width="100px">
        <el-col :span="7">
          <el-form-item label="服务名称">
            <el-input v-model="search.name" placeholder="服务名称" @change="getAllService"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div>
        <el-table
          :data="tableData"
          :row-class-name="tableRowClassName"
          v-loading="rotateFlag"
          border
          style="width: 100%"
        >
          <el-table-column prop="appId" label="服务唯一标识" align="center"></el-table-column>
          <el-table-column prop="name" label="服务名称" align="center"></el-table-column>
          <el-table-column prop="englishName" label="服务英文名称" align="center"></el-table-column>
          <el-table-column prop="endpoints.ip" label="服务ip" align="center"></el-table-column>
          <el-table-column prop="endpoints.port" label="服务端口" align="center"></el-table-column>
          <el-table-column prop="endpoints.appSecret" label="服务密钥" align="center"></el-table-column>
          <el-table-column prop="defaultVersion" label="版本号" align="center"></el-table-column>
          <el-table-column label="是否支持用户管理" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.userInfoManage?'是':'否'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="服务角色标识" align="center">
            <template slot-scope="scope">
              <el-button
                type="info"
                plain
                size="mini"
                @click="viewUserRoleTags(scope.row.userRoleTags)"
                :disabled="(!scope.row.userInfoManage) || scope.row.userRoleTags == null"
              >查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="是否有节点在线" align="center">
            <template slot-scope="scope">
              <span :style="{color:scope.row.state ?'green':'red'}">{{scope.row.state?'是':'否'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否启用" align="center">
            <template slot-scope="scope">
              <span :style="{color:scope.row.enabled ?'green':'red'}">{{scope.row.enabled?'是':'否'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="160px">
            <template slot-scope="scope">
              <transition leave-active-class="slide-out" enter-active-class="slide-in">
                <div
                  v-show="tableRowIndex == scope.$index"
                  style="display:inline-block; margin-left:10px"
                >
                  <el-button
                    plain
                    size="mini"
                    type="warning"
                    v-if="canUpdate"
                    @click="updateVisible = true;appId = scope.row.appId"
                  >修改</el-button>
                  <el-button
                    type="danger"
                    plain
                    size="mini"
                    @click="del(scope.row.appId)"
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
    <update :visible.sync="updateVisible" :appId="appId" @refresh="getAllService" />
    <add :visible.sync="addVisible" @refresh="getAllService" />
    <role-tag :visible.sync="viewRoleTagVisible" :tagData="tags"></role-tag>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
// 组件
import update from "../update/index.vue";
import add from "../add/index.vue";
import roleTag from "../roleTag/index.vue";
// api
import { getAllService, deleteService } from "@/api/middleSystem";

@Component({
  components: {
    update,
    add,
    roleTag
  }
})
export default class ServiceList extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/service/list")
  ];
  
  // 视图属性
  private tableData: object[] = [];
  private appId = "";
  private roleTagTitle: string = "";
  private roleTagDescription: string = "";
  private tags: any[] = [];

  // 组件显隐
  private updateVisible = false;
  private addVisible = false;
  private viewRoleTagVisible = false;

  // 按钮权限
  private canUpdate: boolean = false;
  private canDelete: boolean = false;
  private canAdd: boolean = false;

  // 分页
  private total = 0;
  private pageSize = 10;
  private currentPage = 1;

  // 视图样式属性
  private rotateFlag: boolean = false;
  private tableRowIndex = -1;

  // 搜索项
  private search = {
    name: ""
  };

  private created() {
    this.canUpdate = canAccessView(update);
    this.canDelete = canAccessView(new ApiDescription("/service/{appId}", HttpMethod.Delete));
    this.canAdd = canAccessView(add);
    this.getAllService();
  }

  private del(appId: string) {
    this.$confirm("是否删除此服务?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        deleteService(appId).then(() => {
          this.getAllService();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        });
      })
      .catch((error: any) => {
        this.$message({
          type: "warning",
          message: "已取消删除"
        });
      });
  }

  private viewUserRoleTags(userRoleTags: any) {
    this.viewRoleTagVisible = true;
    let tempData: any = [];
    Object.keys(userRoleTags).forEach((tag: any) => {
      tempData.push({
        tag
      });
    });
    this.tags = tempData;
  }

  private getAllService() {
    this.rotateFlag = true;
    getAllService(this.currentPage, this.pageSize, this.search.name).then(
      (res: any) => {
        this.tableData = res.data;
        this.total = res.count;
        this.rotateFlag = false;
      }
    );
  }

  private handleCurrentChange(val: number) {
    this.currentPage = val;
    this.getAllService();
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