import React from 'react'
import './home.css'

export default class Home extends React.Component {
  componentDidMount () {
    setTimeout(() => {
      const title = document.getElementById('Welcome')
      title.setAttribute('class', 'show')
    }, 500)
  }
  render () {
    return <div id="Welcome" className='hide'>
      <div className="title"><h1>Welcome To My Life!</h1></div>
    </div>
  }
}
