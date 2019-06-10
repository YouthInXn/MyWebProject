import React from 'react'
import { LinearProgress } from '@material-ui/core'
/**
 * 全局进度条
 * */
const loadingStyle = {
  float: 'left',
  position:'fixed',
  top:0,
  left:0,
  zIndex: 10,
  height: '30px',
  width:'100%'
}
const hideStyle = {
  float:'left',
  zIndex:10,
  display:'none',
  width:'100%'
}

class Progress extends React.Component {
  render () {
    const { loading } = this.props
    return <div>
      <div style={loading ? loadingStyle : hideStyle}>
        <LinearProgress  />
      </div>
    </div>
  }
}

export default Progress
