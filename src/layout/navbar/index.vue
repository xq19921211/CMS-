<template>
  <div class="navbar">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="route in matched"
          :key="route.path"
          :to="{ path: route.path }"
        >{{route.meta.title}}</el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>

    <div class="right">
      <div class="user" style="display:flex">
        <span>
          <img src="../../assets/navbar/user.png" alt />
        </span>
      </div>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">{{userInfo.nickname}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user" @click.native="passwordFlag = true">修改密码</el-dropdown-item>
          <el-dropdown-item icon="el-icon-user" @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改当前用户密码 -->
    <modify-password :visible.sync="passwordFlag" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { UserInfo } from "@/store/modules/user";
import modifyPassword from "./modifyPassword.vue";
@Component({
  components: {
    modifyPassword
  }
})
export default class Navbar extends Vue {
  @Getter("userInfo") private userInfo!: UserInfo;

  private passwordFlag = false;

  private created() {}

  get matched() {
    return this.$route.matched;
  }

  private logout() {
    localStorage.clear();
    location.reload();
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/variable.scss";
.navbar {
  position: relative;
  height: $navbarHeight;
  box-shadow: 4px 1px 5px 1px $borderColor;
  z-index: 1001;
  .right {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    .el-dropdown {
      cursor: pointer;
    }
  }
  .user {
    // display: flex;
    img {
      width: 30px;
      margin-right: 10px;
      cursor: pointer;
    }
    & > span.circle {
      position: relative;
      &::after {
        content: "";
        display: block;
        width: 5px;
        height: 5px;
        background: red;
        border-radius: 50%;
        position: absolute;
        top: 0px;
        right: 13px;
      }
    }
    
  }
}
</style>
