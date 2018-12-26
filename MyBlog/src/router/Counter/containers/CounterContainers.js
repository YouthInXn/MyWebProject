import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { increment, decrement, reset } from '../actions'
import Counter from '../components/Counter'

const mapStateToProps = ({ counter }) => {
  return {
    counter:counter.count
  }
}

const mapDispatchToProps = (dispatch) => {
  /* 使用bindActionCreators减少样板代码，自动dispatch Actions */
  return bindActionCreators({
    increment,
    decrement,
    reset
  }, dispatch)
}
/**
 * 使用connect()生成容器组件
 * 把状态映射到组件上
 */
const CounterContainers = connect(mapStateToProps, mapDispatchToProps)(Counter)

export default CounterContainers
