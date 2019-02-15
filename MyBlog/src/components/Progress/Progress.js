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
  state = {
    messageOpen:false
  }
  componentWillReceiveProps (nextProps, nextState) {
    if (nextProps.message && nextProps.message !== this.props.message) {
      this.setState({ messageOpen:true })
    }
  }
  render () {
    return <div>
      <div style={this.props.loading ? loadingStyle : hideStyle}>
        <LinearProgress  />
      </div>
      <Snackbar
        open={this.state.messageOpen}
        onClose={this.handleClose}
        autoHideDuration={2000}
        message={<span>{this.props.message}</span>}
        anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
        action={[
          <IconButton color="secondary" key="close" aria-label="Close" onClick={this.handleClose}>
            <CloseIcon/>
          </IconButton>
        ]}
      />
    </div>
  }
  handleClose = () => {
    this.setState({ messageOpen:false })
  }
}

export default Progress
