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
    // text-decoration:none;
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
</style>
