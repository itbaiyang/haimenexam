<template>
  <div class="home">
    <div class="admin-option">
      <el-dropdown @command="userOption">
        <span class="el-dropdown-link">
          {{ userInfo.userName }}<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a" v-if="userInfo.userId == 'admin'">后台管理</el-dropdown-item>
          <el-dropdown-item command="b">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <h1>食品安全知识考核</h1>
    <el-row :gutter="20">
      <el-col :lg="5" :md="5" :sm="12" :xs="12">
        <div class="grid-content bg-video"></div>
        <router-link :to="{name:'VideoList'}" class="link">视频学习</router-link>
      </el-col>
      <el-col :lg="5" :md="5" :sm="12" :xs="12">
        <div class="grid-content bg-judge"></div>
        <router-link :to="{name:'Test', params:{type: '1'}}" class="link">判断题</router-link>
      </el-col>
      <el-col :lg="5" :md="5" :sm="12" :xs="12">
        <div class="grid-content bg-single"></div>
        <router-link :to="{name:'Test', params:{type: '0'}}" class="link">单选题</router-link>
      </el-col>
      <el-col :lg="5" :md="5" :sm="12" :xs="12">
        <div class="grid-content bg-multiple"></div>
        <router-link :to="{name:'Test', params:{type: '2'}}" class="link">多选题</router-link>
      </el-col>
      <el-col :lg="4" :md="4" :sm="12" :xs="12">
        <div class="grid-content bg-exam"></div>
        <router-link :to="{name:'Exam'}" class="link">综合考试</router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      'userInfo': JSON.parse(window.sessionStorage.getItem('userInfo'))
    }
  },
  methods: {
    userOption (command) {
      if (command === 'a') {
        this.$router.push('/admin/exam')
      } else if (command === 'b') {
        this.$cookie.clearCookie('token')
        window.sessionStorage.clear()
        this.$router.push('/')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
  color: #ffffff;
  font-size: 40px;
}
.home {
  width: 100%;
  height: 100%;
  background-color: #0065a0;
  padding-top: 10%;
  text-align: center;
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
}

.bg-judge {
  background-image: url(../assets/judge.png); 
}
.bg-exam {
  background-image: url(../assets/exam.png); 
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
