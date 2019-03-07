
const router = require('koa-router')()
const UserRoutes = require('./routes/UserRoutes')
const MessageRoutes = require('./routes/MessageRoutes')

UserRoutes(router)
MessageRoutes(router)


module.exports = router

