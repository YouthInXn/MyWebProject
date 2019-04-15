import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MessageList from '../components/MessageList'
import { getAllMessage, addNewMessage, likeMessage, replyComment } from '../actions/messageActions'
import { showLoginPop } from '../../../redux/globalUser'

const mapStateToProps = (state) => {
  const { allIds } = state.msgs
  const { currentUser: { current } } = state
  return {
    msgs:allIds,
    // 当前登录的用户
    user:current,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAllMessage,
    addNewMessage,
    likeMessage,
    showLoginPop,
    replyComment
  }, dispatch)
}

const MessageListContainer = connect(mapStateToProps, mapDispatchToProps)(MessageList)

export default MessageListContainer
