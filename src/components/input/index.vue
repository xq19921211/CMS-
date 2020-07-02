<template>
  <el-autocomplete
    class="inline-input"
    v-model="state"
    :fetch-suggestions="querySearch"
    :value-key="label"
    placeholder="请输入内容"
    @select="handleSelect"
    :disabled="disabled"
  ></el-autocomplete>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class AlInput extends Vue {
  @Prop({ required: true })
  private data!: any[];
  @Prop({ required: true })
  private label?: string;
  @Prop({ required: true })
  private val?: string | number;
  @Prop({ default: false })
  private disabled?: boolean;
  private state: string = "";
  private querySearch(queryString: any, cb: any) {
    let restaurants: any = this.data;
    let results = queryString
      ? restaurants.filter(this.createFilter(queryString))
      : restaurants;
    cb(results);
  }
  private createFilter(queryString: any) {
    return (restaurant: any) => {
      return (
        restaurant[this.label as string]
          .toLowerCase()
          .indexOf(queryString.toLowerCase()) >= 0
      );
    };
  }
  private handleSelect(item: any) {
    this.$emit("input", item[this.val as string]);
    this.$emit("change");
  }
}
</script>
<style lang="scss" scoped>
</style>
