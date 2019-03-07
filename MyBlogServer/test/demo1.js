const fs = require('fs')

async function test () {
  try {
    const result = await new Promise(function (resolve, reject) {
      return fs.stat('./result1.xlsx', function (err, stat) {
        if (err) {
          reject(123)
        } else {
          resolve(stat)
        }
      })
    })
    console.log(result)
  } catch (e) {
    console.log(e.message)
  }
}
test();
console.log(111)

