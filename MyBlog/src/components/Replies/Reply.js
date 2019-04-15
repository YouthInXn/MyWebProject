import React from 'react'
import { Avatar, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { getLocalTime } from '../../../util/commonFunc'
/**
 * 单个回复组件
 * */
const style = (theme) => ({
  avatar:{
    margin:theme.spacing.unit * 2
  },
  time: {
    color:'#757575',
    fontSize:12,
    margin:'5px 0'
  },
  user: {
    margin:'10px 0 5px 10px'
  },
  gridUser: {
    fontSize: 12
  },
  content: {
    margin:'0 10px',
    fontSize:14,
    textAlign: 'left'
  },
})
class Reply extends React.Component {
  render () {
    const { user, data, classes } = this.props
    const userLink = `/users/${user._id}`
    return <div>
      <Grid container spacing={8}>
        <Grid item xs={1}>
          <Avatar className={classes.avatar}>{user.name.trim().substr(0, 1).toUpperCase()}</Avatar>
        </Grid>
        <Grid item xs={11} style={{ textAlign:'left' }} className={classes.gridUser}>
          <div className={classes.user}>
            <Link to={userLink}>{user.name}</Link>
            &nbsp;
            <span className={classes.time}>{getLocalTime(data.time || Date.now())}</span>：
          </div>
          <div className={classes.content}>{data.content}</div>
        </Grid>
      </Grid>
    </div>
  }
}

export default withStyles(style)(Reply)
