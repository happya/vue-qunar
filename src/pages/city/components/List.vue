<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="botton-list">
          <div class="button-wrapper">
            <div class="button">
              {{this.currentCity}}
            </div>
          </div>
        </div>
      </div>

      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="botton-list">
          <div class="button-wrapper"
               v-for="item of hot"
               :key="item.id"
               @click="handleCityClick(item.name)"
          >
            <div class="button">{{item.name}}</div>
          </div>
        </div>
      </div>

      <div
        class="area"
        v-for="(item,key) of cities"
        :key="key"
        :ref="key"
      >
        <div class="title border-bottom">{{key}}</div>
        <div class="item-list">
          <div class="item border-bottom"
               v-for="innerItem of item"
               :key="innerItem.id"
               @click="handleCityClick(innerItem.name)"
          >
            {{innerItem.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { mapState, mapMutations } from 'vuex';


export default {
  name: 'CityLit',
  props: {
    hot: Array,
    cities: Object,
    letter: String,
  },
  computed: {
    ...mapState({
      currentCity: 'city',
    }),
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper);
  },
  watch: {
    letter() {
      if (this.letter) {
        // 获取对应的dom元素
        const element = this.$refs[this.letter][0];
        this.scroll.scrollToElement(element);
      }
    },
  },
  methods: {
    handleCityClick(city) {
      // 派发一个dispatch 的action
      // 以第一个参数为名字的action存放在store的actions对象中
      // this.$store.dispatch('changeCity', city);
      // 方法二： 直接commit mutation
      this.changeCity(city);
      this.$router.push('/');
    },
    ...mapMutations(['changeCity']),
  },
};
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl'
  .border-topbottom
    &:before
      border-color: #ccc
    &:after
      border-color: #ccc
  .border-bottom
    &:before
      border-color: #ccc
  .list
    overflow: hidden
    position: absolute
    top: 1.58rem
    bottom: 0
    left: 0
    right: 0
    .title
      line-height: .54rem
      background: #eee
      padding-left: .2rem
      color: #666
      font-size: .26rem
      text-align: left
    .botton-list
      overflow: hidden
      padding: .1rem .6rem .1rem .1rem
      .button-wrapper
        float: left
        width: 33.33%
        .button
          text-align: center
          margin: .1rem
          padding: .1rem 0
          border: .02rem solid #ccc
          border-radius: .06rem
    .item-list
      .item
        text-align: left
        line-height: .76rem
        padding-left: .2rem
</style>
