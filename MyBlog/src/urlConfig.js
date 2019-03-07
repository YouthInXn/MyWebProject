const projectConfig = require('../myBlog.config')
// 协议
const protocol = window.location.protocol
// 主机
const host = projectConfig.host

export const rootUrl = `${protocol}//${host}`

// user
export const userUrl = `${rootUrl}/users`
// message
export const messageUrl = `${rootUrl}/message`

