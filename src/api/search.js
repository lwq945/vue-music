import jsonp from 'common/js/jsonp.js'
import { commonParams, options } from './config.js'

export function getHotkey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    _: 1528097439967
  })

  return jsonp(url, data, options)
}