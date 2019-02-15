
const User = require('../DBModels/User')

async function test () {
  const result = await User.findOne({ name:'YouthInXian' }).exec()
  console.log(result)
}
test();
