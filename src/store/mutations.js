import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },
  [types.SET_TOP_LIST](state, toplist) {
    state.toplist = toplist
  }
}

export default mutations