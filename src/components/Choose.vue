<template>
  <div class="bg-inner">
    <div class="header">
      <div class="header-left">
        <img src="../assets/hm-logo.png" alt="">
        <span>海门市食品协会</span>
      </div>
      <div class="header-right">
        <span>身份证号：{{ creditno }}</span>
        <el-dropdown @command="logout">
          <span class="el-dropdown-link">
            退出登录<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <h1>海门市食安协会食品安全知识考试系统（教育系统版）</h1>
    <el-row :gutter="20">
      <el-col :lg="5" :md="5" :offset="7" >
        <div class="grid-content bg-exam" v-on:click="choose(0)"></div>
      </el-col>
      <el-col :lg="5" :md="5">
        <div class="grid-content bg-study" v-on:click="choose(1)"></div>
      </el-col>
    </el-row>
    <div class="footer">海门市市场监督管理局监制</div>
  </div>
</template>

<script>
export default {
  name: 'choose',
  data () {
    return {
      'userInfo': JSON.parse(window.sessionStorage.getItem('userInfo')),
      creditno: JSON.parse(window.sessionStorage.getItem('userInfo1')).creditno
    }
  },
  methods: {
    choose (type) {
      if (type === 1) {
        this.$router.push('/home')
      } else if (type === 0) {
        this.$router.push('/exam')
      }
    },
    logout () {
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin-top: 10%;
  text-align: center;
  color: #ffffff;
  font-size: 36px;
}
/* .bg-inner {
  width: 100%;
  height: 100%;
  background: url('../assets/choose-bg.png')no-repeat 100% center;
} */
/* .header {
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
} */
.grid-content {
  border-radius: 50%;
  min-height: 36px;
  width: 120px;
  height: 120px;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-size: 102%;
  background-position: center; 
  cursor: pointer;
}

.bg-study {
  background-image: url(../assets/study-link.png); 
}
.bg-exam {
  background-image: url(../assets/exam-link.png); 
}
/* .footer {
  width: 100%;
  height: 40px;
  color: #ffffff;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  position: fixed;
  bottom: 50px;
} */
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


/* .bg-single {
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
  font-size: 16px; */
/* } */
/* @media screen and (max-width:700px) {
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
  } */
/* } */
</style>
