<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="recommend-slider">
          <base-slider :lists="recommendSliders"></base-slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul></ul>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSlider from 'base/slider/slider.vue'
import getRecommend from 'api/recommend.js'
import {ERR_OK} from 'api/config.js'
export default {
  name: 'Recommend',
  data() {
    return {
      recommendSliders: []
    }
  },
  created() {
    this._getRecommend()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommendSliders = res.data.slider
        }
      })
    }
  },
  components: {
    BaseSlider
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .recommend
    position: absolute
    top: 88px
    bottom: 0
    width: 100%
    .recommend-content
      height: 100%
      overflow: hidden
</style>