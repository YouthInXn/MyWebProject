import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home/Home'
import Author from './Author/index'
import NotFound from './NotFound/index'
import Post from './Posts/index'
import Learn from './Learn/index'
import AboutMe from './AboutMe/containers/aboutMeContainers'
import Message from './MessageBoard/containers/messageContainer'

/*
* Switch组件会从上向下依次匹配路由，放在最后的则是404
* */
const createRoutes = () => {
  return <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/author/aboutme" render={() => {
      return <Author><AboutMe /></Author>
    }} />
    <Route path="/author/message" render={() => {
      return <Author><Message /></Author>
    }} />
    <Route path="/author/share" render={() => {
      return <Author><h1>作者分享</h1></Author>
    }} />
    <Route path="/posts" component={Post} />
    <Route path="/learn" component={Learn} />
    <Route component={NotFound} />
  </Switch>
}

export default createRoutes
