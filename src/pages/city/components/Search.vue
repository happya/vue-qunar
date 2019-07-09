<template>
  <div>
    <div class="search">
      <!-- 搜索框 -->
      <input
        type="text"
        v-model="keyword"
        class="search-input"
        placeholder="输入城市名字或拼音"
      >
    </div>
    <!-- 搜索结果 -->
    <div
        class="search-content"
        ref="search"
        v-show="keyword"
    >
      <ul>
        <!-- 有匹配结果显示的列表项 -->
        <li
            class="search-item border-bottom"
            v-for="item of list"
            :key="item.id"
            @click="handleCityClick(item.name)"
        >
          {{item.name}}
        </li>
        <!-- 无匹配结果显示的列表项 -->
        <li
          class="search-item border-bottm"
          v-show="hasNoData">
          没有找到匹配数据
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import Bscroll from 'better-scroll';
import { mapMutations } from 'vuex';

export default {
  name: 'CitySearch',
  props: {
    cities: Object,
  },
  data() {
    return {
      keyword: '',
      list: [],
      timer: null,
    };
  },
  computed: {
    hasNoData() {
      return !this.list.length;
    },
  },
  watch: {
    keyword() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.keyword) {
        this.list = [];
        return;
      }
      this.timer = setTimeout(() => {
        const result = [];
        for (let i in this.cities) {
          this.cities[i].forEach((value) => {
            if (value.spell.indexOf(this.keyword) > -1 ||
                value.name.indexOf(this.keyword) > -1) {
                  result.push(value);
                }
          })
        }
      this.list = result;
    }, 100);
  }
  },
  methods: {
    handleCityClick(city) {
      this.changeCity(city);
      this.$router.push('/');
    },
    ...mapMutations(['changeCity']),
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.search);
  },
};
</script>


<style lang="stylus" scoped>
  @import '~styles/variables.styl'
  .search
    padding: 0 .1rem
    height: .72rem
    background: $bgColor
    .search-input
      box-sizing: border-box
      width: 100%
      padding: 0 .1rem
      height: .62rem
      line-height: .62rem
      text-align: center
      border-radius: 0.06rem
      color: #666
  .search-content
    z-index: 1
    overflow: hidden
    position: absolute
    top: 2.78rem
    left: 0
    right: 0
    bottom: 0
    background: #eee
    .search-item
      line-height: .62rem
      padding-left: .2rem
      color: #666
      background: #fff
</style>
