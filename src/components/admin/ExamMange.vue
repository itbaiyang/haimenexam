<template>
<div class="exam-admin">
  <p>考卷列表  <el-button type="text" @click="dialogFormVisible = true">增加试卷</el-button></p>
  <el-dialog title="考卷设置" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="考试名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="考试时间" :label-width="formLabelWidth" prop="datetime1">
        <div class="block">
          <el-date-picker
            v-model="form.datetime1"
            type="datetimerange"
            placeholder="选择日期范围">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="题目总数" :label-width="formLabelWidth" prop="totalCount">
        <el-select v-model="form.totalCount" placeholder="请选择题目总数">
          <el-option label="50" value="50"></el-option>
          <el-option label="100" value="100"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题目设置" :label-width="formLabelWidth">
      </el-form-item>
      <el-form-item label="单选题" :label-width="formLabelWidth" prop="single">
        <el-input v-model.number="form.single" type="single" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="多选题" :label-width="formLabelWidth" prop="multiple">
        <el-input v-model.number="form.multiple" type="multiple" singleauto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="判断题" :label-width="formLabelWidth" prop="jungle">
        <el-input v-model.number="form.jungle" type="jungle" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="index" label="序号" width="180"></el-table-column>
    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
    <el-table-column prop="time" label="考试时间"></el-table-column>
    <el-table-column prop="number" label="考题数量"></el-table-column>
    <el-table-column label="考试排名">
      <template scope="scope">
        <el-button @click="handleClick" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="number" label="查看考题">
      <template scope="scope">
        <el-button @click="handleClick" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>

</template>
 <script>
    export default {
      name: 'adminExam',
      data () {
        var checkAge = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('数量不能为空'))
          }
          setTimeout(() => {
            if (!Number.isInteger(value)) {
              callback(new Error('请输入数字值'))
            } else {
              if (+this.form.single + +this.form.multiple + +this.form.jungle > this.form.totalCount) {
                console.log(this.form)
                callback(new Error('题目个数之和不能超过总数'))
              } else {
                callback()
              }
            }
          }, 1000)
        }
        return {
          tableData: [{
            index: '1',
            name: '海门考试',
            time: '2017-05-09 14:00 - 24 08:00',
            number: 50
          }, {
            index: '2',
            name: '海门考试',
            time: '2017-05-09 14:00 - 24 08:00',
            number: 50
          }, {
            index: '3',
            name: '海门考试',
            time: '2017-05-09 14:00 - 24 08:00',
            number: 50
          }, {
            index: '4',
            name: '海门考试',
            time: '2017-05-09 14:00 - 24 08:00',
            number: 50
          }],
          dialogFormVisible: false,
          form: {
            name: '',
            datetime1: '',
            totalCount: '',
            single: '',
            multiple: '',
            jungle: '',
            delivery: false
          },
          rules: {
            name: [
              { required: true, message: '请输入试卷名称', trigger: 'blur' }
            ],
            datetime1: [
              { required: true, type: 'datetime', message: '请选择日期', trigger: 'change' }
            ],
            totalCount: [
              { required: true, message: '请选择题目数量', trigger: 'change' }
            ],
            single: [
              // { required: true, message: '请选择单选题数量', trigger: 'blur' },
              { validator: checkAge, trigger: 'blur' }
            ],
            multiple: [
              // { required: true, message: '请选择多选题数量', trigger: 'blur' },
              { validator: checkAge, trigger: 'blur' }
            ],
            jungle: [
              // { required: true, message: '请选择判断题数量', trigger: 'blur' },
              { validator: checkAge, trigger: 'blur' }
            ]
          },
          formLabelWidth: '120px'
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
  