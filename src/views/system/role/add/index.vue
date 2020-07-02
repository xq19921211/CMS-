<template>
  <el-card class="box-card" style="height:auto">
    <div slot="header" class="clearfix">
      <span @click="getAllApi">
        <i class="el-icon-refresh" :class="{rotate:!treeData}"></i> 刷新
      </span>
    </div>
    <el-form ref="addRoleform" :rules="addRoleFormRule" :model="formData" label-width="150px">
      <el-form-item label="角色名称" prop="name">
        <el-col :span="7">
          <el-input v-model.trim="formData.name"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="角色标识符" prop="tag">
        <el-col :span="7">
          <el-input v-model.trim="formData.tag"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="权限级别" prop="level">
        <el-col :span="7">
          <el-input v-model.number="formData.level"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="服务角色">
        <el-col :span="7">
          <el-input-number v-model="num" :min="0" @change="numChange"></el-input-number>
        </el-col>
      </el-form-item>

      <div v-for="(item,index) in num" :key="index">
        <el-form-item label="支持用户管理的服务">
          <el-col :span="7">
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
          </el-col>
        </el-form-item>

        <el-form-item label="服务角色标识" prop="roleTag">
          <el-col :span="7">
            <el-select v-model="roleTags[index]" placeholder="请选择" clearable>
              <el-option
                v-for="item in options[index]"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </div>

      <el-form-item>
        <el-checkbox slot="label" v-model="checked">权限分配</el-checkbox>
        <el-col :span="7">
          <el-tree
            v-loading="!treeData"
            :data="treeData"
            show-checkbox
            default-expand-all
            @check-change="check"
            node-key="id"
            ref="addRoleTree"
            highlight-current
            :props="treeProps"
          ></el-tree>
        </el-col>
      </el-form-item>

      <el-form-item label="开放注册" prop="allowRegister">
        <el-switch v-model="formData.allowRegister" class="mr-1"></el-switch>
      </el-form-item>

      <el-form-item label="后台访问" prop="isAdminRole">
        <el-switch v-model="formData.isAdminRole" class="mr-1"></el-switch>
      </el-form-item>

      <el-button type="primary" size="medium" @click="submit">添 加</el-button>
    </el-form>
  </el-card>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
// api
import { getAllApi, addRole, getAllService } from "@/api/middleSystem";
// 表单验证
import { addRoleFormRule } from "@/rules";
// 工具函数
import { formatTree } from "@/utils/filters";

@Component
export default class AddRole extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/role", HttpMethod.Post)
  ];

  private addRoleFormRule = addRoleFormRule;

  private treeData = [];
  private options: any[] = [];
  private supportUserInfoManageService: any[] = [];
  private currentService: any[] = [];
  private roleTags: any[] = [];
  private num = 0;
  private serviceDetail: any[] = [];

  // 是否全选
  private checked: boolean = false;

  private formData = {
    name: "",
    api: [],
    allowRegister: false,
    isAdminRole: false,
    tag: "",
    level: ""
  };
  private treeProps: object = {
    label: "name",
    children: "children",
    disabled: "disabled"
  };

  private check() {
    this.formData.api = (this.$refs.addRoleTree as any)
      .getCheckedNodes()
      .filter((item: any) => !item.children);
  }

  // 监听全选按钮
  @Watch("checked")
  private checkedChange(checked: boolean) {
    if (checked) {
      this.setAllChecked();
    } else {
      this.resetChecked();
    }
  }

  // 全选
  private setAllChecked() {
    let keys: number[] = [];
    this.treeData.map((item: any, index: number) => {
      keys.push(item.id);
    });
    (this.$refs.addRoleTree as any).setCheckedKeys(keys);
  }

  // 清空全选
  private resetChecked() {
    (this.$refs.addRoleTree as any).setCheckedKeys([]);
  }

  private submit() {
    (this.$refs.addRoleform as any).validate((valid: boolean) => {
      if (valid) {
        let {
          name,
          api,
          allowRegister,
          isAdminRole,
          tag,
          level
        } = this.formData;
        let roleTag: any[] = [];
        this.roleTags.forEach((rt, index) => {
          roleTag.push({
            service: this.currentService[index],
            tag: rt
          });
        });
        addRole(
          name,
          api,
          allowRegister,
          isAdminRole,
          tag,
          +level,
          roleTag
        ).then((res: any) => {
          this.$message.success("添加成功");
          this.formData.name = "";
          this.formData.api = [];
          this.formData.allowRegister = false;
          this.formData.isAdminRole = false;
          this.formData.tag = "";
          this.roleTags = [];
          this.currentService = [];
          this.formData.level = "";
        });
      } else {
        return false;
      }
    });
  }

  private created() {
    this.getAllApi();
    this.getAllService();
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

  private numChange(currentValue: number, oldValue: number) {
    // 减操作 清除已填入的数据
    if (currentValue < oldValue) {
      this.currentService.pop();
      this.roleTags.pop();
    }
  }

  private getAllApi() {
    getAllApi().then((res: any) => {
      this.treeData = formatTree(res.data);
    });
  }

  private getAllService() {
    getAllService(1, 10000, "", true).then((res: any) => {
      this.serviceDetail = res.data;
      if (res.data.length > 0) {
        res.data.forEach((service: any) => {
          let serviceAppId = service.appId;
          this.supportUserInfoManageService.push({
            value: serviceAppId
          });
        });
      }
    });
  }
}
</script>

<style lang="scss" scoped>
</style>
