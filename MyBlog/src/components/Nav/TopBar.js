import React from 'react'
import {
  IconButton, Tooltip, Dialog,
  DialogContent, DialogTitle, DialogActions,
  DialogContentText, TextField, Button,
  Slide, Avatar, Chip
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import './nav.css'
import { customAxios } from '../../xhr'
import {userUrl} from '../../urlConfig'

const buttonStyle = {
  color:'#3F51B5',
  width:'37px',
  height:'37px'
}
const logoutStyle = {
  color:'#000000',
  margin:'0px'
}
const avatarStyle = {
  color:'#fff',
  backgroundColor:'#3F51B5',
}
const dividerStyle = {
  borderTop:'0px',
  borderBottom:'0px',
  borderLeft:'0.5px solid #3F51B5',
  borderRight:'0.5px solid #3F51B5',
  position:'absolute',
  top:'50%',
  bottom:'50%',
  height:'16px',
  margin:'auto'
}
function Trans(props) {
  return <Slide direction="down" {...props} />
}

class TopBar extends React.Component {
  state = {
    hasAccount:false,
    nameError:false,
    pwdError:false,
    name:'',
    pwd:'',
    messageOpen:false,
    user:{},
    open:false
  }
  componentDidMount () {
    // 获取已登录的用户
    this.props.getLoginUser()
  }
  componentWillReceiveProps (nextProps, nextState) {
    if (nextProps.user !== this.props.user) {
      this.setState({ ...this.state, user:{ ...nextProps.user } })
    }
  }
  render () {
    const user = this.state.user
    const { showLoginPop, hideLoginPop, popShow, logout } = this.props
    return <div className="topbar">
      {/*<a target="_blank" href="https://github.com/YouthInXn/MyWebProject/tree/master/MyBlog">*/}
      {/*<Tooltip title="源码">*/}
      {/*<IconButton style={{ margin:'10px' }}>*/}
      {/*<img style={{ width:'30px', height:'30px' }} src="/public/github.png" />*/}
      {/*</IconButton>*/}
      {/*</Tooltip>*/}
      {/*</a>*/}
      {user.hasOwnProperty('name')
        ? <div>
          <Tooltip title={user.name}>
            <Chip
              deleteIcon={
                <div style={{ marginRight:'0px' }}>
                  <div style={dividerStyle}/>
                  <Button style={logoutStyle}>登出</Button>
                </div>
              }
              onDelete={this.handleLogout}
              avatar={<Avatar style={avatarStyle}>{user.name.trim().substr(0, 1).toUpperCase()}</Avatar>}
              label={user.name}
            />
          </Tooltip>
        </div>
        : <Tooltip title="登录">
          <IconButton onClick={() => showLoginPop()}>
            <AccountCircle style={buttonStyle}/>
          </IconButton>
        </Tooltip>}
      <Dialog
        TransitionComponent={Trans}
        maxWidth="sm"
        open={popShow}
        onClose={() => hideLoginPop()}
        aria-labelledby="form-dialog-title"
      >
        {this.state.hasAccount
          ? <DialogTitle>用户登录<Button onClick={this.handleLoginChange} color="primary">注册</Button></DialogTitle>
          : <DialogTitle>用户注册<Button onClick={this.handleLoginChange} color="primary">我有账号</Button></DialogTitle>}
        <DialogContent>
          {this.state.hasAccount
            ? <DialogContentText style={{ width:'400px' }}>欢迎再次来访！</DialogContentText>
            : <DialogContentText>用户名密码仅仅用于本网站，后续可以在个人信息中继续补充。</DialogContentText>}
          <TextField
            error={this.state.nameError}
            margin="dense"
            InputProps={{
              placeholder:this.state.hasAccount ? '输入用户名' : '起个名字吧' ,
              onChange: (e) => this.handleInputChange('name', e),
              required:true,
            }}
            id="name"
            label="昵称"
            type="text"
            fullWidth
          />
          <TextField
            error={this.state.pwdError}
            margin="dense"
            InputProps={{
              placeholder:this.state.hasAccount ? '输入密码' :'密码无强度要求',
              onChange: (e) => this.handleInputChange('pwd', e),
              required:true,
              onKeyDown:(e) => {
                e.keyCode === 13 && this.handleLogin()
              }
            }}
            id="pwd"
            label="密码"
            type="password"
            fullWidth
          />
          {/*<input />*/}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => hideLoginPop()} color="default">
            等会再说
          </Button>
          <Button onClick={this.handleLogin} color="primary">
            好了
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  }
  handleLogout = () => {
    customAxios.post(`${userUrl}/logout`).then(res => {
      if (res.data.isSuccess) {
        this.props.getLoginUser()
      }
    })
  }
  handleLogin = () => {
    const { name, pwd, hasAccount } = this.state
    if (!name) {
      this.setState({ nameError:true })
      return
    } else if (!pwd) {
      this.setState({ pwdError:true })
      return
    }
    if (hasAccount) {
      this.props.login({ name:name, password:pwd })
    } else {
      this.props.register({ name:name, password:pwd })
    }
  }
  handleInputChange = (type, e) => {
    this.setState({ ...this.state, [type]:e.target.value, [`${type}Error`]:false })
  }
  handleLoginChange = () => {
    this.setState({ hasAccount:!this.state.hasAccount })
  }
}

export default TopBar
