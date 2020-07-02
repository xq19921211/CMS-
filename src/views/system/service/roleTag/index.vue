<template>
  <el-dialog
    title="服务标识"
    :visible.sync="dialogVisible"
    width="30%"
    center
    :modal-append-to-body="false"
  >
   <el-table
          :data="tagData"
          border
          :row-class-name="tableRowClassName"
          style="width: 100%"
        >
        <el-table-column label="服务角色标识" align="center" prop="tag"></el-table-column>
   </el-table>     
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ApiDescription, HttpMethod} from '@/utils/apiDescription';
import BaseView from '@/views/baseView';
import canAccessView from '@/utils/accessCheck';

@Component
export default class RoleTag extends BaseView {
  public static readonly necessaryApis: ApiDescription[] = [
    
  ];
  @Prop() public visible!: boolean;
  @Prop() public tagData!: any[];

  
  private tableRowClassName({ row, rowIndex }: any) {
    if (rowIndex % 2 == 1) {
      return "odd";
    }
  }
  
  get dialogVisible() {
    return this.visible;
  }
  set dialogVisible(v) {
    this.$emit('update:visible', v);
  }
}
</script>