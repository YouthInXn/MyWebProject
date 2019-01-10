import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home/Home'
import NotFound from './NotFound/NotFound'

/*
* Switch组件会从上向下依次匹配路由，放在最后的则是404
* */
const createRoutes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    {/*<Route path="/counter" component={Counter}/>*/}
    <Route component={NotFound} />
  </Switch>
)

export default createRoutes
