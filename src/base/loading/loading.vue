<template>
  <div class="loading">
    <img class="loading-img" src="./loading.gif" alt="">
    <p class="loading-desc">{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在载入中......'
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  .loading
    width: 100%
    text-align: center
    .loading-img
      width: 24px
      height: 24px
    .loading-desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
</style>
