<template>
  <div class="bg-inner">
    <top></top>
      <button v-on:click="getStudyLength" class="fr cstime" style="margin-top: 20px"></button>
    <h1>海门市食安协会食品安全知识考试系统（教育系统版）</h1>
    <el-row :gutter="20" class="test-style">
      <el-col :lg="4" :md="4" :offset="2" >
        <div class="grid-content bg-exam-c" v-on:click="choose(0,0)"></div>
        <p>食安考试</p>
        <h5>(普通版)</h5>
      </el-col>
      <el-col :lg="4" :md="4">
        <div class="grid-content bg-exam-e" v-on:click="choose(0,1)"></div>
        <p>食安考试</p>
        <h5>(教育考试版)</h5>
      </el-col>
      <el-col :lg="4" :md="4">
        <div class="grid-content bg-exam-m" v-on:click="choose(0,2)"></div>
        <p>食安考试</p>
        <h5>(管理员考试版)</h5>
      </el-col>
      <el-col :lg="4" :md="4">
        <div class="grid-content bg-exam-p" v-on:click="choose(0,3)"></div>
        <p>食安考试</p>
        <h5>(生产企业考试)</h5>
      </el-col>
      <el-col :lg="4" :md="4">
        <div class="grid-content bg-study" v-on:click="choose(1)"></div>
        <p>食安学习</p>
      </el-col>
    </el-row>
    <div class="footer">海门市市场监督管理局监制</div>
  </div>
</template>

<script>
import Top from './Top'
export default {
  name: 'choose',
  data () {
    return {
      'token': this.$cookie.getCookie('token'),
      'userInfo': JSON.parse(window.sessionStorage.getItem('userInfo')),
      'creditno': JSON.parse(window.sessionStorage.getItem('userInfo1')).creditno
    }
  },
  components: {
    Top
  },
  mounted () {
  },
  methods: {
    choose (type, level) {
      let self = this
      if (type === 1) {
        this.$router.push('/home')
      } else if (type === 0) {
        const mParams = {
          creditno: JSON.parse(window.sessionStorage.getItem('userInfo1')).creditno,
          telphone: JSON.parse(window.sessionStorage.getItem('userInfo1')).telphone
        }
        this.$ajax.get('exam/getCheckByInfo', {params: mParams}).then(function (resp) {
          if (resp.data.respCode === '1000000') {
            self.$router.push('/exam/' + level)
          } else {
            alert(resp.data.respMsg)
          }
        }).then(function (resp) {
        })
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
.cstime {
  width: 120px;
  height: 40px;
  margin-right: 20px;
  background: url(../assets/cstime.png);
  background-size: 100% 100%;
  border-radius: 20px;
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
.bg-exam-c {
  background-image: url(../assets/exam-c-link.png); 
}
.bg-exam-m {
  background-image: url(../assets/exam-m-link.png); 
}
.bg-exam-p {
  background-image: url(../assets/exam-p-link.png); 
}
.bg-exam-e {
  background-image: url(../assets/exam-e-link.png); 
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
