
const router = require('koa-router')()
const UserRoutes = require('./routes/UserRoutes')
const MessageRoutes = require('./routes/MessageRoutes')
const ShareRoutes = require('./routes/ShareRoutes')

UserRoutes(router)
MessageRoutes(router)
ShareRoutes(router)


module.exports = router

