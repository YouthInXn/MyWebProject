import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home/Home'
import Author from './Author/index'
import NotFound from './NotFound/index'
import Post from './Posts/index'
import Learn from './Learn/index'
import AboutMe from './AboutMe/containers/aboutMeContainers'
import Message from './MessageBoard/containers/messageContainer'
import AuthorShare from './AuthorShare'

/*
* Switch组件会从上向下依次匹配路由，放在最后的则是404
* */
const createRoutes = () => {
  return <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/author/aboutme">
      <Author><AboutMe /></Author>
    </Route>
    <Route path="/author/message">
      <Author><Message /></Author>
    </Route>
    <Route path="/author/share">
      <Author><AuthorShare/></Author>
    </Route>
    <Route path="/posts" component={Post} />
    <Route path="/learn" component={Learn} />
    <Route component={NotFound} />
  </Switch>
}

export default createRoutes
