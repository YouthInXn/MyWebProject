/**
 * 作者分享API接口层
 * 2019/4/25
 * */

const ShareServices = require('../service/ShareServices')

const ShareRoutes = (router) => {
  router
    .post('/share', ShareServices.addShare)
    .delete('/share', ShareServices.deleteShare)
    .get('/share', ShareServices.getShare)
}

module.exports = ShareRoutes
