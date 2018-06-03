<template>
  <transition name="slide">
    <music-list :songs="songs" :title="discTitle" :bgImage="bgImage"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list.vue'
import {getDiscMusic} from 'api/recommend.js'
import {getMusic} from 'api/singer.js'
import { ERR_OK } from 'api/config.js'
import {mapGetters} from 'vuex'
import {createSong} from 'common/js/song.js'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters(['disc']),
    discTitle() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    }
  },
  created() {
    this._getDiscMusic()
  },
  methods: {
    _getDiscMusic() {
      getDiscMusic(this.disc.dissid).then((res) => {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongData(res.cdlist[0].songlist)
        }
      })
    },
    _normalizeSongData(list) {
      let ret = []
      list.forEach((musicData) => {
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
