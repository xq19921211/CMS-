<template>
  <el-dialog
    title="修改当前用户密码"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    @close="clearData"
    width="30%"
  >
    <el-form :model="formData" label-width="100px">
      <el-form-item label="旧密码">
        <el-col :span="24">
          <el-input v-model="formData.oldPassword" show-password></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="新密码">
        <el-col :span="24">
          <el-input v-model="formData.newPassword" show-password></el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="medium" @click="submit">修 改</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { modifyUserPass } from "@/api/middleSystem";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import BaseView from "@/views/baseView";

@Component
export default class ModifyPassword extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/user/password", HttpMethod.Put)
  ];
  @Prop() public visible: boolean = false;
  private formData = {
    oldPassword: "",
    newPassword: ""
  };
  private submit() {
    let flag = 0;
    if (!flag) {
      this.modifyUserPass();
    } else {
      this.$message.warning("请填写添加信息");
    }
  }

  private modifyUserPass() {
    let { oldPassword, newPassword } = this.formData;
    modifyUserPass(oldPassword, newPassword)
      .then((res: any) => {
        this.$message.success("修改成功");
        this.dialogVisible = false;
      })
      .catch((err: any) => {
        this.$message.error(err);
      });
  }

  private created() {}

  private clearData() {
    this.formData.oldPassword = "";
    this.formData.newPassword = "";
  }

  get dialogVisible() {
    return this.visible;
  }
  set dialogVisible(v) {
    this.$emit("update:visible", v);
  }
}
</script>

