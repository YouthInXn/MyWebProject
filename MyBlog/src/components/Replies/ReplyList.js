import React from 'react'
import { TextField, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import Reply from './Reply'
import { showLoginPop } from '../../redux/globalUser'
import { commitReply } from './replyActions'
/**
 * 回复列表组件
 * */

const style = () => {
  return {
    replyArea: {
      marginLeft:'4%'
    },
    replyInput: { width:'80%', marginRight:'10%' },
    replyForm: {
      width:'80%',
      position:'relative',
      margin:'10px auto'
    },
    commitReplyButton: {
      position: 'absolute',
      bottom:0,
      right:17
    }
  }
}

class ReplyList extends React.Component {
  state = {
    value:'',
    error:false
  }
  componentWillReceiveProps (nextProps, nextState) {
    if (nextProps.replies.allIds.length !== this.props.replies.allIds.length) {
      this.setState({ value:'' })
    }
  }
  render () {
    const { value, error } = this.state
    const { classes, commentId, comments, userList, replies } = this.props
    const allReplyIds = comments.byId[commentId].replies
    return <div>
      <div className={classes.replyArea}>
        <div>{
          allReplyIds.length
            ? allReplyIds.map(r => {
              const replyEntities = replies.byId[r]
              const replier = userList.byId[replyEntities.replier]
              return <Reply key={r} data={replyEntities} user={replier} />
            })
            : null
        }
        </div>
      </div>
      <div className={classes.replyForm}>
        <TextField
          error={error}
          value={value}
          className={classes.replyInput}
          placeholder="写下你的回复.."
          onChange={this.replyInputChange}
        />
        <Button
          variant="outlined"
          className={classes.commitReplyButton}
          color="primary"
          onClick={this.beforeAddReply}
        >回复</Button>
      </div>
    </div>
  }
  replyInputChange = (e) => {
    this.setState({ value:e.target.value })
  }
  beforeAddReply = () => {
    let { value } = this.state
    if (!value) {
      this.setState({ error:true })
      return
    }
    if (!Object.keys(this.props.currentUser).length) {
      this.props.showLoginPop()
      return
    }
    const { commentId, currentUser } = this.props
    const params = { content:value, replier:currentUser._id, toComment: commentId }
    this.props.commitReply(params)
  }
}

const ReplyListWithStyle = withStyles(style)(ReplyList)

const stateToProps = ({ replies, userList, comments, currentUser:{ current } }) => {
  return { replies, userList, comments, currentUser:current }
}

const dispatchToProps = {
  showLoginPop,
  commitReply
}

export default connect(stateToProps, dispatchToProps)(ReplyListWithStyle)
