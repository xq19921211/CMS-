<template>
  <el-dialog
    title="添加用户"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    @close="clearData"
    width="30%"
  >
    <div>
      <el-form :rules="addUserFormRule" ref="addUserForm" :model="formData" label-width="100px">
        <el-form-item label="姓名" prop="nickname">
          <el-col :span="20">
            <el-input v-model.trim="formData.nickname"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="电话" prop="phone">
          <el-col :span="20">
            <el-input v-model.trim="formData.phone"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="账号" prop="account">
          <el-col :span="20">
            <el-input
              v-model.trim="formData.account"
              :readonly="passwordFlag"
              @focus="passwordFlag = false"
            ></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-col :span="20">
            <el-input v-model.trim="formData.password" type="password" :show-password="true"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="角色" prop="roleId">
          <el-col :span="20">
            <el-select v-model.trim="formData.roleId" @change="roleChange" placeholder="请选择">
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button @click="submit" type="primary">添 加</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
    
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
// 表单验证
import { addUserFormRule } from "@/rules";
// api
import { getAllRole, addUser, getRoleTags } from "@/api/middleSystem";

@Component({
  components: {}
})
export default class AddUser extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/user", HttpMethod.Post)
  ];

  @Prop() public visible: boolean = false;

  private addUserFormRule = addUserFormRule;
  private roleList: any[] = [];
  private passwordFlag: boolean = false;

  private formData: any = {
    nickname: "",
    account: "",
    password: "",
    roleId: "",
    phone: ""
  };

  private created() {
    getAllRole().then((res: any) => {
      this.roleList = res.data;
      console.log(this.roleList)
    });
  }

  private submit() {
    (this.$refs.addUserForm as any).validate((valid: boolean) => {
      if (valid) {
        let { account, password, roleId, nickname, phone } = this.formData;
        let detail = {};
        addUser(account, password, roleId, nickname, phone, detail).then(
          (res: any) => {
            this.$message.success("注册成功！");
            this.dialogVisible = false;
            this.$emit("refresh");
          }
        );
      } else {
        return false;
      }
    });
  }

  // 获取角色的服务角色标识
  private roleChange() {}

  private clearData() {
    (this.$refs.addUserForm as any).resetFields();
  }

  get dialogVisible() {
    return this.visible;
  }
  set dialogVisible(v) {
    this.$emit("update:visible", v);
  }

  
}
</script>
