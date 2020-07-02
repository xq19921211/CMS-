<template>
  <div>
    <el-card v-if="detailData" style="min-height:100%;">
      <div slot="header" class="clearfix">
        <span @click="initData">
          <i class="el-icon-refresh" :class="{rotate:rotateFlag}"></i> tts配置
        </span>
        <el-button plain class="card-btn-1" size="medium" type="primary" @click="visible = true" v-if="canUpdate">修 改</el-button>
      </div>
      <el-col :span="8" class="mb-5">文件大小：{{detailData.fileSize}}</el-col>
      <el-col :span="8" class="mb-5">文件格式：{{detailData.mimetype}}</el-col>
    </el-card>
    <update :visible.sync="visible" :detailData="detailData" @refresh="initData" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import BaseView from '@/views/baseView';
import canAccessView from '@/utils/accessCheck';
import { ApiDescription } from '@/utils/apiDescription';

import { getFileConfig } from '@/api/middleSystem';
import update from './update.vue';

@Component({
  components: { update }
})
export default class FileConfig extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription('/fileConfig')
  ];
  private detailData: any = {};
  private visible: boolean = false;
  private canUpdate: boolean = false;
  private rotateFlag: boolean = false;

  private created() {
    this.initData();
    this.canUpdate = canAccessView(update);
  }

  private initData() {
    this.rotateFlag = true;
    getFileConfig().then((res) => {
      this.detailData = res;
      this.rotateFlag = false;
    });
  }
}
</script>

