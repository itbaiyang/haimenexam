<template>
  <div class="bg-inner">
    <div class="header">
      <div class="header-left">
        <img src="../assets/hm-logo.png" alt="">
        <span>海门市食品协会</span>
      </div>
      <div class="header-right">
        <span>考试时间：{{examTime}}</span>  
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
    <el-row :gutter="20" class="test-style">
      <el-col :lg="6" :md="6" :offset="3" >
        <div class="grid-content bg-exam" v-on:click="choose(0,0)"></div>
        <p>食安考试</p>
        <h5>(普通版)</h5>
      </el-col>
      <el-col :lg="6" :md="6">
        <div class="grid-content bg-exam" v-on:click="choose(0,1)"></div>
        <p>食安考试</p>
        <h5>(教育考试版)</h5>
      </el-col>
      <el-col :lg="6" :md="6">
        <div class="grid-content bg-study" v-on:click="choose(1)"></div>
        <p>食安学习</p>
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
      'token': this.$cookie.getCookie('token'),
      'loginTime': this.$cookie.getCookie('loginTime'),
      'examTime': '',
      'userInfo': JSON.parse(window.sessionStorage.getItem('userInfo')),
      'creditno': JSON.parse(window.sessionStorage.getItem('userInfo1')).creditno
    }
  },
  mounted () {
    const self = this
    if (this.token) {
      console.log(self.loginTime)
      var now = Date.parse(new Date())
      var time1 = now - parseInt(self.loginTime)
      console.log(parseInt(time1 / 60000))
      var time = new Date(now - parseInt(self.loginTime))
      console.log(time.toLocaleString())
      this.examTime = this.formatDate(time, 'yyyy-MM-dd hh:mm:ss')
      console.log(this.examTime)
    }
  },
  methods: {
    choose (type, level) {
      if (type === 1) {
        this.$router.push('/home')
      } else if (type === 0) {
        this.$router.push('/exam/' + level)
      }
    },
    logout () {
      this.$router.push('/')
    },
    formatDate (date, fmt) {
      console.log(date.toString(), fmt)
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
        }
      }
      return fmt
    },
    padLeftZero (str) {
      return ('00' + str).substr(str.length)
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
.test-style p, .test-style h5 {
  color: #ffffff;
  text-align: center;
  font-size: 14px;
} 
.test-style p {
  font-size: 18px;
  padding-top: 5px;
} 
.bg-study {
  background-image: url(../assets/study-link.png); 
}
.bg-exam {
  background-image: url(../assets/exam-link.png); 
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
</style>
