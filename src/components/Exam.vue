<template>
  <div class="exam">
    <div class="exam-header">微小餐饮单位食品安全知识考核</div>
    <div class="exam-container">
      <div class="exam-breadcrumb">
        <router-link :to="{name:'Home'}" class="link">知识考核</router-link>
        <span>></span>
        <span>综合考试</span>
      </div>
      <div class="exam-content">
        <div class="exam-title">
          <span>{{ count + 1 }}/{{ page.totalCount }}</span>
          <span>{{ examItem.content }}</span>
        </div>
        <div class="exam-answer" v-if="examItem.quesType != 2" v-on:click.stop="checkAnswer($event)">
          <el-radio class="radio" v-model="radio" label="A">{{ examItem.optionA }}</el-radio>
          <el-radio class="radio" v-model="radio" label="B">{{ examItem.optionB }}</el-radio>
          <el-radio v-if="type == 0" class="radio" v-model="radio" label="C">{{ examItem.optionC }}</el-radio>
          <el-radio v-if="type == 0" class="radio" v-model="radio" label="D">{{ examItem.optionD }}</el-radio>
        </div>
        <div class="exam-answer" v-if="examItem.quesType == 2">
          <!-- <el-radio class="radio" v-model="radio" label="A">{{ examItem.optionA }}</el-radio>
          <el-radio class="radio" v-model="radio" label="B">{{ examItem.optionB }}</el-radio>
          <el-radio v-if="type == 0" class="radio" v-model="radio" label="C">{{ examItem.optionC }}</el-radio>
          <el-radio v-if="type == 0" class="radio" v-model="radio" label="D">{{ examItem.optionD }}</el-radio> -->
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="A">{{ examItem.optionA }}</el-checkbox>
            <el-checkbox label="B">{{ examItem.optionB }}</el-checkbox>
            <el-checkbox label="C">{{ examItem.optionC }}</el-checkbox>
            <el-checkbox label="D">{{ examItem.optionD }}</el-checkbox>
            <el-checkbox label="E" v-show="examItem.optionE">{{ examItem.optionE }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="exam-btn">
        <el-button type="primary" style="margin-right: 20px;" v-on:click="getExamItem(-1)">上一页</el-button>
        <el-button type="primary" v-on:click="getExamItem(1)">下一页</el-button>
      </div>
      <div class="exam-check">
        <el-checkbox v-model="auto">答对自动下一题</el-checkbox>
        <span>答对：{{ right }}</span>
        <span>答错：{{ error }}</span>
        <span>正确率 {{ (right*100 / page.totalCount).toFixed(2) }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
// import Qs from 'qs'
export default {
  name: 'exam',
  data () {
    return {
      token: this.$cookie.getCookie('token'),
      page: {},
      examItem: {},
      count: 0,
      radio: null,
      right: 0,
      error: 0,
      auto: false,
      checkList: []
    }
  },
  mounted () {
    this.getExamList(1, 100, this.type)
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
      this.$ajax.get('exam/quesList', {params: mParams}).then(function (resp) {
        if (resp.data.respCode === '1000000') {
          self.page = resp.data.page
          self.getExamItem(0)
        }
      }).then(function (resp) {
      })
    },
    getExamItem (num) {
      if (this.examItem.quesType === '2') {
        this.checkList.sort()
        this.radio = ''
        for (let i = 0; i < this.checkList.length; i++) {
          this.radio += this.checkList[i]
        }
      }
      if ((this.count + num) < 0) {
        alert('现在是第一题')
      } else if ((this.count + num + 1) > this.page.totalCount) {
        if (this.radio === this.examItem.rightAnswer) {
          this.right++
        } else {
          this.error++
        }
        alert('答题结束，正确率：' + this.right * 100 / this.page.totalCount + '%')
      } else {
        if (this.radio === this.examItem.rightAnswer) {
          this.right++
        } else {
          this.error++
        }
        this.radio = null
        this.checkList = []
        this.count = this.count + num
        this.examItem = this.page.rows[this.count]
      }
    },
    checkAnswer (event) {
      let ev = ev || window.event
      let target = ev.target || ev.srcElement
      if (target.nodeName.toLowerCase() === 'input') {
        if (this.auto === true) {
          if (this.radio === this.examItem.rightAnswer) {
            this.getExamItem(1)
          } else {
            console.log('错了')
          }
        }
      }
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
  height: 200px;
  border-bottom: 1px solid #e0e0e0;
}
.exam-title{
  color: #4c4c4c;
  line-height: 40px;
}
.exam-answer {

}
.exam-btn {
  padding-top: 50px;
  padding-left: 15%;
}
.exam-check {
  line-height: 60px;
  padding-left: 15%;
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
