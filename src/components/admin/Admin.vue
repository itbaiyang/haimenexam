<template>
<div class="admin">
  <div class="admin-header">
    <span>食品安全知识考核管理平台</span>
    <div class="admin-option fr">
      <el-dropdown @command="userOption">
        <span class="el-dropdown-link">
          {{ userInfo.userName }}<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item command="a">普通用户</el-dropdown-item> -->
          <el-dropdown-item command="b">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
  <el-col :span="4" style="height:100%">
    <ul class="menu-ul">
      <!-- <li v-bind:class="{'active': active == 'exam'}"><router-link to="/admin/exam">考卷管理</router-link></li> -->
      <!-- <li v-bind:class="{'active': active == 'test'}"><router-link to="/admin/test">试题管理</router-link></li> -->
      <li v-bind:class="{'active': active == 'scor'}"><router-link to="/admin/score">成绩查询</router-link></li>
    </ul>
  </el-col>
  <el-col :span="20" style="height:100%">
    <router-view></router-view>
  </el-col>
  </div>
</template>
<script>
export default {
  data () {
    return {
      'active': window.location.hash.substring(8, 12),
      'userInfo': JSON.parse(window.sessionStorage.getItem('userInfo'))
    }
  },
  updated () {
    this.active = window.location.hash.substring(8, 12)
  },
  methods: {
    userOption (command) {
      if (command === 'a') {
        this.$router.push('/home')
      } else if (command === 'b') {
        this.$cookie.clearCookie('token')
        window.sessionStorage.clear()
        this.$router.push('/')
      }
    }
  }
}
</script>
<style scoped>
.admin-header {
  font-weight: normal;
  background: #0065a0;
  color: #ffffff;
  font-size: 20px;
  height: 60px;
  line-height: 60px;
}
.admin-option {
  color: #ffffff;
  margin-right: 20px;
}
.el-dropdown-link {
  display: inline-block;
  color: #ffffff;
  cursor: pointer;
  height: 58px;
}
ul.menu-ul {
  list-style-type: none;
  /* padding: 20px 0; */
  height: 100%;
  background: #2A3F54;
  color: #ffffff;
}

.menu-ul li {
  line-height: 50px;
  font-size: 16px;
  padding-left: 15px;
  color: #ffffff;
}
a {
  display: inline-block;
  width: 100%;
  height: 100%;
  color: #ffffff;
  text-decoration: none
}
li:hover {
  background: #66CCFF;
}
.active {
  background: #6699cc;
}
.active>a {
  color: #ffffff
}

.admin {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
