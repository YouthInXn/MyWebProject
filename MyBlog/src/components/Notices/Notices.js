import { IconButton, Snackbar } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React from 'react'
import { connect } from 'react-redux'
import { NOTICE_MESSAGE_CLOSE } from '../Progress/constants'
/**
 * 全局消息提示组件
 * */

class Notices extends React.Component {
  render () {
    const { closeMessage, message, open } = this.props
    return <Snackbar
      open={open}
      onClose={closeMessage}
      autoHideDuration={2000}
      message={<span>{message}</span>}
      anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
      action={[
        <IconButton color="secondary" key="close" aria-label="Close" onClick={closeMessage}>
          <Close />
        </IconButton>
      ]}
    />
  }
}

const stateToProps = ({ progress: { message, open } }) => ({ message, open })

const dispatchToProps = (dispatch) => {
  return {
    closeMessage: () => dispatch({ type:NOTICE_MESSAGE_CLOSE }),
  }
}
export default connect(stateToProps, dispatchToProps)(Notices)

