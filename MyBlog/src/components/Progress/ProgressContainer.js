import Progress from './Progress'
import { connect } from 'react-redux'
import { NOTICE_MESSAGE_CLOSE } from '../../components/Progress/constants'


const mapStateToProps = ({ progress:{ loading, message, open } }) => {
  return {
    loading,
    message,
    open
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    closeMessage: () => dispatch({ type:NOTICE_MESSAGE_CLOSE })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Progress)
