
const mongoose = require('../db')
// 判断是否是合法的ObjectId

const isObjId = function (str) {
  if (/^[a-fA-F0-9]{24}$/.test(str) && mongoose.Types.ObjectId.isValid(str)) {
    return true
  }
  return false
}

const utils = {
  isObjId
}

module.exports = utils
