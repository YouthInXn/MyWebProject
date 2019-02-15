import Progress from './Progress'
import { connect } from 'react-redux'

const mapStateToProps = ({ xhr:{ loading, isSuccess, message } }) => {
  return {
    loading,
    message,
    isSuccess
  }
}

export default connect(mapStateToProps, null)(Progress)
