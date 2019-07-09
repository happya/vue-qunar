<template>
  <ul class="list">
    <li class="item"
        v-for="item of letters"
        :key="item"
        @touchstart.prevent="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @click="handleLetterClick"
        :ref="item"
    >
     {{item}}
    </li>
  </ul>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
export default {
  name: 'CityAlphabet',
  props: {
    cities: Object,
  },
  data() {
    return {
      touchStatus: false,
      startY: 0,
      timer: null,
    };
  },
  updated() {
    // 获取A元素距离List元素顶部的高度
    this.startY = this.$refs.A[0].offsetTop;
  },
  computed: {
    letters() {
      const letters = [];
      for (let i in this.cities) {
        letters.push(i);
      }
      return letters;
    },
  },
  methods: {
    handleLetterClick(e) {
      this.$emit('change', e.target.innerText);
      // console.log(e.target.innerText);
    },
    handleTouchStart() {
      this.touchStatus = true;
    },
    handleTouchMove(e) {
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        // 函数节流
        this.timer = setTimeout(() => {
        // 获取触屏位置距离屏幕顶部的高度，减去List元素顶部距离屏幕顶部的高度
          const touchY = e.touches[0].clientY - 79;
          // 20为每个字母的高度
          const index = Math.floor((touchY - this.startY) / 20);
          // console.log(index);
          if (index >= 0 && index < this.letters.length) {
            this.$emit('change', this.letters[index]);
          }
        }, 16);
      }
    },
    handleTouchEnd() {
      this.touchStatus = false;
    },
  },
};
</script>

<style lang="stylus" scoped>
  @import '~styles/variables.styl'
  .list
    display: flex
    flex-direction: column
    justify-content: center
    position: absolute
    right: 0
    top: 1.58rem
    bottom: 0
    width: .4rem
    .item
      text-align: center
      line-height: .4rem
      color: $bgColor
</style>

