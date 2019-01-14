import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home/Home'
import About from './AboutMe/About'
import NotFound from './NotFound/index'
import Post from './Posts/index'
import Learn from './Learn/index'

/*
* Switch组件会从上向下依次匹配路由，放在最后的则是404
* */
const createRoutes = () => {
  return <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/author" component={About} />
    <Route path="/posts" component={Post} />
    <Route path="/learn" component={Learn} />
    <Route component={NotFound} />
  </Switch>
}

export default createRoutes
