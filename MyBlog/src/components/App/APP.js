import React from 'react'
import { Nav } from '../Nav/Nav'
import createRoutes from '../../router/router'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Nav />
        {createRoutes()}
      </div>
    )
  }
}
