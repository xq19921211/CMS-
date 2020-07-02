<template>
  <div>
    <el-card v-if="old" style="min-height:100%;">
      <div slot="header" class="clearfix">
        <span @click="getUserList">
          <i class="el-icon-refresh" :class="{rotate:rotateFlag}"></i> 刷新
        </span>
        <el-button v-if="canAdd" class="card-btn-1" @click="addUser" plain type="primary">添加用户</el-button>
      </div>
      <el-form label-width="100px">
        <el-col :span="5" class="mr-2">
          <el-form-item label="昵称">
            <el-input v-model="search.nickname" placeholder="昵称" @blur="searchHandle"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" class="mr-2">
          <el-form-item label="角色">
            <al-input
              ref="input"
              :data="roleList"
              label="name"
              val="id"
              v-model="search.roleId"
              @change="searchHandle"
            />
          </el-form-item>
        </el-col>
        <el-col :span="5" class="mr-2">
          <el-form-item label="电话号码">
            <el-input v-model="search.phone" placeholder="电话号码" @blur="searchHandle"></el-input>
          </el-form-item>
        </el-col>
        <el-button plain type="primary" @click="searchHandle('reset')">重置</el-button>
      </el-form>
      <div>
        <el-table
          v-if="tableData"
          :data="tableData"
          :row-class-name="tableRowClassName"
          v-loading="rotateFlag"
          border
          style="width: 100%"
        >
          <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
          <el-table-column prop="account" label="账号" align="center"></el-table-column>
          <el-table-column prop="phone" label="电话号码" align="center"></el-table-column>
          <el-table-column prop="role.name" label="所属角色" align="center"></el-table-column>
          <el-table-column prop="hasService" label="拥有服务" align="center">
            <template slot-scope="scope">
              <span
                :style="{color:(scope.row.role.roleTag&&scope.row.role.roleTag.length) ?'green':'#606266'}"
              >{{(scope.row.role.roleTag&&scope.row.role.roleTag.length)? '是':'否'}}</span>
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
                    @click="modifyPassword(scope.row)"
                    v-if="canUpdatePassword"
                  >修改密码</el-button>
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

    <add :visible.sync="addVisible" @refresh="getUserList" />
    <updataPassword :visible.sync="updataPasswordVisible" :userId="userId" @refresh="getUserList" />

    <transition name="fade-to-left" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
// 组件
import add from "../add/index.vue";
import updataPassword from "../update/index.vue";
// api
import { getUserList, deleteUser, fetchAllRole } from "@/api/middleSystem";

@Component({
  components: {
    add,
    updataPassword
  }
})
export default class User extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/user/list")
  ];

  // 组件显隐控制
  private addVisible: boolean = false;
  private updataPasswordVisible: boolean = false;

  // 视图数据
  private tableData: any = [];
  private roleList = [];
  private userId: string = "";
  private roleId: string = "";
  private account: string = "";

  // 按钮权限控制
  private canUpdatePassword: boolean = false;
  private canDelete: boolean = false;
  private canAdd: boolean = true;

  // 分页属性
  private total = 0;
  private pageSize = 10;
  private currentPage = 1;

  // 视图样式属性
  private rotateFlag: boolean = false;
  private tableRowIndex = -1;
  private old: boolean = false;

  // 搜索项
  private search = {
    nickname: "",
    roleId: "",
    phone: ""
  };

  private created() {
    this.canDelete = canAccessView([
      new ApiDescription("/user/{userId}", HttpMethod.Delete)
    ]);
    this.canAdd = canAccessView(add);
    this.canUpdatePassword = canAccessView(updataPassword);

    this.getAllRole();
    this.getUserList();
  }

  // 获取所有角色
  private getAllRole() {
    fetchAllRole().then((res: any) => {
      this.roleList = res.data;
    });
  }

  // 获取用户列表
  private getUserList() {
    this.rotateFlag = true;
    getUserList(
      this.search.nickname,
      this.search.roleId,
      this.currentPage,
      this.pageSize,
      this.search.phone
    ).then((res: any) => {
      this.tableData = res.data;
      console.log(this.pageSize)
      if (this.tableData.length > 0) {
        let userIds: any[] = [];
        this.tableData.forEach((user: any) => {
          userIds.push(user.id);
        });
      }
      this.total = res.count;
      this.rotateFlag = false;
    });
  }

  // 删除用户
  private del(userId: string) {
    this.$confirm("是否删除该用户?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }).then(() => {
      deleteUser(userId).then(() => {
        this.getUserList();
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    });
  }

  // 修改密码
  private modifyPassword(obj: any) {
    this.userId = obj.id;
    this.account = obj.account;
    this.updataPasswordVisible = true;
  }

  // 添加用户
  private addUser() {
    this.addVisible = true;
  }

  // 搜索方法
  private searchHandle(str: string | number) {
    this.currentPage = 1;
    if (str == "reset") {
      this.search.nickname = "";
      this.search.roleId = "";
      this.search.phone = "";
      (this.$refs.input as any).state = "";
    }
    this.getUserList();
  }

  // 分页
  private handleCurrentChange(val: number) {
    this.currentPage = val;
    this.getUserList();
  }

  @Watch("$route", { immediate: true })
  private routeChange(route: any) {
    this.old = route.path == "/system/user/list";
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
