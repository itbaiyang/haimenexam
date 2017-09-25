<template>
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
</template>
<script>
export default {
  name: 'Top',
  data () {
    return {
      creditno: JSON.parse(window.sessionStorage.getItem('userInfo1')).creditno
    }
  },
  mounted () {
  },
  methods: {
    logout () {
      this.$cookie.clearCookie('token')
      this.$router.push('/')
    },
    getStudyLength () {
      // const self = this
      const mParams = {
        'creditno': this.creditno
      }
      this.$ajax.get('exam/getStudyLengthByCredit', {params: mParams}).then(function (resp) {
        if (resp.data.respCode === '1000000') {
        }
        console.log(resp)
      }).then(function (resp) {
      })
    }
  }
}
</script>