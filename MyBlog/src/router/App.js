import React from 'react'
import NavContainers from '../components/Nav/NavContainers'
import createRoutes from './router'
import '../styles/global.css'
import ProgressContainer from '../components/Progress/ProgressContainer'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <ProgressContainer />
        <NavContainers />
        {createRoutes()}
      </div>
    )
  }
}
