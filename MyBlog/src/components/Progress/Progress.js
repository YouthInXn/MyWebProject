import React from 'react'
import { LinearProgress, Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
/**
 * 全局进度条+消息条组件
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
    const { message, loading, open, closeMessage } = this.props
    return <div>
      <div style={loading ? loadingStyle : hideStyle}>
        <LinearProgress  />
      </div>
      <Snackbar
        open={open}
        onClose={closeMessage}
        autoHideDuration={2000}
        message={<span>{message}</span>}
        anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
        action={[
          <IconButton color="secondary" key="close" aria-label="Close" onClick={closeMessage}>
            <CloseIcon/>
          </IconButton>
        ]}
      />
    </div>
  }
}

export default Progress
