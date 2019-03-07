import React from 'react'
import { CircularProgress, Fab } from '@material-ui/core'
import { Check, Close, SendSharp } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import './style.css'

const style = () => {
  return {
    circleLoading:{
      color:'#4CAF50',
      position:'relative',
      top:-60,
      left: -5,
      zIndex:1
    }
  }
}

class SendButton extends React.Component {
  render () {
    const { classes, message, send, loading, type, tipVisible } = this.props
    return <div>
      <div className={tipVisible ? 'tipShow' : 'tipHide'}>
        <h6 style={{ margin:0 }}>{message}</h6>
      </div>
      <div style={{ width:'50px', margin:'20px auto 0px auto' }}>
        <Fab
          color={type === 'failed' ? 'secondary' : 'inherit'}
          onClick={send}
          disabled={type === 'success' || type === 'failed'}
        >
          {type === '' ? <SendSharp/> : (type ==='success' ? <Check/> : <Close/> ) }
        </Fab>
        {loading && <CircularProgress size={65} className={classes.circleLoading}/>}
      </div>
    </div>
  }
}

export default withStyles(style)(SendButton)

