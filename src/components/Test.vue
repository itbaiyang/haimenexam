<template>
  <div class="exam">
    <div class="exam-header">微小餐饮单位食品安全知识考核</div>
    <div class="exam-container">
      <div class="exam-breadcrumb">
        <router-link :to="{name:'Home'}" class="link">知识考核</router-link>
        <span>></span>
        <span v-if="type == 1">判断题</span>
        <span v-if="type == 0">单择题</span>
        <span v-if="type == 2">多选题</span>
      </div>
      <div v-if="page.totalCount">
        <div class="exam-content">
          <div class="exam-title">
            <span>{{ count + 1 }}/{{ page.totalCount }}</span>
            <span>{{ examItem.content }}</span>
          </div>
          <div class="exam-answer" v-if="examItem.quesType != 2" v-on:click.stop="checkAnswer($event)">
            <P v-bind:class="{ 'answer-right': isRight == 'A', 'answer-wrong': isWrong == 'A' }">
              <input type="radio" id="radio1" value="A" v-model="radio" :disabled="radio != null">
              <label for="radio1">{{ examItem.optionA }}</label>
            </P>
            <P v-bind:class="{ 'answer-right': isRight == 'B', 'answer-wrong': isWrong == 'B' }">
              <input type="radio" id="radio2" value="B" v-model="radio" :disabled="radio != null">
              <label for="radio2">{{ examItem.optionB }}</label>
            </P>
            <P v-if="type == 0" v-bind:class="{ 'answer-right': isRight == 'C', 'answer-wrong': isWrong == 'C' }">
              <input type="radio" id="radio3" value="C" v-model="radio" :disabled="radio != null">
              <label for="radio3">{{ examItem.optionC }}</label>
            </P>
            <P v-if="type == 0"  v-bind:class="{ 'answer-right': isRight == 'D', 'answer-wrong': isWrong == 'D' }">
              <input type="radio" id="radio4" value="D" v-model="radio" :disabled="radio != null">
              <label for="radio4">{{ examItem.optionD }}</label>
            </P>
            <div style="padding: 20px 0">
              <span v-if="radio == examItem.rightAnswer" style="color: #0f0">回答正确！</span>
              <span v-if="radio && radio != examItem.rightAnswer" style="color: #f00">回答错误！</span>
              <span v-if="radio && radio != examItem.rightAnswer">正确答案：
                <i style="font-size:18px;font-weight: bold;color: #33a2f7;">{{ examItem.rightAnswer }}</i></span>
            </div>
          </div>
          <div class="exam-answer" v-if="examItem.quesType == 2">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="A" :disabled="radio != null">{{ examItem.optionA }}</el-checkbox><br/>
              <el-checkbox label="B" :disabled="radio != null">{{ examItem.optionB }}</el-checkbox><br/>
              <el-checkbox label="C" :disabled="radio != null">{{ examItem.optionC }}</el-checkbox><br/>
              <el-checkbox label="D" :disabled="radio != null">{{ examItem.optionD }}</el-checkbox><br/>
              <el-checkbox label="E" :disabled="radio != null" v-show="examItem.optionE">{{ examItem.optionE }}</el-checkbox><br/>
            </el-checkbox-group>
            <el-button type="primary" v-on:click="checkAnswers()" size="small">确定</el-button>
            <div style="padding: 20px 0">
              <span v-if="radio == examItem.rightAnswer" style="color: #0f0">回答正确！</span>
              <span v-if="radio && radio != examItem.rightAnswer" style="color: #f00">回答错误！</span>
              <span v-if="radio && radio != examItem.rightAnswer">正确答案：
                <i style="font-size:18px;font-weight: bold;color: #33a2f7;">{{ examItem.rightAnswer }}</i></span>
            </div>
          </div>
        </div>
        <div class="exam-btn">
          <!-- <el-button type="primary" style="margin-right: 20px;" :disabled="count == 0" v-on:click="getExamItem(-1)">上一页</el-button> -->
          <el-button type="primary" v-if="count+1 != page.totalCount" v-on:click="getExamItem(1)">下一页</el-button>
          <el-button type="primary" v-if="count+1 == page.totalCount" :disabled="radio == null" @click="dialogVisible = true">查看结果</el-button>

        </div>
        <div class="exam-check">
          <el-checkbox v-model="auto">答对自动下一题</el-checkbox>
          <span>答对：{{ right }}</span>
          <span>答错：{{ error }}</span>
          <span>正确率 {{ (right*100 / page.totalCount).toFixed(2) }}%</span>
        </div>
      </div>
      <div v-if="!page.totalCount" style="text-align: center">暂时没有题目！！</div>
    </div>
    <el-dialog
    title="练习结果"
    :visible.sync="dialogVisible"
    size="tiny">
    <p>正确：{{ right }}</p>
    <p>错误：{{ error }}</p>
    <p>正确率：{{ right * 100 / page.totalCount }}%</p>
  </el-dialog>
  </div>
</template>

<script>
// import Qs from 'qs'
export default {
  name: 'test',
  data () {
    return {
      token: this.$cookie.getCookie('token'),
      type: this.$route.params.type,
      page: {},
      examItem: {},
      count: 0,
      radio: null,
      right: 0,
      error: 0,
      auto: false,
      checkList: [],
      isRight: '',
      isWrong: '',
      dialogVisible: false
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
      this.radio = null
      this.checkList = []
      this.isRight = ''
      this.isWrong = ''
      this.count = this.count + num
      this.examItem = this.page.rows[this.count]
    },
    checkAnswer (event) {
      const self = this
      let ev = ev || window.event
      let target = ev.target || ev.srcElement
      if (target.nodeName.toLowerCase() === 'input') {
        if (this.radio === this.examItem.rightAnswer) {
          this.right++
          this.isRight = this.radio
          if (this.auto === true) {
            window.setTimeout(function () {
              self.getExamItem(1)
            }, 600)
          }
        } else {
          this.error++
          this.isRight = this.examItem.rightAnswer
          this.isWrong = this.radio
        }
      }
    },
    checkAnswers () {
      this.checkList.sort()
      this.radio = ''
      for (let i = 0; i < this.checkList.length; i++) {
        this.radio += this.checkList[i]
      }
      if (this.radio === this.examItem.rightAnswer) {
        this.right++
        this.isRight = this.radio
        if (this.auto === true) {
          this.getExamItem(1)
        }
      } else {
        this.error++
        this.isRight = this.examItem.rightAnswer
        this.isWrong = this.radio
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
  border-bottom: 1px solid #e0e0e0;
}
.exam-title{
  color: #4c4c4c;
  line-height: 40px;
}
.exam-answer {

}
.exam-btn {
  padding-top: 30px;
  padding-left: 15%;
}
.exam-check {
  line-height: 60px;
  padding-left: 15%;
}
input[type="radio"] {
  opacity: 0;
  position: relative;
  left: 18px;
  top: 2px;
  cursor: pointer;
}
p>label {
  margin-right: 15px;
  cursor: pointer;
  background: url(../assets/normal_img.png)no-repeat left;
  background-size: 14px 14px;
  padding-left: 20px;
}
.answer-right {
  color: #20a0ff;
}
.answer-right label{
  background-image: url('../assets/right_img.png');
}
.answer-wrong {
  color: #f00;
}
.answer-wrong label {
   background-image: url('../assets/wrong_img.png');
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
