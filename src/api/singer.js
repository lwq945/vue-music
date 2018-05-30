import jsonp from 'common/js/jsonp.js'
import { commonParams } from './config.js'

export function getSingerList() {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

  const data = Object.assign({}, commonParams, {
    callback: 'getUCGI7199756506798118',
    jsonpCallback: 'getUCGI7199756506798118',
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    data: '{"comm":{"ct":24,"cv":10000},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}}'
  })

  const options = {
    params: 'jsonpCallback',
    name: 'getUCGI7199756506798118'
  }
  return jsonp(url, data, options)
}