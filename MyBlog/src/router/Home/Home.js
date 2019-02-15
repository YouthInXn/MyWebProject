import React from 'react'
import './home.css'
import Footer from '../../components/Footer/Footer'
import Stripe from '../../components/Stripe/Stripe'

export default class Home extends React.Component {
  componentDidMount () {
    setTimeout(() => {
      const title = document.getElementById('Welcome')
      title.setAttribute('class', 'show')
    }, 500)
  }
  render () {
    return <div>
      <Stripe />
      <div id="Welcome" className='hide'>
        <div className="title"><h1>Welcome To My Life!</h1></div>
      </div>
      <Footer />
    </div>
  }
}
