/*
* 给路由添加动画的高阶组件
* */
import React from 'react'
import { CSSTransition } from 'react-transition-group'
import './animation.css'

function wrapAnimation(WrappedComponent) {
  return class extends React.Component {
    render () {
      return (
        <CSSTransition
          in={this.props.match !== null}
          timeout={5000}
          className={{
            enter:'animation'
          }}
          mountOnEnter
          unmountOnExit
        >
          <WrappedComponent {...this.props} />
        </CSSTransition>
      )
    }
  }
}

export { wrapAnimation }
