<template>
  <scroll class="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore" ref="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item, index) in result" :key="index">
        <div class="icon">
          <i :class="getIconClass(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=''></loading>
    </ul>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll.vue'
import Loading from 'base/loading/loading.vue'
import {getSearchResult} from 'api/search.js'
import {ERR_OK} from 'api/config.js'
import {createSong} from 'common/js/song.js'
const TYPE_SINGER = 'singer'
const perpage = 20
export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      pullup: true,
      // 检查是否有歌曲
      hasMore: true
    }
  },
  methods: {
    _getSearchResult() {
      this.page = 1
      this.hasMore = true
      // 第一次请求数据时，都要滚动到顶
      this.$refs.suggest.scrollTo(0, 0)
      getSearchResult(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this._normalizeData(res.data)
          this._checkMore(res.data)
        }
      })
    },
    _normalizeData(data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }

      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list))
      }
      return ret
    },
    _normalizeSongs(list) {
      let ret1 = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albummid) {
          ret1.push(createSong(musicData))
        }
      })
      return ret1
    },
    getIconClass(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name} - ${item.singer}`
      }
    },
    searchMore() {
      if (!this.hasMore) {
        return
      }
      this.page++
      getSearchResult(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this.result.concat(this._normalizeSongs(res.data.song.list))
          this._checkMore(res.data)
        }
      })
    },
    _checkMore(data) {
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
        this.hasMore = false
      }
    }
  },
  watch: {
    query() {
      this._getSearchResult()
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
