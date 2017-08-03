<template>
  <div class="login">
    <div class="login-header">
      <img src="../assets/guohui.png" alt="">
      <div class="login-title">
        <p class="title-chn">海门市食品协会食安知识学习与考试系统</p>
        <p class="title-en">Food Safety Supervision And Management Of Haimen Farmers Market</p>
      </div>
    </div>
    <div class="login-box">
      <div class="login-user login-up">
        <el-input size="large" v-model="username" placeholder="请输入账号"></el-input>
      </div>
      <div class="login-pwd login-up">
        <el-input type="password" size="large" v-model="password" placeholder="请输入密码"></el-input>
      </div>
      <el-button type="primary" class="login-button" v-on:click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import Qs from 'qs'
import md5 from 'js-md5'
let Base64 = require('js-base64').Base64
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      const self = this
      const mParams = {
        username: Base64.encode(this.username),
        password: Base64.encode(md5(this.password))
      }
      this.$ajax.post('nanjing/login', Qs.stringify(mParams)).then(function (resp) {
        if (resp.data.respCode === '1000000') {
          self.$cookie.setCookie('token', resp.data.token, 1)
          self.$router.push('/home')
        }
      }).then(function (resp) {
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.login {
  width: 100%;
  height: 100%;
  background: url('../assets/login-bg.png')no-repeat;
  background-size: 100%;
  padding-top: calc(15% - 100px);
  text-align: center;
}

.login-header {
  width: 100%;
  height: 100px;
}

.login-title {
  display: inline-block;
  vertical-align: top;
  margin: 16px 0 0 40px;
  color: #ffffff;
  padding-left: 40px;
  border-left: 2px solid #ffffff;
}

.title-chn {
  line-height: 42px;
  font-size: 40px;
  text-align: left;
}

.title-en {
  line-height: 26px;
  font-size: 20px;
  text-align: left;
}

.login-box {
  width: 400px;
  height: 300px;
  margin: 5% auto;
  padding: 40px 15px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}

.login-up {
  width: 90%;
  height: 40px;
  line-height: 40px;
  margin: 0 auto 20px;
}

.login-user {}

.login-pwd {}

.login-button {
  width: 90%;
}

.el-icon-user {
  width: 24px;
  height: 24px;
  display: inline-block;
  background-repeat: no-repeat;
  background-image: url('../assets/user.png');
}

.el-icon-pwd {
  width: 24px;
  height: 24px;
  display: inline-block;
  background-repeat: no-repeat;
  background-image: url('../assets/password.png');
}
@media screen and (max-width:700px){
  .login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('../assets/login-bg.png')no-repeat;
   background-size: 300%; 
  background-position: center;
  padding-top: calc(15% - 100px);
  text-align: center;
}
  .login-header {
  width: 100%;
  height: 100px;
}
 .login-header img {
   display: none;
   width: 80px;
   height: 80px;
 }
.login-title {
  display: inline-block;
  vertical-align: top;
  margin: 0; 
  color: #ffffff;
  padding:30px 15px 10px;
  border-left: none;
}

.title-chn {
  line-height: 20px;
  font-size: 18px;
  text-align: center;
}

.title-en {
  line-height: 20px;
  font-size: 10px;
  text-align: center;
}
.login-box {
  position: absolute; 
  top: 80px;
  width: 100%;
  height: 250px;
  margin: 0;
  padding: 20px 15px;
  background: rgba(255,255,255,0);
  border-radius: 0;
  box-shadow: none;
}
}
</style>
