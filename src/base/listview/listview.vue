<template>
  <base-scroll class="listview"
              :data="data"
              ref="listview"
              :listenScroll="listenScroll"
              :probeType="probeType"
              @scroll="scroll"
  >
    <ul>
      <li class="list-group" v-for="group in data" :key="group.title" ref="listGroup">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li class="list-group-item"
            v-for="item in group.items"
            :key="item.id"
            @click="selectItem(item)"
          >
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut">
      <ul>
        <li class="item"
          v-for="(item, index) in shortcutList"
          :data-index="index"
          :key="item"
          @touchstart="onShortcutTouchSatrt"
          @touchmove.stop.prevent="onShortcutTouchMove"
          :class="{'current': currentIndex===index}"
        >
          {{item}}
        </li>
      </ul>
    </div>
    <div v-show="!data.length" class="loading-container">
      <base-loading></base-loading>
    </div>
  </base-scroll>
</template>

<script>
import BaseScroll from 'base/scroll/scroll'
import BaseLoading from 'base/loading/loading'
import {getData} from 'common/js/dom.js'
const ALPHABET_HEIGHT = 18
export default {
  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0
    }
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  created() {
    // 让两个touch事件的处理函数可以获取到这个数据
    this.touch = {}
    // 监听scroll事件
    this.listenScroll = true
    this.listHeight = []
    // bs会时时派发scroll事件
    this.probeType = 3
  },
  methods: {
    selectItem(item) {
      this.$emit('selectSinger', item)
    },
    onShortcutTouchSatrt(e) {
      let alphabetIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      // 记录第一滚动位置的索引
      this.touch.alphabetIndex = alphabetIndex
      this._scrollTo(alphabetIndex)
    },
    onShortcutTouchMove(e) {
      // 当前滚动的位置和第一次滚动位置差,再除每个字符的高度
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = Math.floor((this.touch.y2 - this.touch.y1) / ALPHABET_HEIGHT)
      // 当前滚动到字母位置为第一次滚动位置的索引+delta
      let alphabetIndex = parseInt(this.touch.alphabetIndex) + delta
      this._scrollTo(alphabetIndex)
    },
    scroll(pos) {
      // 获取到当前实例滚动的y坐标的位置
      this.scrollY = pos.y
    },
    _caculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        // 累加,每一个listGroup的height等于前几项高度加上它的clientHeight(内容高度加上上下padding)
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    _scrollTo(index) {
      // index为null时,return
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight - 2) {
        index = this.listHeight - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    }
  },
  watch: {
    data() {
      // 数据改变,重新计算listGroup的高度
      setTimeout(() => {
        this._caculateHeight()
      }, 20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      // 滚动到顶部,newY大于0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间部分
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          // -newY大于当前项的高度且小于下一项的高度,currentIndex就等于当前项的索引
          this.currentIndex = i
          return
        }
      }
      // 滚动到底部, -newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    }
  },
  components: {
    BaseScroll,
    BaseLoading
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      z-index: 30
      position: absolute
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
