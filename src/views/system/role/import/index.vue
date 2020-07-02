<template>
  <div>
    <el-dialog
      title="导入角色"
      :visible.sync="dialogVisible"
      width="30%"
      center
      :modal-append-to-body="false"
      :close-on-click-modal="false"
    >
      <el-form ref="form" label-width="100px">
        <el-form-item label="角色文件">
          <el-upload
            ref="uploadFile"
            name="roleFile"
            :action="action"
            :on-success="succeed"
            :on-error="throwErr"
            :headers="{Token:token}"
            :auto-upload="false"
            accept=".json"
            :limit="1"
          >
            <el-button size="mini" class="el-icon-plus"></el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">导 入</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import BaseView from "@/views/baseView";
import { Getter } from "vuex-class";
import { importRole } from "@/api/middleSystem";

@Component
export default class ImportRoleView extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription("/role/import", HttpMethod.Post)
  ];

  @Prop() public visible!: boolean;

  @Getter("token") private token!: string;

  private action: string = `${process.env.VUE_APP_BASE_PATH}/role/import`;

  private submit() {
    (this.$refs as any).uploadFile.submit();
  }

  private succeed(res: any) {
    this.$emit("refresh");
    this.$message.success("导入成功！");
    this.dialogVisible = false;
  }

  private throwErr(err: any) {
    this.$message.warning(`导入失败：${JSON.parse(err.message).message}`);
  }

  get dialogVisible() {
    return this.visible;
  }

  set dialogVisible(v) {
    this.$emit("update:visible", v);
  }
}
</script>