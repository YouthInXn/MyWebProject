import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Message from '../components/MessageList'
import { getAllMessage, addNewMessage, likeMessage, commitComment, replyComment } from '../actions/messageActions'
import { showLoginPop } from '../../../redux/user'

const mapStateToProps = ({ author: { message: { msgs } }, user: { current } }) => {
  return {
    msgs,
    user:current
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAllMessage,
    addNewMessage,
    likeMessage,
    showLoginPop,
    commitComment,
    replyComment
  }, dispatch)
}

const MessageListContainer = connect(mapStateToProps, mapDispatchToProps)(Message)

export default MessageListContainer
