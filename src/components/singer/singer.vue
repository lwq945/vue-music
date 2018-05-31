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
          this.singers = this._normalizeSinger(res.singerList.data.singerlist)
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
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push({
            id: item.singer_mid,
            name: item.singer_name,
            avatar: item.singer_pic
          })
        }
        const key = item.country
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push({
          id: item.singer_mid,
          name: item.singer_name,
          avatar: item.singer_pic
        })
      })

      let arr = []
      let other = []
      for (let key in map) {
        if (key === '') {
          map[key].title = '其他'
          other.push(map[key])
        } else {
          arr.push(map[key])
        }
      }
      return arr.concat(other)
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
