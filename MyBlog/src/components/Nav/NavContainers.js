import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, register, getLoginUser, showLoginPop, hideLoginPop } from '../../redux/user'
import Nav from './Nav'

const mapStateToProps = ({ user: { current, popShow } }) => {
  return {
    user:current,
    popShow
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login,
    register,
    getLoginUser,
    showLoginPop,
    hideLoginPop
  }, dispatch)
}


const NavContainers = connect(mapStateToProps, mapDispatchToProps)(Nav)

export default NavContainers

