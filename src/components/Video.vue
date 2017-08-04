<template>
  <div class="exam">
    <div class="exam-header">微小餐饮单位食品安全知识考核</div>
    <video controls="controls" class="video-ctrl" preload autoplay>
      <source v-bind:src="pathname + url" type="video/mp4" />
      <source v-bind:src="pathname + url" type="video/ogg" />
    </video>
  </div>
</template>

<script>
// import Qs from 'qs'
export default {
  name: 'Video',
  data () {
    return {
      url: 'http://zs.zrodo.com/haimenexam/video/' + this.$route.params.id + '/' + this.$route.params.id + '.mp4',
      pathname: window.location.pathname
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
.exam {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #4c4c4c;
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
.video-ctrl {
   width: 100%; 
   height: 100%; 
}
@media screen and (max-width:700px) {
  .exam-container {
    left: 0;
    margin-left: 0;
    width: 100%;
  }
  .exam-breadcrumb {
    padding-left: 15px;
  }
}
</style>
