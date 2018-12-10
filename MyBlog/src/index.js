import React from 'react'
import ReactDOM from 'react-dom'
import createRoutes from './router/router'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import store from './redux/store'

/* 初始化 */
renderWithHMR(createRoutes())

/* 热加载配置 */
if (module.hot) {
  module.hot.accept('./router/router.js', function () {
    /* 检测到热加载重新渲染 */
    const createRoutes = require('./router/router').default
    renderWithHMR(createRoutes())
  })
}
/* 入口 */
function renderWithHMR (RootNode) {
  /* Provider组件将store传递给所有的子路由组件 */
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        {RootNode}
      </Provider>
    </AppContainer>,
    document.getElementById('myBlog')
  )
}

