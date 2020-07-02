<template>
  <el-dialog
    title="修改密码"
    :visible.sync="dialogVisible"
    width="30%"
    center
    @close="clearData"
    :modal-append-to-body="false"
  >
    <el-form
      ref="updateUserPassForm"
      :rules="updateUserPassFormRule"
      status-icon
      label-width="100px"
      :model="formData"
    >
      <!-- <el-form-item label="账号" v-if="account != ''">
        <el-input type="text" v-model="account" autocomplete="off" disabled></el-input>
      </el-form-item> -->
      <el-form-item label="新密码" prop="password">
        <el-input type="text" v-model="formData.password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ApiDescription, HttpMethod} from '@/utils/apiDescription';
import BaseView from '@/views/baseView';
import canAccessView from '@/utils/accessCheck';
// api
import { getUserDetail, updateUserPass } from '@/api/middleSystem';
// 表单验证
import { updateUserPassFormRule } from '@/rules';


@Component
export default class UpdateUser extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription('/user/password/{userId}', HttpMethod.Put)
  ];
  @Prop() public visible!: boolean;
  @Prop() public userId!: string;
  @Prop() public account!: string;
  private updateUserPassFormRule = updateUserPassFormRule;
  private formData = {
    password: ''
  };

  private submit() {
    (this.$refs.updateUserPassForm as any).validate((valid: boolean) => {
      if (valid) {
        updateUserPass(this.userId, this.formData.password).then((res) => {
          this.$message.success('修改成功');
        });
        this.dialogVisible = false;
      } else {
        return false;
      }
    });
  }

  private clearData() {
    (this.$refs.updateUserPassForm as any).resetFields();
  }

  get dialogVisible() {
    return this.visible;
  }
  set dialogVisible(v) {
    this.$emit('update:visible', v);
  }
}
</script>
