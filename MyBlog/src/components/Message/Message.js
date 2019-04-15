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
  Divider,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { FavoriteBorder, ChatBubbleOutline, Favorite } from '@material-ui/icons'
import CommentList from '../Comment/CommentList'
import { Link } from 'react-router-dom'
import { getLocalTime } from '../../../util/commonFunc'
import _ from 'lodash'
import { connect } from 'react-redux'

const styles = (theme) => ({
  likes: {
    marginLeft:'auto'
  },
  message: {
    margin:theme.spacing.unit
  },
  hasLiked : {
    color:'#F50057'
  },
  collapse: {
    textAlign:'center'
  },
  commentArea: {
    width:'95%',
    margin:'5px auto 5px auto'
  }
})

class Message extends Component{
  state = {
    commentVisible:false,
  }
  componentWillReceiveProps (nextProps, nextState) {
    if (!_.isEqual(nextProps.message, this.props.message)) {
      this.setState({ value:'' })
    }
  }
  render () {
    // mId来自于父组件， msgs, userList来自store
    const { msgs, mId, userList, classes, likeMsg, loginUserId } = this.props
    const m = msgs.byId[mId]
    const { time, content, likesUsers, comments } = m
    const user = userList.byId[m.user]
    const userLink = `/users/${user}`
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
          <Button className={classes.likes} onClick={likesUsers.includes(loginUserId) ? () => {} : likeMsg}>
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
              {/*{ 这里是一个CommentsList的容器组件, 告诉它comments的ID数组，它知道怎么渲染！ }*/}
              <CommentList mId={mId} data={comments} />
            </div>
          </div>
        </Collapse>
      </Card>
    </div>
  }
  // 显示评论列表
  showComment = () => {
    this.setState({ commentVisible:!this.state.commentVisible })
  }
}

const MessageWithStyle = withStyles(styles)(Message)

const stateToProps = ({ msgs, userList }) => { return { msgs, userList } }

export default connect(stateToProps, null)(MessageWithStyle)
