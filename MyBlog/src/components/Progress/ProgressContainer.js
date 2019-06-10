import Progress from './Progress'
import { connect } from 'react-redux'
import { NOTICE_MESSAGE_CLOSE } from '../../components/Progress/constants'


const mapStateToProps = ({ progress:{ loading } }) => {
  return {
    loading
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    closeMessage: () => dispatch({ type:NOTICE_MESSAGE_CLOSE })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Progress)
