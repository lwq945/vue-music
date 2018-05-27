import originJSONP from 'jsonp'

// 封装jsonp
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        // 处理返回的数据
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

// 拼接请求url的参数。例如：https://xxx.com/static/index.html?key1=value1&key2=value2&key3=value3
function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }

  // 返回去掉第一个'&'的拼接字符串，否则返回空
  return url ? url.substring(1) : ''
}