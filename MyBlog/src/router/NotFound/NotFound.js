import React from 'react'
import { Link } from 'react-router-dom'

export default class NotFound extends React.Component {
  render () {
    return <div style={{ width:'100%', textAlign:'center' }}>
      <div style={{ margin:'150px auto auto auto' }}>
        <img style={{ width:'150px', height:'150px' }} src="/public/404.png" />
        <p style={{ color:'#ccc' }}>前人未至之地...</p>
        <p><Link to="/">返回首页</Link></p>
      </div>
    </div>
  }
}
