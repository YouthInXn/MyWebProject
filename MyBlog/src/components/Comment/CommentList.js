import React from 'react'
import Comment from './Comment'
import { Button, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { commitComment } from './commentActions'
import { connect } from 'react-redux'
import { showLoginPop } from '../../redux/globalUser'
// 单个Message中引用一个CommentList 在这里维护多个Comment之间的显示回复框的状态

const style = () => {
  return {
    textField: {
      width:'80%',
      marginRight:'10%'
    },
    commitButton : {
      position:'absolute',
      bottom:0,
      right:17
    },
    commentForm: { position:'relative', width:'80%', margin:'0 auto' }
  }
}

class CommentList extends React.Component {
  state = {
    expandId:'',
    value:'',
    noValue:false
  }
  componentWillReceiveProps (nextProps, nextState) {
    if (nextProps.comments.allIds !== this.props.comments.allIds) {
      this.setState({ value:'' })
    }
  }
  render () {
    // 所有的评论
    const { data, classes, userList, comments } = this.props
    let orderByTimeList = data.sort((a, b) => {
      return comments.byId[b].time - comments.byId[a].time
    })
    return <div>
      <div className={classes.commentForm}>
        <TextField
          value={this.state.value}
          error={this.state.noValue}
          id="standard-textarea"
          label="写下你的评论.."
          multiline
          rowsMax={3}
          className={classes.textField}
          onChange={this.inputChange}
        />
        <Button
          className={classes.commitButton}
          onClick={this.beforeCommitComment}
          variant="outlined"
          color="primary"
        >评论</Button>
      </div>
      {orderByTimeList.length ? orderByTimeList.map(d => {
        const comment = comments.byId[d]
        const user = userList.byId[comment.commenter]
        // 传递实体数据
        return <Comment
          key={d}
          data={comment}
          user={user}
          clickReply={this.clickReply}
          expandId={this.state.expandId}
        />
      }) : null}
    </div>
  }
  clickReply = (id) => {
    this.setState({ expandId:(this.state.expandId === id ? '' : id) })
  }
  // 处理输入框变化
  inputChange = (e) => {
    this.setState({ value:e.target.value })
  }
  // 点击提交评论
  beforeCommitComment = () => {
    if (!this.state.value.trim()) {
      this.setState({ noValue:true })
      return
    }
    // 参数组织
    const { currentUser, mId } = this.props
    if (this.didNotLogin()) {
      return
    }
    const param = { messageId:mId, content:this.state.value, userId:currentUser._id }
    this.props.commitComment(param)
  }
  // 判断是否登录
  didNotLogin = () => {
    if (JSON.stringify(this.props.currentUser) === '{}') {
      this.props.showLoginPop()
      return true
    }
    return false
  }
}

const CommentListWithStyle = withStyles(style)(CommentList)

const dispatchToProps = {
  commitComment,
  showLoginPop
}
const stateToProps = ({ userList, comments, currentUser:{ current } }) => {
  return {
    userList,
    comments,
    currentUser:current
  }
}

export default connect(stateToProps, dispatchToProps)(CommentListWithStyle)
