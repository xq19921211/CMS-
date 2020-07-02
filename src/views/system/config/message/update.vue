<template>
  <el-dialog
    title="修改配置信息"
    @open="initData"
    :visible.sync="dialogVisible"
    append-to-body
    width="30%"
  >
    <el-form label-width="100px">
      <el-form-item label="消息模板">
        <el-input v-model="formData.Template"></el-input>
      </el-form-item>

      <el-form-item label="消息签名">
        <el-input v-model="formData.DefaultSign"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="medium" @click="submit">保 存</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { setMsgTemp } from '@/api/middleSystem';
import { ApiDescription, HttpMethod} from '@/utils/apiDescription';
import BaseView from '@/views/baseView';
import canAccessView from '@/utils/accessCheck';

@Component
export default class UpdateMessage extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription('/message/template', HttpMethod.Post)
  ];
  @Prop() private visible!: boolean;
  @Prop() private detailData!: any;
  private formData: any = {};

  private initData() {
    this.formData = JSON.parse(JSON.stringify(this.detailData));
  }

  private submit() {
    let { Id, Template, DefaultSign } = this.formData;
    setMsgTemp(Id, Template, DefaultSign).then(() => {
      this.$message.success('已保存配置！');
      this.$emit('refresh');
      this.dialogVisible = false;
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

