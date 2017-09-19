<template>
  <div class="login">
  
    <div class="login-box">
      <div class="login-left">
        <div class="login-logo"></div>
        <div class="login-title">
          <p class="title-chn">海门市食品行业协会</p>
          <p class="title-en">食品安全知识考试系统</p>
        </div> 
      </div>
      <div class="login-right">
        <p>
          <span class="border-right" v-bind:class="{ 'active': model == 1 }" v-on:click="changeModel (1)">考生登录</span>
          <span v-bind:class="{ 'active': model == 0}" v-on:click="changeModel (0)">管理员登录</span>
          </p>
        <div v-if="model == 0">
          <div class="login-user login-up">
            <el-input size="large" v-model="username" placeholder="请输入账号" @keyup.enter.native="login" autofocus></el-input>
          </div>
          <div class="login-pwd login-up">
            <el-input type="password" size="large" v-model="password" placeholder="请输入密码" @keyup.enter.native="login"></el-input>
          </div>
          <el-button type="primary" class="login-button" v-on:click="login">登录</el-button>
        </div>
        <div v-if="model == 1">
          <div class="login-user login-up">
            <el-input size="large" v-model="creditno" placeholder="请输入身份证号" maxlength="18" @keyup.enter.native="login" autofocus></el-input>
          </div>
          <div class="login-pwd login-up">
            <el-input size="large" v-model="telphone" placeholder="请输入手机号" maxlength="11" @keyup.enter.native="login"></el-input>
          </div>
          <el-button type="primary" class="login-button" v-on:click="loginExam">登录</el-button>
        </div>
      </div>
    </div>
    <div class="login-bottom">海门市市场监督管理局监制</div>
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
      model: 1,
      username: '',
      password: '',
      creditno: '',
      telphone: '',
      loginTime: ''
    }
  },
  methods: {
    login () {
      const self = this
      const mParams = {
        username: Base64.encode(this.username),
        password: Base64.encode(md5(this.password))
      }
      this.$ajax.post('haimen/login', Qs.stringify(mParams)).then(function (resp) {
        if (resp.data.respCode === '1000000') {
          self.$cookie.setCookie('token', resp.data.token, 1)
          window.sessionStorage.setItem('userInfo', JSON.stringify(resp.data.resultList))
          if (resp.data.resultList.deptLevel === '1') {
            self.$router.push('/admin/score')
          } else {
            alert('不是管理员账号!!')
          }
        }
      }).then(function (resp) {
      })
    },
    loginExam () {
      if (this.creditno.length !== 15 && this.creditno.length !== 18) {
        alert('身份证号长度不正确')
      } else if (this.telphone.length !== 11) {
        alert('手机号长度不正确')
      } else {
        const mParams = {
          creditno: this.creditno,
          telphone: this.telphone
        }
        window.sessionStorage.setItem('userInfo1', JSON.stringify(mParams))
        this.loginTime = new Date()
        this.$cookie.setCookie('loginTime', Date.parse(self.loginTime), 1)
        this.$router.push('/choose')
      }
    },
    changeModel (model) {
      this.model = model
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

.login-box {
  width: 600px;
  height: 300px;
  margin: 0 auto;
  padding: 0;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
}
.login-left {
  display: inline-block;
  width: 260px;
  height: 300px;
  padding: 20px 30px;
  background: #329adf;
  border-radius: 3px 0 0 3px;

}
.login-logo {
  margin: 0 auto;
  width: 90px;
  height: 90px;
  background: url(../assets/hm-logo.png)no-repeat center;
  border-radius: 50%;
}
.login-title {
  color: #ffffff;
  margin-top: 10px;
  text-align: center;
  border-top: 1px solid #ffffff;
  padding-top: 20px;
}

.title-chn {
  line-height: 30px;
  font-size: 22px;
}

.title-en {
  line-height: 24px;
  font-size: 16px;
}
.login-right {
  display: inline-block;
  padding-top: 40px;
  width: 336px;
  height: 300px;
  vertical-align: top;
}
.login-right {
  display: inline-block;
  padding-top: 40px;
  width: 336px;
  height: 200px;
  vertical-align: top;
}
.login-right p {
  margin-bottom: 20px;
  padding-left: 20px;
  line-height: 20px;
  font-size: 14px;
  text-align: left;
} 
.login-right p span{
  display: inline-block;
  padding: 0 10px;
  color: #4c4c4c;
  cursor: pointer;
}
.border-right{
  border-right: 1px solid #a3a3a3;
} 
.login-right p span.active{
  color: #ff7c08;
} 
.login-up {
  width: 90%;
  height: 40px;
  line-height: 40px;
  margin: 0 auto 20px;
}

.login-button {
  width: 90%;
}
.login-bottom {
 position: absolute;
 bottom: 20px;
 left: 50%;
 font-size: 18px;
 font-weight: bolder;
 margin-left: -96px;
 color: #0065a0
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
