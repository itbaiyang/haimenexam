<template>
  <div class="bg-inner">
    <top></top>
    <p class="reback">
    <img src="../assets/home.png"><router-link to="/choose">返回</router-link>
    <button v-on:click="getStudyLength" class="fr cstime"></button>
    </p>
    <h1>海门市食安协会食品安全知识考试系统</h1>
    <el-row :gutter="20">
      <el-col :lg="5" :md="5" :sm="12" :xs="12">
        <div class="grid-content bg-video" v-on:click="choose(6)"></div>
      </el-col>
      <el-col :lg="5" :md="5" :sm="12" :xs="12">
        <div class="grid-content bg-link" onclick="window.open('https://baike.baidu.com/item/%E4%B8%AD%E5%8D%8E%E4%BA%BA%E6%B0%91%E5%85%B1%E5%92%8C%E5%9B%BD%E9%A3%9F%E5%93%81%E5%AE%89%E5%85%A8%E6%B3%95/6275500?fr=aladdin&fromid=314491&fromtitle=%E9%A3%9F%E5%93%81%E5%AE%89%E5%85%A8%E6%B3%95')"></div>
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
      <el-col :lg="5" :md="5" :sm="12" :xs="12">
        <div class="grid-content bg-scqy" v-on:click="choose(3)"></div>
      </el-col>
      <el-col :lg="5" :md="5" :sm="12" :xs="12">
        <div class="grid-content bg-link-2" onclick="window.open('http://www.360doc.com/content/14/0122/21/10327450_347201399.shtml')"></div>
      </el-col>
      <el-col :lg="5" :md="5" :sm="12" :xs="12">
        <div class="grid-content bg-link-3" onclick="window.open('http://www.360doc.com/content/13/0629/22/10327450_296440232.shtml')"></div>
      </el-col>
      <el-col :lg="5" :md="5" :sm="12" :xs="12">
        <div class="grid-content bg-r" v-on:click="choose(4)"></div>
      </el-col>
      <el-col :lg="4" :md="4" :sm="12" :xs="12">
        <div class="grid-content bg-l" v-on:click="choose(5)"></div>
      </el-col>
    </el-row>
    <div class="footer">海门市市场监督管理局监制</div>
  </div>
</template>
<script>
import Top from './Top'
export default {
  name: 'home',
  data () {
    return {
      'userInfo': JSON.parse(window.sessionStorage.getItem('userInfo')),
      creditno: JSON.parse(window.sessionStorage.getItem('userInfo1')).creditno
    }
  },
  components: {
    Top
  },
  methods: {
    choose (type) {
      if (type === 6) {
        this.$router.push('/videolist')
      } else {
        this.$router.push('/test/' + type)
      }
    },
    getStudyLength () {
      // const self = this
      const mParams = {
        'creditno': this.creditno
      }
      this.$ajax.get('exam/getStudyLengthByCredit', {params: mParams}).then(function (resp) {
        if (resp.data.respCode === '1000000') {
          let h = parseInt(resp.data.result / 60)
          let m = resp.data.result % 60
          alert('学习时长：' + h + '小时' + m + '分钟')
        }
      }).then(function (resp) {
      })
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
  margin-top: 5%;
  margin-bottom: 20px;
  padding: 0 20%;
}

.el-col {
  border-radius: 4px;
  margin-bottom: 20px;
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
.cstime {
  width: 120px;
  height: 40px;
  margin-right: 20px;
  background: url(../assets/cstime.png);
  background-size: 100% 100%;
  border-radius: 20px;
}
.bg-judge {
  background-image: url(../assets/judge.png); 
}
.bg-link {
  background-image: url(../assets/safe.png); 
}
.bg-single {
  background-image: url(../assets/single.png); 
}
.bg-multiple {
  background-image: url(../assets/multiple.png); 
}
.bg-scqy {
  background-image: url(../assets/scqy.png); 
}
.bg-r {
  background-image: url(../assets/restaurant.png); 
}
.bg-l {
  background-image: url(../assets/circulation.png); 
}
.bg-link-2 {
  background-image: url(../assets/link2.png); 
}
.bg-link-3 {
  background-image: url(../assets/link3.png); 
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
