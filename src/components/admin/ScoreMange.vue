<template>
  <div class="exam-admin">
    <p>考试成绩列表</p>
    <div style="width: 200px;display:inline-block">
      <el-input v-model="creditno" placeholder="身份证号"></el-input>
    </div>
    <div style="width: 200px;display:inline-block">
      <el-input v-model="telphone" placeholder="电话号码"></el-input>
    </div>
    <!-- <div style="width: 400px;display:inline-block">
      <el-date-picker v-model="datetime" type="datetimerange" placeholder="选择日期范围">
      </el-date-picker>
    </div> -->
    <div style="width: 200px;display:inline-block">
      <el-button type="primary" @click="getScoreList(1, 100)">确 定</el-button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="creditno" label="身份证" width="180"></el-table-column>
      <el-table-column prop="telphone" label="电话" width="180"></el-table-column>
      <el-table-column prop="createdate" label="考试时间"></el-table-column>
      <el-table-column prop="score" label="分数"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'scoreExam',
  data () {
    return {
      creditno: '',
      datetime: '',
      telphone: '',
      tableData: []
    }
  },
  mounted () {
    this.getScoreList(1, 100)
  },
  methods: {
    getScoreList (pageno, pageSize, creditno, telphone, startdate, enddate) {
      console.log(this.datatime)
      const self = this
      const mParams = {
        'creditno': this.creditno,
        'telphone': this.telphone,
        'pagesize': pageSize,
        'pageno': pageno
        // 'startdate': this.formatDate(self.datetime[0], 'yyyy-MM-dd hh:mm:ss'),
        // 'enddate': this.formatDate(self.datetime[1], 'yyyy-MM-dd hh:mm:ss')
      }
      this.$ajax.get('exam/examRankByCredit', { params: mParams }).then(function (resp) {
        if (resp.data.respCode === '1000000') {
          self.tableData = resp.data.result
          console.log(self.tableData)
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
  