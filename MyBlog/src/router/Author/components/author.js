import React from 'react'
import '../style.css'
import {
  Avatar, Paper, Chip, Typography, Fab, Tooltip
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import projectConfig from '../../../../myBlog.config'
import {
  AlarmOn, ChatBubbleOutline, AccountCircleOutlined, ShareOutlined
} from '@material-ui/icons'
import { Link, Route } from 'react-router-dom'
import Likes from './Likes'
// author下的公用组件
const iconStyle = { width:'27px', height:'27px' }

const styles = theme => ({
  navContainer: {
    position:'relative',
    top:30,
    right:-80,
    width:'100px',
    height:'400px',
    float: 'right'
  },
  fabButton: {
    margin: theme.spacing.unit,
  },
  currentMenu:{
    margin: theme.spacing.unit,
    backgroundColor:'#AFB1AF',
  },
  avatar:{
    width:100,
    height:100,
    position:'relative',
    left:'50px',
    top:'-50px'
  },
  paper:{
    width: '70%',
    minHeight:'900px',
    margin:'10% auto 5% auto',
    paddingBottom:'30px'
  },
  chip:{
    float:'left',
    position: 'relative',
    top:-80,
    left:180
  },
  myName: {
    userSelect:'none',
    textAlign:'left',
    position:'relative',
    top:'-40px',
    left:'-190px'
  },
})


class Author extends React.Component {
  state = {
    current:'',
    fans:[]
  }
  componentDidMount () {
    let current = window.location.pathname.split('/')[2]
    current && this.setState({ current })
    // 获取我的信息
    this.props.getAuthorInfo()
  }
  componentWillReceiveProps (nextProps, nextState) {
    if (nextProps.author) {
      this.setState({ fans:nextProps.author.fans })
    }
  }
  render () {
    const { classes, match } = this.props
    const { current, fans } = this.state
    return <div>
      <div className="sidebar"/>
      <div>
        <Paper className={classes.paper}>
          <div className={classes.navContainer}>
            <Link to="/author/aboutme">
              <Tooltip title="关于作者" placement="right">
                <Fab
                  onClick={() => this.routeChange('aboutme')}
                  className={current === 'aboutme'? classes.currentMenu :classes.fabButton}
                  color="inherit" aria-label="Add" variant="extended">
                  <AccountCircleOutlined style={iconStyle} />
                </Fab>
              </Tooltip>
            </Link>
            <Link to="/author/message">
              <Tooltip title="留言板" placement="right">
                <Fab
                  onClick={() => this.routeChange('message') }
                  className={current === 'message' ? classes.currentMenu : classes.fabButton}
                  color="inherit" aria-label="Add" variant="extended">
                  <ChatBubbleOutline style={iconStyle}/>
                </Fab>
              </Tooltip>
            </Link>
            <Link to="/author/share">
              <Tooltip title="个人分享" placement="right">
                <Fab
                  onClick={() => this.routeChange('share') }
                  className={current === 'share' ? classes.currentMenu : classes.fabButton} color="inherit" aria-label="Add" variant="extended">
                  <ShareOutlined style={iconStyle} />
                </Fab>
              </Tooltip>
            </Link>
          </div>
          <Avatar className={classes.avatar} src={projectConfig.myAvatar} />
          <div className={classes.chip}>
            <Chip color="primary" variant="outlined" label={projectConfig.des} icon={<AlarmOn/>} />
          </div>
          <div className={classes.myName}>
            <Typography component="span" variant="h5">
              樊元甲
            </Typography>
          </div>
          <Likes likesAuthor={this.props.likesAuthor} likes={fans} />
          {this.props.children}
        </Paper>
      </div>
    </div>
  }
  routeChange = (current) => {
    this.setState({ current })
  }
}

export default withStyles(styles)(Author)
