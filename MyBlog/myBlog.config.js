const path = require('path')

const MyBlogConfig = {
  // 网站标题
  title: 'YouthInXian',
  /* 个人头像，开发环境下相对Dist目录 */
  myVatar:'/public/Avatar.jpg',
  /* 个人签名 */
  des:'在浑浑噩噩之前，掌握自己的命运',
  /* global __dirname */
  // 网站图标
  favicon:path.join(__dirname, 'public/favicon.png'),
  /* 分离第三方库 */
  vendors:[
    'react',
    'react-router-dom',
    'redux',
    'react-dom',
    'react-redux'
  ]
}

module.exports = MyBlogConfig
