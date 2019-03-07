/**
 * 单个留言组件
 * 约定单个留言的数据结构
 * {
 *     _id:23214j24hjgh3h43,
 *     user:{ ...user } // 发表的用户的信息
 *     time: 1232432434232, // 发表时间
 *     content:'',  // 留言的内容
 *     likesCount:12, // 留言获得的喜欢
 *     likesUser:[ ... ] // 点击喜欢的用户列表
 *     comments:{     // 留言的评论
 *         data: [
 *              // 每一条评论的结构
 *             {
 *                 id:asd1232sdfds21sdsa,
 *                 user:{ ...user },      // 发表评论的用户信息
 *                 time:12321423432,      // 评论发表的时间
 *                 content:'',            // 评论的内容
 *                 atUser: { ...user },   // 评论艾特的用户
 *             },
 *             ...
 *         ],
 *         total:20  // 总共评论数
 *     }
 * }
 * */
import React, { Component } from 'react'
import {
  Card, CardHeader, Avatar, CardContent,
  Typography, CardActions, Button, Collapse,
  Divider, TextField, Grid
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { FavoriteBorder, ChatBubbleOutline, Favorite } from '@material-ui/icons'
import Comment from '../Comment/Comment'
import { Link } from 'react-router-dom'
import { getLocalTime } from '../../../util/commonFunc'
import _ from 'lodash'

const styles = (theme) => ({
  likes: {
    marginLeft:'auto'
  },
  message: {
    margin:theme.spacing.unit * 2
  },
  hasLiked : {
    color:'#F50057'
  },
  collapse: {
    textAlign:'center'
  },
  commentArea: {
    width:'90%',
    margin:'20px auto 10px auto'
  },
  textField: {
    width:'80%',
    margin:'0 auto'
  }
})

class Message extends Component{
  state = {
    commentVisible:false,
    value:'',
    noValue: false,
    showReply:''
  }
  componentWillReceiveProps (nextProps, nextState) {
    if (!_.isEqual(nextProps.message, this.props.message)) {
      this.setState({ value:'' })
    }
  }
  render () {
    const { user, time, content, comments, likesUsers} = this.props.message
    const { classes, likeMsg, loginUserId } = this.props
    if (comments && comments.length) {
      comments.sort((a, b) => b.time - a.time)
    }
    const userLink = `/users/${user._id}`
    return <div className={classes.message}>
      <Card>
        <CardHeader
          avatar={<Avatar className={classes.avatar} >{user.name.trim().substr(0, 1).toUpperCase()}</Avatar>}
          // action={<Fab>{comments.total}回复</Fab>}
          title={<Link to={userLink}>{user.name}</Link>}
          subheader={getLocalTime(time)}
        />
        <CardContent>
          <Typography component="p">{content}</Typography>
        </CardContent>
        <CardActions>
          <Button className={classes.likes} onClick={likeMsg}>
            {likesUsers.includes(loginUserId) ? <Favorite className={classes.hasLiked}/> : <FavoriteBorder/>}
            &nbsp;{likesUsers.length}</Button>
          <Button onClick={this.showComment}>
            <ChatBubbleOutline/>
            &nbsp;{comments.length}
          </Button>
        </CardActions>
        <Collapse className={classes.collapse} in={this.state.commentVisible} timeout="auto">
          <div>
            <Divider/>
            <div className={classes.commentArea}>
              <TextField
                value={this.state.value}
                error={this.state.noValue}
                id="standard-textarea"
                label="写下你的评论.."
                multiline
                className={classes.textField}
                margin="normal"
                onChange={this.inputChange}
                variant="outlined"
              />
              <p>
                <Button onClick={this.beforeCommitComment} variant="outlined" color="primary">提交</Button>
              </p>
              {comments && comments.length ? comments.map(c => {
                return <Comment
                  handleReply={this.handleReply}
                  showReply={this.state.showReply}
                  key={c._id}
                  comment={c}
                  // commitReply={this.props.commitReply}
                />
              }) : null}
            </div>
          </div>
        </Collapse>
      </Card>
    </div>
  }
  // 处理输入框变化
  inputChange = (e) => {
    this.setState({ value:e.target.value })
  }
  // 点击回复按钮
  handleReply = (commentId) => {
    this.setState({ showReply:commentId })
  }
  // 点击提交评论
  beforeCommitComment = () => {
    if (!this.state.value.trim()) {
      this.setState({ noValue:true })
      return
    }
    // 参数组织
    const { message } = this.props
    const param = { messageId:message._id, content:this.state.value }
    this.props.commitComment(param)
  }
  // 显示评论列表
  showComment = () => {
    this.setState({ commentVisible:!this.state.commentVisible })
  }
}

export default withStyles(styles)(Message)
