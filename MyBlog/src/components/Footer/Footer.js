
import React from 'react'
import { Divider } from '@material-ui/core'

export default class Footer extends React.Component {
  render () {
    return <div className="footer">
      <Divider light />
      <p style={{ color:'#ccc' }}>YouthInXian 个人所有</p>
    </div>
  }
}
