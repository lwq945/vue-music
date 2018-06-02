import jsonp from 'common/js/jsonp.js'
import { commonParams, options } from './config.js'
import axios from 'axios'

export function getSingerList() {
  // const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

  // const data = Object.assign({}, commonParams, {
  //   callback: 'getUCGI7199756506798118',
  //   jsonpCallback: 'getUCGI7199756506798118',
  //   loginUin: 0,
  //   hostUin: 0,
  //   platform: 'yqq',
  //   needNewCode: 0,
  //   data: '{"comm":{"ct":24,"cv":10000},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}}'
  // })

  // const options = {
  //   params: 'jsonpCallback',
  //   name: 'getUCGI7199756506798118'
  // }
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 1928093487,
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  return jsonp(url, data, options)
}

export function getSingerDetail(singerMid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: singerMid,
    order: 'listen',
    begin: 0,
    num: 30,
    songstatus: 1
  })

  return jsonp(url, data, options)
}

export function getMusic(songMid) {
  const url = '/api/music'

  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    songmid: songMid,
    filename: `C400${songMid}.m4a`,
    guid: 2117482800
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}