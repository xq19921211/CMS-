<template>
  <div class="container">
  <el-row class="login">
    <el-col :span="12" class="logo">
      <div style="margin-top:25%">
        <p><img src="../../../public/img/icons/wecome.png" alt=""> </p>
        <p style="margin-top:5%"><img src="../../../public/img/icons/welcome.png" alt=""> </p> 
      </div> 
    </el-col>
    <el-col class="login-form" :span="12">
      <p style="margin:8% 0"><img src="../../../public/img/icons/logo.png" alt=""> </p>
      <el-form ref="loginForm" :model="form" :rules="loginFormRule">
        <el-form-item label="" prop="account">
          <el-input v-model="form.account" :clearable="true" placeholder="请输入您的账号" ref="account" @keyup.enter.native="submit">
            <svg-icon slot="prefix" icon-class="user"></svg-icon>
          </el-input>
        </el-form-item>

        <el-form-item label="" prop="password">
          <el-input v-model="form.password" :clearable="true" show-password placeholder="请输入您的密码" @keyup.enter.native="submit">
            <svg-icon slot="prefix" icon-class="password"></svg-icon>
          </el-input>
        </el-form-item>

        <el-form-item label="" prop="captcha">
          <el-input v-model="form.captcha" placeholder="请输入验证码" @keyup.enter.native="submit">
            <svg-icon slot="prefix" icon-class="yzm"></svg-icon>
            <span @click="setCaptcha" slot="suffix" v-if="captcha" style="background:#fff;display:inline-block;height:40px;opacity:0.9">
              <img :src="captcha" alt="" style="height:35px">
            </span>
          </el-input>
        </el-form-item>
        <el-button type="primary" round class="login-btn" @click="submit">登 录</el-button>
      </el-form>
    </el-col>
  </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import store from '@/store';
import types from '@/store/mutations-type';
import { Getter, Action } from 'vuex-class';
import { loginFormRule } from '@/rules';
import { login, getCaptcha } from '@/api/middleSystem';


@Component
export default class Login extends Vue {
  @Getter('token') private token!: string;
  @Action('setToken') private setToken!: any;

  private loginFormRule = loginFormRule;
  private captcha: any = null;
  private form = {
    account: '',
    password: '',
    captcha: ''
  };

  private setCaptcha() {
    getCaptcha().then((res: any) => (this.captcha = res));
  }

  private submit() {
    (this.$refs.loginForm as any).validate((valid: boolean) => {
      if (valid) {
        let { account, password, captcha } = this.form;
        login(account, password, captcha).then((res) => {
          const redirect = this.$route.query && this.$route.query.redirect;
          this.$router.push(redirect as string || '/');
        }).catch((err) => {
          this.setCaptcha();
        });
      } else {
        return false;
      }
    });
  }

  private created() {
    store.commit(types.SET_USER_INFO, {});
  }

  private async mounted() {
    if (!this.token) {
      await this.setToken();
    }
    this.setCaptcha();
    (this.$refs.account as any).focus();
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  margin-left: auto; 
  background:url(../../../public/img/icons/backgroud.png);
  background-size: 100% 100%;
  .login{
    width:945px;
    height:501px;
    position:absolute;
    background:url(../../../public/img/icons/login1.png);
    top:15%;
    left:25%;
    .logo{
     width: 465px;
     height:501px;
     padding:20px;
    }
    .login-form{
      width: 480px;
      height:501px;
      padding: 20px;
      text-align: center;
    }
  }
  .login-btn{
    font-weight: bold;
    margin-top:15px;
    padding: 15px;
  }
  .login-btn,.el-input{
    width: calc(100% - 80px);
    font-size:18px;
  }  
}

</style>
<style lang="scss">
.login-form {
  .el-input__suffix {
    right: 0;
    top: 1px;
  }
}
.el-form-item{
  margin-bottom:25px
}
.el-form-item__error{
  left: 40px !important;
}
.login-form .el-input__inner{
  background: #007fc5 !important;
  color: beige;
}
</style>
