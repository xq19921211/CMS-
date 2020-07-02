<template>
  <el-dialog
    title="修改角色信息"
    :visible.sync="dialogVisible"
    @open="initData"
    @close="clear"
    top="5vh"
    width="30%"
    center
    append-to-body
  >
    <el-form label-width="100px">
      <el-form-item label="角色名称">
        <el-input type="text" v-model="formData.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="标识符">
        <el-input type="text" v-model="formData.tag" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="权限级别" prop="level">
        <el-input v-model.number="formData.level"></el-input>
      </el-form-item>

      <el-form-item label="服务角色">
        <el-input-number v-model="num" :min="0" @change="numChange"></el-input-number>
      </el-form-item>

      <div v-for="(item,index) in num" :key="index">
        <el-form-item label="支持用户管理的服务">
          <el-select
            v-model="currentService[index]"
            placeholder="请选择"
            @change="serviceChange(index)"
            clearable
          >
            <el-option
              v-for="item in supportUserInfoManageService"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="服务角色标识" prop="roleTag">
          <el-select v-model="roleTags[index]" placeholder="请选择" clearable>
            <el-option
              v-for="item in options[index]"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>

      <el-form-item label="开放注册">
        <el-switch v-model="formData.allowRegister" class="mr-1"></el-switch>
      </el-form-item>

      <el-form-item label="后台访问">
        <el-switch v-model="formData.isAdminRole" class="mr-1"></el-switch>
      </el-form-item>

      <el-form-item label="权限分配" prop="api">
        <el-tree
          :data="treeData"
          show-checkbox
          default-expand-all
          node-key="id"
          :default-checked-keys="checked"
          ref="updateRoleTree"
          highlight-current
          :props="treeProps"
        ></el-tree>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
// vuex
import store from "@/store";
// api
import { getRole, updateRole, getRoleTags, getAllService } from "@/api/middleSystem";

@Component
export default class UpdateRole extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/role/{roleId}", HttpMethod.Put)
  ];
  @Prop() private visible!: boolean;
  @Prop() private detailData!: any;
  @Prop() private apiTree!: any;
  @Prop() private treeProps!: any;
  @Prop() private checked!: any;

  private treeData: any = null;
  private formData: any = {};

  private options: any[] = [];

  private roleTags: any[] = [];

  private currentService: any[] = [];

  private supportUserInfoManageService: any[] = [];

  private serviceDetail: any[] = [];

  private num = 0;

  private initData() {
    this.formData = JSON.parse(JSON.stringify(this.detailData));
    this.treeData = JSON.parse(JSON.stringify(this.apiTree));
    this.treeData.forEach((i: any) => {
      i.disabled = false;
      if (i.children) {
        i.children.forEach((o: any) => {
          o.disabled = false;
        });
      }
    });

    this.getAllService();

    getRoleTags(this.$route.params.id).then((res: any) => {
      let tags = Object.keys(res);
      this.num = tags.length;
      tags.forEach((tag: any) => {
        this.currentService.push(tag);
      });
      this.roleTags.push(Object.keys(res[tags[0]])[0]);
    });
  }

  private numChange() {}

  private getAllService() {
    getAllService(1, 10000, "", true).then((res: any) => {
      this.serviceDetail = res.data;
      if (res.data.length > 0) {
        res.data.forEach((service: any) => {
          let serviceAppId = service.appId;
          this.supportUserInfoManageService.push({
            value: serviceAppId
          });
          let userRoleTags = Object.keys(service.userRoleTags);
          let tempTags: any[] = [];
          userRoleTags.forEach((tag: any) => {
            tempTags.push({
              value: tag
            });
          });
          this.options.push(tempTags);
        });
      }
    });
  }

  private serviceChange(index: number) {
    let currentServiceAppId = this.currentService[index];
    let tempTags: any[] = [];
    this.serviceDetail.forEach((service: any) => {
      if (service.appId == currentServiceAppId) {
        tempTags = Object.keys(service.userRoleTags);
      }
    });
    let tags: any[] = [];
    tempTags.forEach((tag: any) => {
      tags.push({ value: tag });
    });
    this.options[index] = tags;
  }

  private clear() {
    this.roleTags = [];
  }

  private submit() {
    let roleId = this.$route.params.id;
    let api = (this.$refs.updateRoleTree as any)
      .getCheckedNodes()
      .filter((item: any) => !item.children);
    let { name, allowRegister, isAdminRole, tag, level } = this.formData;
    let rts: any[] = [];
    this.roleTags.forEach((rt, index) => {
      rts.push({
        service: this.currentService[index],
        tag: rt
      });
    });
    updateRole(
      roleId,
      name,
      api,
      allowRegister,
      isAdminRole,
      tag,
      +level,
      rts
    ).then(() => {
      this.$message.success("修改成功,页面即将刷新！");
      // 存储权限路由表
      store.dispatch("setRouteMenu");
      setTimeout(() => {
        location.reload();
      }, 2000);
      this.dialogVisible = false;
      this.$emit("refresh");
    });
  }

  get dialogVisible() {
    return this.visible;
  }
  set dialogVisible(v) {
    this.$emit("update:visible", v);
  }
}
</script>
