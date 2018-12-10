import React from 'react'

export default class Home extends React.Component {
  constructor () {
    super()
    this.state = { count:0 }
  }
  render () {
    return <div>
      <h1>Count: {this.state.count}</h1>
      <button onClick={() => this.handleClick()}>增加</button>
    </div>
  }
  handleClick() {
    this.setState({ count:++this.state.count })
  }
}
