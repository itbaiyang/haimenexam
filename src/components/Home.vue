<template>
  <div class="bg-inner">
    <div class="header">
      <div class="header-left">
        <img src="../assets/hm-logo.png" alt="">
        <span><router-link to="/admin/score">海门市食品协会</router-link></span>
      </div>
      <div class="header-right">
        <span>身份证号：{{ creditno }}</span>
      </div>
    </div>
    <p class="reback"><img src="../assets/home.png"><router-link to="/choose">返回</router-link></p>
    <h1>海门市食安协会食品安全知识考试系统（教育系统版）</h1>
    <el-row :gutter="20">
      <el-col :lg="5" :md="5" :sm="12" :xs="12">
        <div class="grid-content bg-video" v-on:click="choose(3)"></div>
      </el-col>
      <el-col :lg="5" :md="5" :sm="12" :xs="12">
        <div class="grid-content bg-safe" v-on:click="choose(4)"></div>
      </el-col>
      <el-col :lg="5" :md="5" :sm="12" :xs="12">
        <div class="grid-content bg-judge" v-on:click="choose(1)"></div>
      </el-col>
      <el-col :lg="5" :md="5" :sm="12" :xs="12">
        <div class="grid-content bg-single" v-on:click="choose(0)"></div>
      </el-col>
      <el-col :lg="4" :md="4" :sm="12" :xs="12">
        <div class="grid-content bg-multiple" v-on:click="choose(2)"></div>
      </el-col>
    </el-row>
    <div class="footer">海门市市场监督管理局监制</div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      'userInfo': JSON.parse(window.sessionStorage.getItem('userInfo')),
      creditno: JSON.parse(window.sessionStorage.getItem('userInfo1')).creditno
    }
  },
  methods: {
    choose (type) {
      if (type === 4) {
        window.open('https://baike.baidu.com/item/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E9%A3%9F%E5%93%81%E5%AE%89%E5%85%A8%E6%B3%95/6275500?fr=aladdin&fromid=314491&fromtitle=%E9%A3%9F%E5%93%81%E5%AE%89%E5%85%A8%E6%B3%95')
      } else if (type === 3) {
        this.$router.push('/videolist')
      } else {
        this.$router.push('/test/' + type)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin-top: 9%;
  text-align: center;
  color: #ffffff;
  font-size: 36px;
}
a {
    color:#ffffff;
    text-decoration:none;
}
.reback {
  line-height: 40px;
  font-size: 20px;
  padding-left: 100px;
  padding-top: 15px
}
.reback img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
  margin-right: 15px
}
.reback a {
  font-size: 26px;
  line-height: 40px;
  vertical-align: middle;
}
.admin-option {
  position: absolute;
  top: 10px;
  right: 20px;
  color: #ffffff;
  margin-right: 20px;
}
.el-dropdown-link {
  display: inline-block;
  color: #ffffff;
  cursor: pointer;
  height: 30px;
}
.el-row {
  margin-top: 10%;
  margin-bottom: 20px;
  padding: 0 20%;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.grid-content {
  border-radius: 50%;
  min-height: 36px;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-size: 102%;
  background-position: center; 
  cursor: pointer;
}

.bg-judge {
  background-image: url(../assets/judge.png); 
}
.bg-safe {
  background-image: url(../assets/safe.png); 
}
.bg-single {
  background-image: url(../assets/single.png); 
}
.bg-multiple {
  background-image: url(../assets/multiple.png); 
}
.bg-video {
  background-image: url(../assets/video.png); 
}
.bg-purple-light {
  background: #e5e9f2;
}


.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.link {
  width: 100%;
  text-align: center;
  color: #ffffff;
  line-height: 60px;
  font-size: 16px;
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
@media screen and (max-width:700px) {
  .home{
    width: 100%;
    height: 100%;
    background-color: #0065a0;
    padding-top: 20%;
    text-align: center;
  }
  h1{
    font-weight: normal;
    color: #ffffff;
    font-size:18px;
  }
  .el-row {
    margin-top: 10%;
    margin-bottom: 20px;
    padding: 0 8%;
  }
  .bg-purple {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    background: #6bd7ff;
  }
}
</style>
