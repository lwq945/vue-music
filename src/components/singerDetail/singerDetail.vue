<template>
  <transition name="slide">
    <div class="singerDetail">
      周杰伦
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['singer'])
  },
  created() {
    console.log(this.singer)
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .singerDetail
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    z-index: 100
    background: $color-background
  .slide-enter-active, .slide-leave-active
    transition: all .5s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
