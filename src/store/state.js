import {playMode} from 'common/js/config.js'

const state = {
  singer: {},
  disc: {},
  toplist: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1
}

export default state