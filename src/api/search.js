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

export function getSearchResult(query, page, zhida, perpage) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    w: query,
    zhidaqu: 1,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: perpage,
    n: 20,
    p: page,
    remoteplace: 'txt.mqq.all',
    _: 1528112776051
  })

  return jsonp(url, data, options)
}