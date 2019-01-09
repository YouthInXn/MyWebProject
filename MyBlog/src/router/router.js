import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Page1 from './pages/Page1'
import Counter from './Counter/containers/CounterContainers'
import NotFound from './pages/NotFound/NotFound'

/*
* Switch组件会从上向下依次匹配路由，放在最后的则是404
* */
const createRoutes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/page1" component={Page1} />
    <Route path="/counter" component={Counter}/>
    <Route component={NotFound} />
  </Switch>
)

export default createRoutes
