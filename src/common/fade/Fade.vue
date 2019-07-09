<template>
  <transition>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'FadeAnimation',
};
</script>

<style lang="stylus" scoped>
  .v-leave-to,
  .v-enter
    opacity: 0
  .v-leave-active,
  .v-enter-active
    transition: opacity .5s
</style>
