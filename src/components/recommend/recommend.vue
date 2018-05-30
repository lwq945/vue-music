<template>
  <div class="recommend">
    <base-scroll class="recommend-content" :data="discList" ref="scroll">
      <div class="recommend-content-wrapper">
        <div class="recommend-slider">
          <base-slider :lists="recommendSliders"></base-slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item in discList" :key="item.dissid">
              <div class="icon">
                <img class="icon-img" v-lazy="item.imgurl" @load="loadImage">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <base-loading></base-loading>
      </div>
    </base-scroll>
  </div>
</template>

<script>
import BaseLoading from 'base/loading/loading.vue'
import BaseScroll from 'base/scroll/scroll.vue'
import BaseSlider from 'base/slider/slider.vue'
import { getRecommend, getDiscList } from 'api/recommend.js'
import {ERR_OK} from 'api/config.js'
export default {
  name: 'Recommend',
  data() {
    return {
      recommendSliders: [],
      discList: []
    }
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommendSliders = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    loadImage() {
      // 监听图片的加载，只要有一张图片加载出来就可以撑开高度，在重新调用scroll的refresh()计算bs，就不怕scroll滚不到底
      if (!this.loadCheck) {
        this.$refs.scroll.refresh()
        this.loadCheck = true
      }
    }
  },
  components: {
    BaseSlider,
    BaseScroll,
    BaseLoading
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
            .icon-img
              width: 100%
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>