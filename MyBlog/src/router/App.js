import React from 'react'
import NavContainers from '../components/Nav/NavContainers'
import createRoutes from './router'
import '../styles/global.css'
import ProgressContainer from '../components/Progress/ProgressContainer'
import Footer from '../components/Footer/Footer'
import Notices from '../components/Notices/Notices'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Notices />
        <ProgressContainer />
        <NavContainers />
        <div style={{ height:'100%'}}>{createRoutes()}</div>
        {window.location.pathname === '/' ? null : <Footer />}
      </div>
    )
  }
}
