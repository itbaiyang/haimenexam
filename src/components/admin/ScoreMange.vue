<template>
  <div class="exam-admin" style="height: 100%;">
    <p>考试成绩列表</p>
    <div style="width: 200px;display:inline-block">
      <el-input v-model="creditno" placeholder="身份证号"></el-input>
    </div>
    <div style="width: 200px;display:inline-block">
      <el-input v-model="telphone" placeholder="电话号码"></el-input>
    </div>
    <div style="width: 200px;display:inline-block">
      <el-select v-model="value" placeholder="所有考试">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!-- <div style="width: 400px;display:inline-block">
      <el-date-picker v-model="datetime" type="datetimerange" placeholder="选择日期范围">
      </el-date-picker>
    </div> -->
    <div style="width: 200px;display:inline-block">
      <el-button type="primary" @click="getScoreList(1, 100)">确 定</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%; max-height: calc(100% - 220px);overflow:auto;margin-top:15px;">
      <el-table-column prop="creditno" label="身份证" width="180"></el-table-column>
      <el-table-column prop="telphone" label="电话" width="180"></el-table-column>
      <el-table-column prop="createdate" label="考试时间"></el-table-column>
      <el-table-column prop="examType" label="考试类型"></el-table-column>
      <el-table-column prop="studyLength" label="学习时长"></el-table-column>
      <el-table-column prop="score" label="分数"></el-table-column>
    </el-table>
    <div class="block" style="margin-top:20px; float:right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="getScoreList"
        :current-page.sync="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'scoreExam',
  data () {
    return {
      creditno: '',
      datetime: '',
      startdate: '',
      enddate: '',
      telphone: '',
      tableData: [],
      currentPage: 1,
      total: 0,
      options: [
        {
          value: '',
          label: '所有考试'
        },
        {
          value: '0',
          label: '普通考试'
        }, {
          value: '1',
          label: '教育系统考试'
        }
      ],
      value: ''
    }
  },
  mounted () {
    this.getScoreList(1, 10)
  },
  methods: {
    handleSizeChange (val) {
      this.getScoreList(this.currentPage, val)
    },
    getScoreList (pageno, pagesize, startdate, enddate) {
      const self = this
      if (self.datetime[0] === undefined || self.datetime[0] === null) {
        this.startdate = null
        this.enddate = null
      } else {
        this.startdate = this.formatDate(self.datetime[0], 'yyyy-MM-dd hh:mm:ss')
        this.enddate = this.formatDate(self.datetime[1], 'yyyy-MM-dd hh:mm:ss')
      }
      const mParams = {
        'creditno': this.creditno,
        'telphone': this.telphone,
        'pagesize': pagesize,
        'pageno': pageno,
        'examType': this.value,
        'startdate': this.startdate,
        'enddate': this.enddate
      }
      this.$ajax.get('exam/examRankByCredit', { params: mParams }).then(function (resp) {
        if (resp.data.respCode === '1000000') {
          self.tableData = resp.data.result
          self.total = resp.data.count
        }
      }).then(function (resp) {
      })
    },
    formatDate (date, fmt) {
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
.exam-admin {
  padding: 0 15px;
}
p {
  line-height: 40px;
}
</style>
  