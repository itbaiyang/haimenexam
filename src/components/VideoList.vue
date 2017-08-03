<template>
  <div class="exam">
    <div class="exam-header">微小餐饮单位食品安全知识考核</div>
    <div class="exam-container">
      <div class="exam-breadcrumb">
        <router-link :to="{name:'Home'}" class="link">知识考核</router-link>
        <span>>视频学习</span>
      </div>
      <div class="video">
        <el-row :gutter="20">
          <el-col v-for="item of videoList" :key="item.id" :xs="24" :sm="24" :md="12" :lg="12" class="video-ctrl">
            <router-link :to="{name:'Video', params:{id: item.url}}">
              <img v-bind:src="pathname + item.imgUrl" class="video-img" />
              <span class="img-cover-layer"></span>
              <i class="icon-play"></i>
              <p class="link">{{ item.name }}</p>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// import Qs from 'qs'
export default {
  name: 'VideoList',
  data () {
    return {
      videoList: [],
      pathname: this.$baseUrl
    }
  },
  mounted () {
    this.getVideoList()
  },
  methods: {
    getVideoList () {
      const self = this
      this.$ajax.get(this.$baseUrl + 'static/video.json').then(function (d) {
        self.videoList = d.data
      }).then(function (d) {
      })
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
.video {
  text-align: center;
  padding: 30px 15px;
}
.video-img {
  display: block;
  width: 250px;
  height: 160px;
  margin: 0 auto;
}

.video-ctrl {
  position: relative;
}
.video-ctrl:hover .img-cover-layer {
    opacity: 0;
    filter: alpha(opacity=0);
}
.img-cover-layer {
    position: absolute;
    left: 50%;
    top: 0;
    margin-left: -125px; 
    width: 250px;
    height: 160px;
    background-color: #000;
    opacity: .05;
    filter: alpha(opacity=5);
    transition: opacity .4s ease-in;
}
.video-ctrl:hover .icon-play {
    display: block;
    opacity: 1;
    filter: alpha(opacity=100);
}

.icon-play {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 52px;
  height: 52px;
  margin: -26px 0 0 -26px;
  background: url(../assets/play.png) no-repeat 50% 50%;
  opacity: 0;
  filter: alpha(opacity=0);
  z-index: 1;
  cursor: pointer;
  transition: opacity .4s ease-in;
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
