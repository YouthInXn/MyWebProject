import ReactDOM from 'react-dom'
import React from 'react'
import {IconButton, Snackbar} from '@material-ui/core'
import { Close } from '@material-ui/icons'

class Notification extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open:false,
      message:'',
      delay:2000
    }
  }
  render () {
    const { message, open, delay } = this.state
    return <Snackbar
      open={open}
      onClose={this.closeMessage}
      autoHideDuration={delay}
      message={<span>{message}</span>}
      anchorOrigin={{ vertical:'bottom', horizontal:'right' }}
      action={[
        <IconButton color="secondary" key="close" aria-label="Close" onClick={this.closeMessage}>
          <Close />
        </IconButton>
      ]}
    />
  }
  open = (message, delay) => this.setState({ open:true, message, delay })
  closeMessage = () => this.setState({ open:false })
}

export const showMessage = ({ msg, delay }) => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const notification = ReactDOM.render(
    <Notification />,
    div
  )
  notification.open(msg, delay || 1500)
}


