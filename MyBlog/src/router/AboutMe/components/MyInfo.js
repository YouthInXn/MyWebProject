import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const style = () => {
  return {
    aboutMe: {
      width:'100%',
      margin:'0 auto',
      paddingLeft:'30px',
      color:'#657786'
    }
  }
}

class MyInfo extends React.Component {
  render () {
    const { classes } = this.props
    return <div>
      <div className={classes.aboutMe}>
        {/*<p>出生于：1995-8-16</p>*/}
        <p>毕业于：<a href="http://www.xatu.cn/" target="_blank">西安工业大学</a></p>
        <p>邮箱：yuanjia.fan@outlook.com</p>
        <p>目前工作于<a href="https://www.supermap.com/cn/" target="_blank">超图软件</a>，一名普通的前端工程师。</p>
      </div>
    </div>
  }
}

export default withStyles(style)(MyInfo)
