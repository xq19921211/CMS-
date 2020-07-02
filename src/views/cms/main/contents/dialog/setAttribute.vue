<template>
  <el-dialog
    title="设置属性"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    @close="clearData"
    @open="initData"
    width="30%"
  >
    <el-divider></el-divider>

    <el-checkbox-group style=" display:flex;justify-content:center;" v-model="checked">
      <el-checkbox
        v-for="(item, index) in checkList"
        :label="item.field"
        :key="index"
      >{{item.label}}</el-checkbox>
    </el-checkbox-group>

    <el-divider></el-divider>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="sumbit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ApiDescription, HttpMethod } from "@/utils/apiDescription";
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
import { modifyAttribute, getAttribute } from "@/api/backgroundSystem/Content";

@Component({
  components: {}
})
export default class SetAttribute extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    new ApiDescription(modifyAttribute.baseUrl, modifyAttribute.method)
  ];

  @Prop() public visible: any;
  @Prop() public contentId: any;

  private checkList: Array<{ label: string; field: string }> = [
    {
      label: "置顶",
      field: "isTop"
    },
    {
      label: "推荐",
      field: "isRecommend"
    },
    {
      label: "热点",
      field: "isHot"
    },
    {
      label: "醒目",
      field: "isColor"
    }
  ];

  private checked: any = [];

  private sumbit() {
    let attribute: any = {};
    this.checkList.forEach(item => {
      attribute[item.field] = this.checked.includes(item.field) ? true : false;
    });
    modifyAttribute.request(this.contentId, attribute).then(res => {
      this.$message.success("设置成功");
      this.$emit("refresh");
      this.dialogVisible = false;
    });
  }
  
  private initData() {
    getAttribute.request(this.contentId).then((res: any) => {
      let attribute: { [key: string]: boolean } = res[0];
      Object.keys(attribute).forEach(key => {
        if (attribute[key]) {
          this.checked.push(key);
        }
      });
    });
  }

  private clearData() {
    this.checked = [];
  }

  get dialogVisible() {
    return this.visible;
  }
  set dialogVisible(v) {
    this.$emit("update:visible", v);
  }
}
</script>
