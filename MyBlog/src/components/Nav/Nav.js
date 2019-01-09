import { Link } from 'react-router-dom'
import React from 'react'

export function Nav () {
  return <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/page1">Page1</Link></li>
    <li><Link to="/counter">Counter</Link></li>
    <li><Link to="/test">Test</Link></li>
  </ul>
}
