/* babel配置 */
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './router/App'
import { BrowserRouter as Router } from 'react-router-dom'


/* 初始化 */
renderWithHMR(App)

/* 热加载配置 */
if (module.hot) {
  module.hot.accept('./router/App.js', function () {
    /* 检测到热加载重新渲染 */
    const NextApp = require('./router/App').default
    renderWithHMR(NextApp)
  })
}
/* 入口 */
function renderWithHMR (RootNode) {
  /* Provider组件将store传递给所有的容器组件 */
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <RootNode />
      </Router>
    </Provider>,
    document.getElementById('myBlog')
  )
}

