import React, { Component } from 'react'
import Message from '../../../components/Message/Message'
import { Divider, Button, Grid, Tooltip, TextField } from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import _ from 'lodash'

const styles = (theme) => {
  return {
    root: {
      width:'80%',
      maxWidth:1000,
      margin:'0 auto'
    },
    divider: {
      width:'100%',
      margin:'10px 0'
    },
    editStyle: {
      fontSize:18,
      margin:theme.spacing.unit
    },
    messageInput : {
      width:'70%',
      margin:'10px auto 0px auto',
    },
    textContainerShow: {
      transition:'height 0.8s',
      width:'90%',
      height:'160px',
      textAlign: 'center',
      margin:'0 auto',
      overflow:'hidden'
    },
    textContainerHide: {
      transition:'height 0.8s',
      width:'90%',
      height:0,
      textAlign: 'center',
      margin:'0 auto',
      overflow:'hidden'
    },
    noData: {
      margin:'30px auto',
      textAlign:'center',
      color:'#ccc',
      fontSize: 20,
    }
  }
}

class MessageList extends Component {
  state = {
    showEdit:false,
    value:''
  }
  componentDidMount () {
    this.props.getAllMessage()
  }
  componentWillReceiveProps (nextProps, nextState) {
    if (!_.isEqual(nextProps.msgs, this.props.msgs)) {
      this.setState({ value:'' })
    }
  }
  render () {
    const { classes, msgs, user } = this.props
    const { showEdit, value } = this.state
    return <div className={classes.root}>
      <h2>留言板</h2>
      <Grid container>
        <Grid item xs={6}>
          <h3>共有{msgs.length}条留言</h3>
        </Grid>
        <Grid item xs={6} style={{ textAlign:'right' }}>
          <Tooltip title="打个招呼吧" placement="top">
            <Button onClick={this.handleEdit} className={classes.editStyle} size="large" color="primary" ><Edit/>&nbsp;写留言</Button>
          </Tooltip>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <div className={showEdit ? classes.textContainerShow : classes.textContainerHide}>
        <TextField
          placeholder="说点什么..."
          className={classes.messageInput}
          rows="3"
          rowsMax="5"
          label="Message.."
          variant="outlined"
          margin="normal"
          value={value}
          onChange={this.handleInput}
          multiline
        />
        <p>
          <Button
            variant="contained"
            color="primary"
            onClick={this.commitMessage}
          >提交留言</Button>
          <Button onClick={this.hideEdit} style={{ marginLeft:'10px', color:'#ccc' }}>收起</Button>
        </p>
      </div>
      {msgs.length
        ? msgs.map(mId => {
          return <Message
            loginUserId={user.hasOwnProperty('_id') ? user._id : null}
            key={mId}
            mId={mId}
            likeMsg={() => this.likeMsg(mId)}
          />
        })
        : <div className={classes.noData}>暂无留言</div>}
    </div>
  }
  // 显示编辑
  handleEdit = () => {
    if (this.didNotLogin()) { return }
    this.setState({ showEdit:true })
  }
  // 处理输入
  handleInput = (e) => {
    this.setState({ value:e.target.value })
  }
  // 隐藏编辑
  hideEdit = () => {
    this.setState({ showEdit:false })
  }
  // 提交留言
  commitMessage = () => {
    if (this.didNotLogin()) { return }
    const { user } = this.props
    const param = { content:this.state.value, user:user._id }
    this.props.addNewMessage(param)
  }
  // 点赞留言
  likeMsg = (msgId) => {
    if (this.didNotLogin()) { return }
    const { user } = this.props
    this.props.likeMessage(msgId, user._id)
  }
  // 判断是否登录
  didNotLogin = () => {
    if (JSON.stringify(this.props.user) === '{}') {
      this.props.showLoginPop()
      return true
    }
    return false
  }
}

export default withStyles(styles)(MessageList)



