import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { contactAuthor } from '../actions/aboutMeActions'
import AboutMe from '../components/AboutMe'

const mapStateToProps = ({ author: { aboutMe: { contact } }, currentUser: { current } }) => {
  return {
    contact,
    user:current
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    contactAuthor
  }, dispatch)
}

const aboutMeContainers = connect(mapStateToProps, mapDispatchToProps)(AboutMe)

export default aboutMeContainers
