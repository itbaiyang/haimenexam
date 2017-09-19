<template>
  <div class="exam">
    <div class="header abs">
      <div class="header-left">
        <img src="../assets/hm-logo.png" alt="">
        <span>海门市食品协会</span>
      </div>
      <div class="header-right">
        <span>开考时间：{{startTime}}</span>
        <!-- <span>考试时间：{{examTime}}</span>  -->
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
    <div class="exam-container" v-if="model1 == 0">
      <div class="exam-breadcrumb">
        <router-link :to="{name:'Choose'}" class="link">知识考核</router-link>
        <span>></span>
        <span>综合考试</span>
      </div>
      <div class="exam-content">
        <div class="exam-title">
          <span>{{ count + 1 }}/{{ length1 }}</span>
          <span v-if="examItem.quesType == 0" style="color:#0072d5;font-weight:bold">【单选题】</span>
          <span v-if="examItem.quesType == 1" style="color:#0072d5;font-weight:bold">【是非题】</span>
          <span v-if="examItem.quesType == 2" style="color:#0072d5;font-weight:bold">【多选题】</span>
          <span>{{ examItem.content }}</span>
        </div>
        <div class="exam-answer" v-if="examItem.quesType != 2">
          <el-radio class="radio" v-model="radio" label="A">{{ examItem.optionA }}</el-radio></br>
          <el-radio class="radio" v-model="radio" label="B">{{ examItem.optionB }}</el-radio></br>
          <el-radio v-if="examItem.quesType == 0" class="radio" v-model="radio" label="C">{{ examItem.optionC }}</el-radio></br>
          <el-radio v-if="examItem.quesType == 0" class="radio" v-model="radio" label="D">{{ examItem.optionD }}</el-radio></br>
        </div>
        <div class="exam-answer" v-if="examItem.quesType == 2">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="A">{{ examItem.optionA }}</el-checkbox><br/>
            <el-checkbox label="B">{{ examItem.optionB }}</el-checkbox><br/>
            <el-checkbox label="C">{{ examItem.optionC }}</el-checkbox><br/>
            <el-checkbox label="D">{{ examItem.optionD }}</el-checkbox><br/>
            <el-checkbox label="E" v-show="examItem.optionE">{{ examItem.optionE }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="exam-btn">
        <el-button type="primary" style="margin-right: 20px;" v-on:click="getExamItem(-1)">上一页</el-button>
        <el-button type="primary" v-if="count != length1 -1" v-on:click="getExamItem(1)">下一页</el-button>
        <!-- <el-button type="primary" v-if="count != length1 -1" v-on:click="getExamItem(34)">下一页</el-button> -->
        <el-button type="primary" v-if="count == length1 -1" :disabled="this.radio == null" @click="getScore">交卷</el-button>
      </div>
    </div>
    <div class="exam-container result" v-if="model1 == 1">
      <p><span style="font-size: 40px; color: #f00">{{ examScore }}分</span>，未通过考试</p>
      <img src="../assets/fa.png" alt="">
      <div>您本次的考试成绩为<span style="color: #f00">{{examScore}}分</span>，未通过考试，请再接再厉，再考一次吧</div>
      <!-- <button style="margin-top: 50px;" v-on:click="reset">重新考试</button> -->
      <el-button style="margin-top: 50px;" type="primary" @click="reset">重新考试</el-button>
    </div>
    <div class="exam-container result" v-if="model1 == 2">
      <p><span style="font-size: 40px; color: #f00">{{ examScore }}分</span>，恭喜考试通过</p>
      <img src="../assets/su.png" alt="">
      <div>请关闭浏览器</div>
    </div>
    <el-dialog
    title="恭喜考试结束"
    :visible.sync="dialogVisible"
    size="tiny">
    <p>考试得分：{{ examScore }}分</p>

  </el-dialog>
    <el-dialog
    title="提示"
    :visible.sync="examStart"
    size="tiny">
    <p>开始考试</p>
  </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'exam',
  data () {
    return {
      token: this.$cookie.getCookie('token'),
      examType: this.$route.params.type,
      page: {},
      examItem: {},
      startTime: '',
      // nowTime: '',
      // examTime: '',
      count: 0,
      radio: '',
      right: 0,
      first: true,
      checkList: [],
      result: [],
      score: [],
      examScore: 0,
      dialogVisible: false,
      examStart: false,
      length1: 0,
      model1: 0,
      creditno: JSON.parse(window.sessionStorage.getItem('userInfo1')).creditno
    }
  },
  mounted () {
    if (+this.examType === 0) {
      this.getExamCommonList(1, 100)
    } else if (+this.examType === 1) {
      this.getExamList(1, 100)
    } else {
      this.getExamManagerList(1, 100)
    }
    var now = new Date()
    this.startTime = this.formatDate(now, 'yyyy-MM-dd hh:mm')
    // var time = new Date(now - parseInt(self.startTime))
    // this.examTime = this.formatDate(time, 'yyyy-MM-dd hh:mm:ss')
  },
  methods: {
    getExamList (pageNo, pageSize, quesType, examPoint) {
      const self = this
      const mParams = {
        'pageNo': pageNo,
        'pageSize': pageSize,
        'quesType': quesType,
        'examPoint': examPoint
      }
      this.$ajax.get('exam/quesListByNoRand', {params: mParams}).then(function (resp) {
        if (resp.data.respCode === '1000000') {
          self.page = resp.data.queLst
          self.length1 = self.page.length
          self.getExamItem(0)
        }
      }).then(function (resp) {
      })
    },
    getExamCommonList (pageNo, pageSize, quesType, examPoint) {
      const self = this
      const mParams = {
        'pageNo': pageNo,
        'pageSize': pageSize,
        'quesType': quesType,
        'examPoint': examPoint
      }
      this.$ajax.get('exam/quesListByRandForCommon', {params: mParams}).then(function (resp) {
        if (resp.data.respCode === '1000000') {
          self.page = resp.data.queLst
          self.length1 = self.page.length
          self.getExamItem(0)
        }
      }).then(function (resp) {
      })
    },
    getExamManagerList (pageNo, pageSize, quesType, examPoint) {
      const self = this
      const mParams = {
        'pageNo': pageNo,
        'pageSize': pageSize,
        'quesType': quesType,
        'examPoint': examPoint
      }
      this.$ajax.get('exam/quesListByNoRandForAdmin', {params: mParams}).then(function (resp) {
        if (resp.data.respCode === '1000000') {
          self.page = resp.data.queLst
          self.length1 = self.page.length
          self.getExamItem(0)
        }
      }).then(function (resp) {
      })
    },
    getExamItem (num) {
      let self = this
      if (this.first === true) {
        this.first = false
        this.count = this.count + num
        this.examItem = this.page[this.count]
        this.examStart = true
        window.setTimeout(function () {
          self.examStart = false
        }, 1400)
        return false
      }
      if (this.examItem.quesType === '2') {
        this.checkList.sort()
        this.radio = this.checkList.toString()
      }
      this.result[this.count] = this.radio
      if (this.radio.replace(/[,]/g, '') === this.examItem.rightAnswer) {
        this.score[this.count] = 1
      } else {
        this.score[this.count] = 0
      }
      this.count = this.count + num
      this.examItem = this.page[this.count]
      if (this.result[this.count]) {
        if (this.examItem.quesType === '2') this.checkList = this.result[this.count].split(',')
        else this.radio = this.result[this.count]
      } else {
        this.radio = ''
        this.checkList = []
      }
    },
    getScore () {
      let self = this
      this.examScore = 0
      if (this.examItem.quesType === '2') {
        this.checkList.sort()
        this.radio = this.checkList.toString()
      }
      this.result[this.count] = this.radio
      if (this.radio.replace(/[,]/g, '') === this.examItem.rightAnswer) {
        this.score[this.count] = 1
      } else {
        this.score[this.count] = 0
      }
      for (var i = 0; i < this.score.length; i++) {
        this.examScore += this.score[i] * this.page[i].examPoint
      }
      if (this.examScore < 80) {
        self.model1 = 1
      } else {
        let userInfo1 = JSON.parse(window.sessionStorage.getItem('userInfo1'))
        const mParams = {
          'creditno': userInfo1.creditno,
          'telphone': userInfo1.telphone,
          'score': this.examScore,
          'examType': this.examType
        }
        this.$ajax.get('exam/handPaperByCredit', {params: mParams}).then(function (resp) {
          self.model1 = 2
          if (resp.data.respCode === '1000000') {
            self.dialogVisible = true
          }
        }).then(function (resp) {
        })
      }
    },
    reset () {
      location.reload()
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

<style scoped>
.exam {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
}
.exam-header {
  text-align: center;
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 60px;
  background-color: #0065a0;
  line-height: 60px;
  color: #fff;
  font-size: 18px;
}

.exam-container {
  position: absolute;
  top: 0;
  z-index: 1;
  left: 50%;
  width: 700px;
  min-height: 100%;
  background: #fff;
  margin-left: -350px;
  padding-top: 60px;
}

.exam-breadcrumb {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #e0e0e0;
  line-height: 50px;
  text-align: left;
  padding-left: 40px;
}
.exam-content {
  margin: 10px 40px;
  height: 300px;
  border-bottom: 1px solid #e0e0e0;
}
.exam-title{
  color: #4c4c4c;
  line-height: 40px;
  font-size: 20px;
}
.exam-answer {
 font-size: 18px;
}
.exam-btn {
  padding-top: 50px;
  padding-left: 15%;
}
.exam-check {
  line-height: 60px;
  padding-left: 15%;
}
.result {
  text-align: center;
  padding-top: 100px;
}
.result p{
  font-size: 30px;
  padding-bottom: 50px;
}
@media screen and (max-width:700px){
  .exam-container {
   left: 0; 
   margin-left: 0;
   width: 100%;
}
.exam-breadcrumb {
  padding-left: 15px;
}
.exam-content {
  margin: 10px 15px;
  height: 200px;
  border-bottom: 1px solid #e0e0e0;
}

.exam-btn {
  width: 100%;
  padding-top: 50px;
  text-align: center;
  padding-left: 0;
}
.exam-check {
  line-height: 60px;
  padding-left: 0;
  text-align: center;
}
}
</style>
