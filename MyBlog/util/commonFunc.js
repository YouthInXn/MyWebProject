

// 缓慢滚动至某位置
import * as axios from 'axios'

const speed = 2

export function scrollToSlowly (target) {
  let currentPosition
  let timer
  timer = setInterval(function () {
    let current = document.body.scrollTop || document.documentElement.scrollTop
    currentPosition = parseInt(current)
    if (Math.abs(target - currentPosition) <= speed) {
      window.scrollTo(0, target)
      clearInterval(timer)
      return
    }
    target > currentPosition ? currentPosition += speed : currentPosition -= speed
    window.scrollTo(0, currentPosition)
  }, 1)
}

// 随机颜色，十六进制方法；
export function getRandomColor () {
  let rand = Math.floor(Math.random( ) * 0xFFFFFF).toString(16)
  if(rand.length == 6){
    return rand
  }else{
    return getRandomColor()
  }
}
// 处理时间
export const getLocalTime = (time) => {
  const date = new Date(time)
  let year, month, day, hour, minute, second
  year = date.getFullYear() // 2019
  month = date.getMonth() + 1  // 3
  day = date.getDate() // 3
  hour = date.getHours()
  minute = date.getMinutes()
  second = date.getSeconds()
  const currentDate = new Date(Date.now())
  let currentYear, currentMonth, currentDay
  currentYear = currentDate.getFullYear()
  currentMonth = currentDate.getMonth() + 1
  currentDay = currentDate.getDate()
  if (hour < 10) { hour = `0${hour}` }
  if (minute < 10) { minute = `0${minute}` }
  if (second < 10) { second = `0${second}` }
  let timeStr = `  ${hour}:${minute}:${second}`
  if (year === currentYear && month === currentMonth) {
    if (day === currentDay) {
      return '今天' + timeStr
    } else if (currentDay - day === 1) {
      return '昨天' + timeStr
    } else if (currentDay - day === 2) {
      return '前天' + timeStr
    } else {
      return `${currentDay - day}天前${timeStr}`
    }
  }
  return `${year}-${month}-${day} ${timeStr}`
}

/**
 *
 * @param url
 * @param data
 * @param fileName 保存的文件名
 */
export const downloadFile = (url, data, fileName) => {
  axios({
    method: 'POST',
    data: data,
    url: url,
    responseType: 'blob'
  }).then(res => {
    download(res.data, fileName)
  })
}

function download(data, fileName) {
  if (!data) {
    return
  }
  // var blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'})
  const blob = new Blob([data], {type: 'application/vnd.ms-excel'})
  const url = window.URL.createObjectURL(blob)
  const aLink = document.createElement('a')
  aLink.style.display = 'none'
  aLink.href = url
  aLink.setAttribute('download', fileName)
  document.body.appendChild(aLink)
  aLink.click()
  document.body.removeChild(aLink)
  window.URL.revokeObjectURL(url)
}


