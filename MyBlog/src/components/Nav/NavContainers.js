import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, register, getLoginUser } from '../../redux/user'
import Nav from './Nav'

const mapStateToProps = ({ user }) => {
  return {
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login,
    register,
    getLoginUser
  }, dispatch)
}


const NavContainers = connect(mapStateToProps, mapDispatchToProps)(Nav)

export default NavContainers

