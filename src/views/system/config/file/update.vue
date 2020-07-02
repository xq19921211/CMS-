<template>
  <el-dialog
    title="修改配置信息"
    @open="initData"
    :visible.sync="dialogVisible"
    append-to-body
    width="30%"
  >
    <el-form label-width="100px">
      <el-form-item label="文件大小">
        <el-input v-model="formData.fileSize"></el-input>
      </el-form-item>

      <el-form-item label="上传格式">
        <el-select v-model="formData.mimetype" multiple filterable allow-create placeholder="请选择">
          <el-option v-for="item in formData.mimetype" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="medium" @click="submit">修 改</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ApiDescription, HttpMethod} from '@/utils/apiDescription';
import BaseView from '@/views/baseView';
import canAccessView from '@/utils/accessCheck';
import { updateFileConfig } from '@/api/middleSystem';

@Component
export default class UpdateFileConfig extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription('/fileConfig/{configId}', HttpMethod.Put)
  ];
  @Prop() private visible!: boolean;
  @Prop() private detailData!: object;
  private formData: any = {};

  private initData() {
    this.formData = JSON.parse(JSON.stringify(this.detailData));
  }

  private submit() {
    let { _id, fileSize, mimetype } = this.formData;
    updateFileConfig(_id, fileSize, mimetype).then(() => {
      this.$message.success('修改成功！');
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

