const xlsx = require('node-xlsx')
const fs = require('fs')
const path = require('path')
const messageTemplate = [{
  name:'待联系人列表',
  data:[
    ['NAME', 'E-MAIL', 'DESC', 'TIME']
  ]
}]
const options = {'!cols':[{ wch:20 }, { wch:30 }, { wch:100 }, { wch:25 }]}
const filePath = path.join(__dirname, '/messageList.xlsx')

const insertMessage = async (data) => {
  if (!data.hasOwnProperty('email') || !data.hasOwnProperty('name')) {
    return { isSuccess:false, message:'请输入昵称或者联系邮箱！' }
  }
  // 格式化数据
  let tempData = []
  for (let k in data) {
    tempData.push(data[k])
  }
  tempData.push(new Date().toLocaleString())
  // 根据情况存储写入
  let buffer = null
  let stats = await new Promise(function (resolve) {
    return fs.access(filePath, fs.constants.F_OK, function (err) {
      resolve(err ? false : true)
    })
  })
  if (!stats) {
    // 第一次
    messageTemplate[0].data.push(tempData)
    buffer = xlsx.build(messageTemplate, options)
  } else {
    // 后续
    let record = xlsx.parse(filePath)
    record[0].data.push(tempData)
    buffer = xlsx.build(record, options)
  }
  let result = await new Promise(function (resolve, reject) {
    fs.writeFile(filePath, buffer, function (err) {
      if (err) {
        reject({ isSuccess:false, message:err.message })
      } else {
        resolve({ isSuccess:true })
      }
    })
  })
  return result
}

module.exports = insertMessage
