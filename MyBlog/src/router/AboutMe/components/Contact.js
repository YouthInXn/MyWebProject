import React from 'react'
import { Divider, Fab, Grid, TextField, Tooltip } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { AccountCircleOutlined, Forum, MailOutline } from '@material-ui/icons'
import SendButton from './SendButton'
import { scrollToSlowly } from '../../../../util/commonFunc'

const gridContainer = { width:'470px', margin:'0px auto' }

const style = () => {
  return {
    contact: {
      width:'200px',
      margin:'50px 50px 50px 150px'
    },
    labelStyle: {
      height:40,
      width:40,
    },
    InputStyle: {
      width:350,
      margin:'20px 0px 20px 20px'
    },
  }
}

class Contact extends React.Component {
  state = {
    name:'',
    email:'',
    desc:'',
    error:[],
    loading: false,
    type:'',
    tipVisible:false
  }
  componentDidMount () {
    let { user } = this.props
    let isLogin = JSON.stringify(user) !== '{}'
    isLogin && this.setState({ name: user.name || '', email: user.email || '' })
  }
  componentWillReceiveProps (nextProps, nextState) {
    const { contact, user } = nextProps
    let isLogin = JSON.stringify(user) !== '{}'
    let { isSuccess } = contact
    if (isLogin) {
      this.setState({ name:user.name || this.state.name, email:user.email || this.state.email })
    }
    if (contact.message) {
      this.setState({ type:(isSuccess ? 'success' : 'failed'), tipVisible:true, loading:false })
      window.contactTimerId && clearTimeout(window.contactTimerId)
      window.contactTimerId = setTimeout(() => {
        this.setState({ name:'', email:'', desc:'', tipVisible:false, type:'' })
      }, 10000)
    }
  }
  render () {
    const { classes, contact } = this.props
    const { name, email, desc, error, loading, type, tipVisible } = this.state
    return <div>
      <div style={{ width:'100%', textAlign:'center' }}>
        <Tooltip title="联系作者" placement="bottom">
          <Fab onClick={this.handleContact} variant="extended" color='secondary' aria-label="Contact" className={classes.contact}>
            <MailOutline style={{ marginRight:'10px' }} />
            Contact
          </Fab>
        </Tooltip>
      </div>
      <Divider style={{ width:'100%' }} variant="fullWidth"/>
      <div id="contact" className="contactHide">
        <Grid container style={gridContainer} spacing={8} alignItems="flex-end">
          <Grid item><AccountCircleOutlined className={classes.labelStyle}/></Grid>
          <Grid>
            <TextField
              value={name}
              error={error.indexOf('name') >= 0}
              onChange={(e) => this.handleContactChange('name', e)}
              className={classes.InputStyle}
              label="昵称"/>
          </Grid>
        </Grid>
        <Grid style={gridContainer} container spacing={8} alignItems="flex-end">
          <Grid item><MailOutline className={classes.labelStyle} /></Grid>
          <Grid item>
            <TextField
              value={email}
              error={error.indexOf('email') >= 0}
              onChange={(e) => this.handleContactChange('email', e)}
              className={classes.InputStyle}
              label="邮箱"/>
          </Grid>
        </Grid>
        <Grid style={gridContainer} container spacing={8} alignItems="flex-end">
          <Grid item><Forum className={classes.labelStyle}/></Grid>
          <Grid item>
            <TextField
              value={desc}
              error={error.indexOf('desc') >= 0}
              onChange={(e) => this.handleContactChange('desc', e)}
              className={classes.InputStyle}
              id="outlined-multiline-static"
              label="说点什么..."
              multiline
              rows="4"
              margin="normal"
            />
          </Grid>
        </Grid>
        <SendButton message={contact.message} loading={loading} type={type} send={this.handleSend} tipVisible={tipVisible} />
      </div>
    </div>
  }
  handleSend = () => {
    let arr = ['name', 'email', 'desc']
    let temp = []
    arr.map(i => {
      if(!this.state[i]) {
        temp.push(i)
      }
    })
    const { name, email, desc } = this.state
    if (!temp.length) {
      this.setState({ error:temp, loading:true })
      this.props.contactAuthor({ name, email, desc })
    } else {
      this.setState({ error:temp })
    }
  }
  handleContactChange = (key, e) => {
    this.setState({ [key]:e.target.value })
  }
  handleContact = () => {
    let contact = document.getElementById('contact')
    contact.setAttribute('class', (contact.getAttribute('class') === 'contactHide' ? 'contactShow' : 'contactHide'))
    contact.getAttribute('class') !== 'contactHide' && scrollToSlowly(410)
  }
}

export default withStyles(style)(Contact)
