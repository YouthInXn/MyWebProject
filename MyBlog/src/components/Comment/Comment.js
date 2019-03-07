/**
 * 单个评论的组件
 * */
import { TextField, Grid, Avatar, Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { getLocalTime } from '../../../util/commonFunc'
import { withStyles } from '@material-ui/core/styles'

const style = (theme) => ({
  avatar: {
    margin:theme.spacing.unit * 2
  },
  time: {
    color:'#757575',
    fontSize:12,
    margin:'5px 0'
  },
  user: {
    margin:theme.spacing.unit * 2
  },
  gridUser: {
    fontSize: 12
  },
  content: {
    margin:'0 20px',
    fontSize:14,
    textAlign: 'left'
  },
  reply: {
    margin:'auto'
  },
  replyArea: {
    backgroundColor:'#F1F3F4'
  },
  replyInput: {
    width:'80%',
    margin:'15px auto'
  }
})

class Comment extends React.Component {
  state = {
    value:''
  }
  render () {
    const { comment, classes, handleReply, showReply } = this.props
    const { name, _id } = comment.commenter
    const { replies } = comment
    const userLink = `/users/${comment.userId}`
    return <div style={{ paddingBottom:'20px' }}>
      <Grid container spacing={8}>
        <Grid item xs={1}>
          <Avatar className={classes.avatar}>{name.trim().substr(0, 1).toUpperCase()}</Avatar>
        </Grid>
        <Grid item xs={9} style={{ textAlign:'left' }} className={classes.gridUser}>
          <div className={classes.user}>
            <Link to={userLink}>{name}</Link>
            &nbsp;评论:
            <p className={classes.time}>{getLocalTime(comment.time || Date.now())}</p>
          </div>
        </Grid>
        <Grid item xs={2} className={classes.reply}>
          <Button onClick={() => handleReply(_id)} color="primary">回复</Button>
        </Grid>
      </Grid>
      <div className={classes.content}>{comment.content}</div>
      {
        showReply === _id
          ? <div>
            <div className={classes.replyArea}>
              <div>{replies.map(r => <span>{r.content}</span>)}</div>
            </div>
            <TextField
              value={this.state.value}
              className={classes.replyInput}
              placeholder="写下您的回复,按下Enter提交"
              onChange={this.replyInputChange}
              inputProps={{
                onKeyDown:(e) => this.handleKeyDown(e)
              }}
            />
          </div>
          : null}
    </div>
  }
  replyInputChange = (e) => {
    this.setState({ value:e.target.value })
  }
  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      // 组织参数
      // this.props.commitReply({  })
    }
  }
}

export default withStyles(style)(Comment)
