<template>
  <transition name="slide">
    <music-list  :songs="songs" :title="title" :bgImage="bgImage" :rank="rank"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list.vue'
import {getMusicList} from 'api/rank.js'
import {mapGetters} from 'vuex'
import {ERR_OK} from 'api/config.js'
import {createSong} from 'common/js/song.js'
import {getMusic} from 'api/singer.js'
export default {
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  computed: {
    ...mapGetters(['toplist']),
    title() {
      return this.toplist.topTitle
    },
    bgImage() {
      return this.toplist.picUrl
    }
  },
  created() {
    this._getTopMusic()
  },
  methods: {
    _getTopMusic() {
      if (!this.toplist.id) {
        this.$router.push('/rank')
        return
      }
      getMusicList(this.toplist.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songlist)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        const musicData = item.data
        if (musicData.songid && musicData.albummid) {
          getMusic(musicData.songmid).then((res) => {
            if (res.code === ERR_OK) {
              const svkey = res.data.items
              // console.log(svkey)
              const songVkey = svkey[0].vkey
              // console.log(songVkey)
              ret.push(createSong(musicData, songVkey))
            }
          })
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all .5s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
