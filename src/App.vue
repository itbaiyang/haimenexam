<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
}
body,ol,ul,li,p,div,h1,h2,h3,h4,h5,h6,form,input,textarea,select,span,table,tr,th,td,dl,dt,dd {
    margin:0;padding:0;
    font-family: OneNikeCurrency, 'TradeGothicW01-BoldCn20 675334', Helvetica, Arial, 'Heiti SC', 'ST Heiti', 华文黑体, 'Microsoft YaHei', 雅黑体, SimHei, 黑体, sans-serif;
    box-sizing: border-box;
}
ol,ul,li {
    list-style:none;
}
body {
    font-size:14px;
    font-family:"\5FAE\8F6F\96C5\9ED1";
    color:#323232;
    line-height:25px;
    background:rgb(241,241,241);
}
table {
    border-collapse:collapse;
    border-spacing:0;
}
a {
    color:#42b983;
    /* // text-decoration:none; */
}
a:hover {
    text-decoration:none;
}
img {
    border:none;
}
em,i {
    font-style:normal;
}
.clear {
    zoom: 1;
}
.clear:after {
    content: '';
    display: block;
    clear: both;
}
.clearFloat:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
}
.fl {
    float:left
}
.fr {
    float:right
}
.rel {
    position: relative;
}
.abs {
    position: absolute;
}
#app {
  width:100%;
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.el-checkbox__label {
    font-size: 18px;
    padding-left: 15px;
}
.bg-inner {
  width: 100%;
  height: 100%;
  background: url('./assets/choose-bg.png')no-repeat 100% center;
}
.header {
    width: 100%;
    height: 60px;
    background: #329adf;
    color: #ffffff;
}
.header-left {
  box-sizing: border-box;
  display: inline-block;
  padding-left: 100px;
  width: 50%;
  font-size: 22px;
  line-height: 60px;
}
.header-left img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
.header-left span {
  vertical-align: middle;
  font-weight: 700;
}
.header-right {
  display: inline-block;
  width: 48%;
  text-align: right;
  padding-right: 100px;
  font-size: 16px;
}
.header-right span{
  padding-left: 30px;
}
.footer {
  width: 100%;
  height: 40px;
  color: #ffffff;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  position: fixed;
  bottom: 50px;
}
.abs {
  position: absolute;
  z-index: 3;
}
</style>
