import React from 'react'

export default class Counter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      counter:0
    }
  }
  render () {
    return <div>
      <h2>当前计数：{this.state.counter}</h2>
      <button onClick={() => this.increment()}>增加</button>
      <button onClick={() => this.decrement()}>减少</button>
      <button onClick={() => this.reset()}>重置</button>
    </div>
  }
  increment () {
    console.log('++')
  }
  decrement () {
    console.log('--')
  }
  reset () {
    console.log('00')
  }
}
