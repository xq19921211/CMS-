<template>
  <el-dialog
    title="添加服务"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    @close="clearData"
    :close-on-click-modal="false"
    width="30%"
  >
    <el-form ref="addServiceForm" :rules="addServiceFormRule" :model="formData" label-width="100px">
      <el-form-item label="唯一标识" prop="appId">
        <el-col :span="20">
          <el-input v-model.trim="formData.appId"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="服务名称" prop="name">
        <el-col :span="20">
          <el-input v-model.trim="formData.name"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="英文名称" prop="englishName">
        <el-col :span="20">
          <el-input v-model.trim="formData.englishName"></el-input>
        </el-col>
      </el-form-item>

       <el-form-item label="网络协议" prop="endpoints.protocol">
        <el-col :span="20">
          <el-input v-model.trim="formData.endpoints.protocol"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="服务ip" prop="endpoints.ip">
        <el-col :span="20">
          <el-input v-model.trim="formData.endpoints.ip"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="服务端口" prop="endpoints.port">
        <el-col :span="20">
          <el-input v-model.trim="formData.endpoints.port"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="服务密钥" prop="endpoints.appSecret">
        <el-col :span="20">
          <el-input v-model.trim="formData.endpoints.appSecret"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="默认版本" prop="defaultVersion">
        <el-col :span="20">
          <el-input v-model.trim="formData.defaultVersion"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="节点在线" prop="state">
        <el-col :span="20">
          <el-switch v-model="formData.state" class="mr-1"></el-switch>
        </el-col>
      </el-form-item>

      <el-form-item label="是否启用" prop="enabled">
        <el-col :span="20">
          <el-switch v-model="formData.enabled" class="mr-1"></el-switch>
        </el-col>
      </el-form-item>

      <div style="text-align:center">
        <el-button type="primary" size="medium" @click="submit">添 加</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { addServiceFormRule } from "@/rules";
import { addService } from "@/api/middleSystem";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";

@Component
export default class AddService extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/service", HttpMethod.Post)
  ];
  @Prop() private visible: boolean = false;
  private addServiceFormRule = addServiceFormRule;
  private formData: any = {
    appId: "",
    name: "",
    englishName: "",
    endpoints: {
      protocol: "",
      ip: "",
      port: "",
      appSecret: ""
    },
    defaultVersion: "",
    state: false,
    enabled: false
  };

  private submit() {
    (this.$refs.addServiceForm as any).validate((valid: boolean) => {
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
        addService(appId, name, englishName, endpoints, defaultVersion, state, enabled)
          .then((res: any) => {
            this.$message.success("添加成功");
            this.dialogVisible = false;
            this.$emit('refresh');
          })
          .catch((err: any) => {
            this.$message.warning("添加失败");
          });
      } else {
        return false;
      }
    });
  }

  private clearData(obj: any) {
    (this.$refs.addServiceForm as any).resetFields();
  }

  get dialogVisible() {
    return this.visible;
  }
  set dialogVisible(v) {
    this.$emit("update:visible", v);
  }
}
</script>
