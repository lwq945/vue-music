<template>
  <div class="singer">
    <list-view :data="singers" @selectSinger="showDetail"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import ListView from 'base/listview/listview.vue'
import { getSingerList } from 'api/singer.js'
import { ERR_OK } from 'api/config.js'
import Singer from 'common/js/singer-class.js'
import {mapMutations} from 'vuex'

const HOT_KEY = '热门'
const HOT_SINGER_LEN = 10

export default {
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_KEY,
          items: []
        }
      }

      list.forEach((item, index) => {
        // 数据前10条，定为热门数据
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        // 为歌手按Findex分类
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // 处理map，得到有序列表
      let hot = []
      let ret = []
      for (let key in map) {
        let value = map[key]
        // 判断每一项的title是字母还是'热门'，分别push进对应的数组
        if (value.title.match(/[a-zA-Z]/)) {
          ret.push(value)
        } else if (value.title === HOT_KEY) {
          hot.push(value)
        }
      }
      // 为ret数组的项排序，为A-Z
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    showDetail(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      // 提交mutation
      this.setSinger(singer)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .singer
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
</style>
