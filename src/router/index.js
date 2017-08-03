import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Video from '@/components/Video'
import VideoList from '@/components/VideoList'
import Test from '@/components/Test'
import Exam from '@/components/Exam'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/videolist',
      name: 'VideoList',
      component: VideoList
    },
    {
      path: '/video/:id',
      name: 'Video',
      component: Video
    },
    {
      path: '/test/:type',
      name: 'Test',
      component: Test
    },
    {
      path: '/exam',
      name: 'Exam',
      component: Exam
    }
  ]
})
