<template>
  <div>
    <el-card v-if="detailData">
      <div slot="header" class="clearfix">
        <span>角色详情</span>
        <el-button
          type="primary"
          size="medium"
          class="card-btn-1"
          @click="updateVisible = true"
          v-if="canUpdate"
        >修 改</el-button>
      </div>
      <el-col :span="8" class="mb-1">角色名称：{{detailData.name}}</el-col>
      <el-col :span="8" class="mb-1">开放注册：{{detailData.allowRegister?'是':'否'}}</el-col>
      <el-col :span="8" class="mb-1">后台访问：{{detailData.isAdminRole?'是':'否'}}</el-col>
      <el-col :span="8" class="mb-1">角色标识符：{{detailData.tag}}</el-col>
      <el-col :span="8" class="mb-1">权限级别：{{detailData.level}}</el-col>
      <el-col :span="8" class="mb-1">服务角色标识：{{serviceRoleTag != '' ? serviceRoleTag:'暂无'}}</el-col>
      <el-col :span="10" class="mb-1">
        角色权限：
        <el-tree
          v-loading="!apiTree"
          :data="apiTree"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="roleApiTree"
          highlight-current
          :props="treeProps"
        ></el-tree>
      </el-col>
    </el-card>
    <update
      :visible.sync="updateVisible"
      :detailData="detailData"
      :apiTree="apiTree"
      :checked="checked"
      :treeProps="treeProps"
      @refresh="initData"
    />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ApiDescription } from "@/utils/apiDescription";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
// api
import { getRole, getAllApi, getRoleTags } from "@/api/middleSystem";
// 工具函数
import { formatTree } from "@/utils/filters";
// 组件
import update from "../update/index.vue";


@Component({
  components: { update }
})
export default class UpkeepDetail extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/role/{roleId}")
  ];

  // 视图属性
  private serviceRoleTag: string = "";
  private detailData: any = {};
  private apiTree: any = null;
  private checked: any = [];

  // 组件显隐
  private updateVisible: boolean = false;

  // 按钮权限
  private canUpdate: boolean = false;

  // tree属性
  private treeProps: object = {
    label: "name",
    children: "children",
    disabled: "disabled"
  };

  private created() {
    this.canUpdate = canAccessView(update);
    this.initData();
  }

  private initData() {
    this.apiTree = null;
    this.checked = [];
    getRole(this.$route.params.id).then((role: any) => {
      let apis = role.api;
      this.detailData = role;
      getRoleTags(role.id).then((r: any) => {
        if (JSON.stringify(r) != "{}") {
          this.serviceRoleTag = Object.keys(r.schoolbus)[0];
        }
      });
      getAllApi().then((res: any) => {
        this.apiTree = formatTree(res.data, true);
        res.data.forEach((i: any) => {
          apis.forEach((o: any) => {
            if (i.url == o.url && i.method == o.method) {
              this.checked.push(i.id);
            }
          });
        });
        (this.$refs.roleApiTree as any).setCheckedKeys(this.checked);
      });
    });
  }
}
</script>
