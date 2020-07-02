<template>
<el-card class="box-card">
  <el-menu
    slot="header"
    :default-active="active"
    class="setting"
    mode="horizontal"
    @select="handleSelect"
    background-color="#fff"
    text-color="#000"
    active-text-color="#00b19d">
    <el-menu-item index="1">栏目组管理</el-menu-item>
    <el-menu-item index="2">内容组管理</el-menu-item> 
    <el-menu-item index="3">内容标签管理</el-menu-item>
  </el-menu>
  <transition name="fade-to-left" mode="out-in">
      <keep-alive>
        <component :is="component"/>
      </keep-alive>
    </transition>
</el-card>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import BaseView from "@/views/baseView";
import canAccessView from "@/utils/accessCheck";
import  group  from "./group.vue";
import  conten  from "./content.vue";
import  contag from "./conTag.vue";
@Component({
  components: { group ,conten, contag}
})
 export default class setting extends Vue {
    private active = "1"
    private component: string = "group";
    private handleSelect(key:any) {
     if(key==1){
       this.component = "group"
     }else
     if(key==2){
       this.component = "conten"
     }else
     if(key==3){
       this.component = "contag"
     }
    }
  }
</script>

<style lang="scss" scoped>
 .setting{
     display:flex;
     justify-content: space-around;
 }
 .setting>.el-menu-item{
   width: -webkit-fill-available;
   text-align: center;
 }
</style>