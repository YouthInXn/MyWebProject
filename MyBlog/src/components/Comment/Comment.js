/**
 * 单个评论的组件
 * */
import { Grid, Avatar, Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { getLocalTime } from '../../../util/commonFunc'
import { withStyles } from '@material-ui/core/styles'
import { ReplyRounded } from '@material-ui/icons'
import ReplyList from '../Replies/ReplyList'

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
  showReply: {
    transition:'all 0.8s',
    overflowX: 'hidden',
    maxHeight:300
  },
  hideReply: {
    transition:'all 0.8s',
    height:'0px',
    overflow:'hidden'
  }
})

class Comment extends React.Component {
  state = {
    value:''
  }
  render () {
    const { data, classes, clickReply, expandId, user } = this.props
    const userLink = `/users/${data.commenter}`
    const { _id } = data
    return <div style={{ paddingBottom:'5px' }}>
      <Grid container spacing={8}>
        <Grid item xs={1}>
          <Avatar className={classes.avatar}>{user.name.trim().substr(0, 1).toUpperCase()}</Avatar>
        </Grid>
        <Grid item xs={9} style={{ textAlign:'left' }} className={classes.gridUser}>
          <div className={classes.user}>
            <Link to={userLink}>{user.name}</Link>
            &nbsp;评论:
            <p className={classes.time}>{getLocalTime(data.time || Date.now())}</p>
          </div>
        </Grid>
        <Grid item xs={2} className={classes.reply}>
          <Button
            onClick={() => clickReply(_id)}
            color="primary"
          >
            <ReplyRounded/>
            {` ${expandId === _id ? '收起' : '查看'}回复${data.replies.length ? data.replies.length : ''}`}
          </Button>
        </Grid>
      </Grid>
      <div className={classes.content}>{data.content}</div>
      <div className={expandId === _id ? classes.showReply : classes.hideReply}>
        <ReplyList commentId={_id} />
      </div>
    </div>
  }
}

export default withStyles(style)(Comment)

