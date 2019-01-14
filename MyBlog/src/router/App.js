import React from 'react'
import Nav from '../components/Nav/Nav'
import createRoutes from './router'
import Footer from '../components/Footer/Footer'
import '../styles/global.css'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Nav />
        {createRoutes()}
        <Footer />
      </div>
    )
  }
}
