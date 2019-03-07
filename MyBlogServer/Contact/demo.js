const fs = require('fs')

async function test () {
  try {
    const result = await new Promise(function (resolve, reject) {
      return fs.stat('./messageList.xlsx', function (err, stat) {
        if (err) {
          reject(err.message)
        } else {
          resolve(stat)
        }
      })
    })
    console.log(result)
  } catch (e) {
    console.log(e)
  }
}
test();
console.log(111)
