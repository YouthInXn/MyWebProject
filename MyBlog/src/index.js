/* babel配置 */
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './components/App/APP'
import { BrowserRouter as Router } from 'react-router-dom'

/* 初始化 */
renderWithHMR(App)

/* 热加载配置 */
if (module.hot) {
  module.hot.accept('./components/App/APP.js', function () {
    /* 检测到热加载重新渲染 */
    const nextApp = require('./components/App/APP').default
    renderWithHMR(nextApp)
  })
}
/* 入口 */
function renderWithHMR (RootNode) {
  /* Provider组件将store传递给所有的容器组件 */
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <RootNode />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('myBlog')
  )
}

