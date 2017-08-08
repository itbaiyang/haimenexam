<template>
<div class="admin">
  <h1>食品安全知识考核管理平台</h1>
  <el-col :span="4" style="height:100%">
    <ul>
      <li v-bind:class="{'active': active == 'exam'}"><router-link to="/admin/exam">考卷管理</router-link></li>
      <li v-bind:class="{'active': active == 'test'}"><router-link to="/admin/test">试题管理</router-link></li>
      <li><router-link to="/admin/exam">考卷管理</router-link></li>
    </ul>
  </el-col>
  <el-col :span="20">
    <router-view></router-view>
  </el-col>
  </div>
</template>
<script>
export default {
  data () {
    return {
      'active': ''
    }
  },
  updated () {
    this.active = window.location.hash.substring(8, 12)
  }
}
</script>
<style scoped>
h1 {
  font-weight: normal;
  background: #0065a0;
  color: #ffffff;
  font-size: 20px;
  height: 60px;
  line-height: 60px;
}

ul {
  list-style-type: none;
  /* padding: 20px 0; */
  height: 100%;
  background: #2A3F54;
  color: #ffffff;
}

li {
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
