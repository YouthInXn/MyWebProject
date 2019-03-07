
const message = {
  name:'abc',
  email:'yuanjia.fan@outlook.com',
  desc:'测试联系功能'
}
const data = [
  {
    name:'第一张',
    data:[
      ['NAME', 'E-MAIL', 'DESC', 'TIME'],
      ['abc', 'yuanjia.fan@outlook.com', '测试联系功能', new Date().toLocaleString()]
    ]
  }
]
const fs = require('fs')
const xlsx = require('node-xlsx')
const path = require('path')
const options = {'!cols':[{ wch:20 }, { wch:30 }, { wch:100 }, { wch:25 }]}
const buffer = xlsx.build(data, options)
fs.writeFile('./result1.xlsx', buffer, function (err) {
  if(err) {
    console.error(err)
  }else {
    const data = xlsx.parse('./result1.xlsx')
    console.log('第一条记录添加成功')
    console.log(JSON.stringify(data))
    insert()
  }
})
const insert  = () => {
  let secondData = ['test', 'yuanjia.fan@outlook.com', '测试联系功能', new Date().toLocaleString()]
// 添加一条数据
  const obj = xlsx.parse('./result1.xlsx')
  let record = obj[0].data
  console.log(JSON.stringify(record))
  record.push(secondData)
  const buffer1 = xlsx.build(obj, options)
  fs.writeFile('./result1.xlsx', buffer1,function (err) {
    if (err) {
      console.error(err)
    } else {
      console.log('第二条记录添加成功')
    }
  })
}


