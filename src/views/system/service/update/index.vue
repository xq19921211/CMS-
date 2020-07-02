<template>
  <el-dialog
    title="修改服务"
    :visible.sync="dialogVisible"
    @open="fetch"
    width="30%"
    center
    :modal-append-to-body="false"
  >
    <el-form
      v-if="formData"
      :rules="updateServiceFormRule"
      :model="formData"
      ref="updateServiceForm"
      status-icon
      label-width="130px"
    >
      <el-form-item label="服务唯一标识" prop="appId">
        <el-input type="text" v-model="formData.appId" disabled></el-input>
      </el-form-item>
      <el-form-item label="服务名称" prop="name">
        <el-input type="text" v-model="formData.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="服务英文名称" prop="englishName">
        <el-input type="text" v-model="formData.englishName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="服务ip" prop="endpoints.ip">
        <el-input type="text" v-model="formData.endpoints.ip" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="服务端口" prop="endpoints.port">
        <el-input type="text" v-model="formData.endpoints.port" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="服务密钥" prop="endpoints.appSecret">
        <el-input type="text" v-model="formData.endpoints.appSecret" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="版本号" prop="defaultVersion">
        <el-input type="text" v-model="formData.defaultVersion" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="节点在线" prop="state">
        <el-switch v-model="formData.state" class="mr-1"></el-switch>
      </el-form-item>
      <el-form-item label="是否启用" prop="enabled">
        <el-switch v-model="formData.enabled" class="mr-1"></el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">修 改</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ApiDescription, HttpMethod} from '@/utils/apiDescription';
import BaseView from '@/views/baseView';
import canAccessView from '@/utils/accessCheck';
// 表单验证
import { updateServiceFormRule } from '@/rules';
// api
import { getService, updateService } from '@/api/middleSystem';

@Component
export default class UpdateService extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription('/service/{appId}', HttpMethod.Put)
  ];
  @Prop() public visible!: boolean;
  @Prop() public appId!: string;
  private formData: any = null;
  private updateServiceFormRule = updateServiceFormRule;

  private fetch() {
    getService(this.appId).then((res: any) => {
      this.formData = res;
    });
  }

  private submit() {
    (this.$refs.updateServiceForm as any).validate((valid: boolean) => {
      if (valid) {
        let {
          appId,
          name,
          englishName,
          endpoints,
          defaultVersion,
          state,
          enabled
        } = this.formData;
        updateService(
          appId,
          name,
          englishName,
          endpoints,
          defaultVersion,
          state,
          enabled
        ).then((res) => {
          this.dialogVisible = false;
          this.$message.success('修改成功');
          this.$emit("refresh");
        });
      } else {
        return false;
      }
    });
  }

  get dialogVisible() {
    return this.visible;
  }
  set dialogVisible(v) {
    this.$emit('update:visible', v);
  }
}
</script>
