<template>
  <div>
    <home-header></home-header>
    <home-swiper :list="swiperList"></home-swiper>
    <home-icons :list="iconList"></home-icons>
    <home-recommend :list="recommendList"></home-recommend>
    <home-weekend :list="weekendList"></home-weekend>
  </div>

</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import axios from 'axios';
import { mapState } from 'vuex';

import HomeHeader from './components/Header';
import HomeSwiper from './components/Swiper';
import HomeIcons from './components/Icons';
import HomeRecommend from './components/Recommend';
import HomeWeekend from './components/Weekend';

export default {
  name: 'Home',
  data() {
    return {
      // city: '',
      swiperList: [],
      iconList: [],
      recommendList: [],
      weekendList: [],
      lastCity: '',
    };
  },
  computed: {
    ...mapState(['city']),
  },
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend,
  },

  methods: {
    getHomeInfo() {
      axios.get('/api/index.json?city=' + this.city)
        .then(this.getHomeInfoSucc);
    },
    getHomeInfoSucc(res) {
      if (res.data.ret && res.data.data) {
        const data = res.data.data;
        // this.city = data.city;
        this.swiperList = data.swiperList;
        this.iconList = data.iconList;
        this.recommendList = data.recommendList;
        this.weekendList = data.weekendList;
      }
      // console.log(res);
    },
  },
  mounted() {
    // 页面挂载后执行该函数
    this.lastCity = this.city;
    this.getHomeInfo();
  },
  activated() {
    if (this.lastCity !== this.city) {
      this.lastCity = this.city;
      this.getHomeInfo();
    }
  },
};
</script>

<style>

</style>
