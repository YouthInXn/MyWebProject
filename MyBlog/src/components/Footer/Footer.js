
import React from 'react'
import { Divider } from '@material-ui/core'

export default class Footer extends React.Component {
  render () {
    return <div className="footer">
      <Divider light />
      <p style={{ color:'#ccc' }}>Designed and developed by Fanyj.</p>
    </div>
  }
}
