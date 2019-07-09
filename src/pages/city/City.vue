<template>
  <div>
    <city-header></city-header>
    <city-search :cities="cities"></city-search>
    <city-list
      :cities="cities"
      :hot="hotCities"
      :letter="letter"
    ></city-list>
    <city-alphabet
      :cities="cities"
      @change="handleLetterChange"
    ></city-alphabet>
  </div>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import axios from 'axios';

import CityHeader from './components/Header';
import CitySearch from './components/Search';
import CityList from './components/List';
import CityAlphabet from './components/Alphabet';

export default {
  name: 'City',
  data() {
    return {
      cities: {},
      hotCities: [],
      letter: '',
    };
  },
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet,
  },
  mounted() {
    this.getCityInfo();
  },
  methods: {
    getCityInfo() {
      axios.get('/api/city.json')
        .then(this.handleGetCityInfoSucc);
    },
    handleGetCityInfoSucc(res) {
      res = res.data;
      if (res.ret && res.data) {
        const data = res.data;
        this.cities = data.cities;
        this.hotCities = data.hotCities;
      }
    },
    handleLetterChange(letter) {
      this.letter = letter;
      // console.log(this.letter);
    },
  },

};
</script>

<style lang="stylus" scoped>

</style>

