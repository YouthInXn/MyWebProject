// 处理Mongoose验证错误
const handleValidationError = (e, ctx) => {
  for (let i in e.errors) {
    // 取出第一个错误的信息返回
    ctx.body = {
      isSuccess:false,
      message:e.errors[i].message
    }
    return
  }
}

// 自定义验证错误信息
const getValidationError = (title, msg) => {
  return {
    name:'ValidationError',
    errors: {
      [title]:{ message: msg }
    }
  }
}

module.exports.handleValidationError = handleValidationError
module.exports.getValidationError = getValidationError
