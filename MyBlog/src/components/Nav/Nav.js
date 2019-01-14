import React from 'react'
import {
  Menu, Home,
  ImportContacts,LibraryBooks
} from '@material-ui/icons'
import {
  Grow,Fab,MenuList,
  MenuItem,Popper,ClickAwayListener,
  Paper,ListItemIcon,ListItemText,
  ListItemAvatar,Avatar
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import projectConfig from '../../../myBlog.config'
import { Link } from 'react-router-dom'
/* 类似IndexRoute,不受路由改变影响，一直显示 */

const navStyle = {
  position:'absolute',
  top:'20px',
  left:'60px'
}
// const linkStyle = {
//   textDecoration:'none'
// }

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  avatar:{
    width:27,
    height:27,
    marginRight: 15
  }
})

class Nav extends React.Component {
  state = {
    open:false
  }
  render () {
    /* 导航使用一个按钮，下拉菜单 0.首页 1.博文 2.前端教程 3.生活动态 */
    const { classes } = this.props
    const { open } = this.state
    return (
      <div style={navStyle}>
        <Fab
          onClick={this.handleMenuToggle}
          color="primary"
          buttonRef={node => this.anchorEl = node}
        >
          <Menu />
        </Fab>
        <Popper
          open={open}
          anchorEl={this.anchorEl}
          transition
          disablePortal
        >
          { ({ TransitionProps, placement }) => {
            return <Grow
              {...TransitionProps}
              style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleMenuClose}>
                  <MenuList>
                    <Link to="/">
                      <MenuItem onClick={this.handleMenuClose}>
                        <ListItemIcon><Home /></ListItemIcon>
                        <ListItemText inset primary="首页"/>
                      </MenuItem>
                    </Link>
                    <Link to="/posts">
                      <MenuItem onClick={this.handleMenuClose}>
                        <ListItemIcon><LibraryBooks /></ListItemIcon>
                        <ListItemText inset primary="帖子"/>
                      </MenuItem>
                    </Link>
                    <Link to="learn">
                      <MenuItem onClick={this.handleMenuClose}>
                        <ListItemIcon><ImportContacts /></ListItemIcon>
                        <ListItemText inset primary="教程"/>
                      </MenuItem>
                    </Link>
                    <Link to="author">
                      <MenuItem onClick={this.handleMenuClose}>
                        <ListItemAvatar>
                          <Avatar src={projectConfig.myVatar} className={classes.avatar} />
                        </ListItemAvatar>
                        <ListItemText inset primary="作者"/>
                      </MenuItem>
                    </Link>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          }}
        </Popper>
      </div>
    )
  }
  handleMenuToggle = () => {
    this.setState({ open:!this.state.open })
  }
  handleMenuClose = (e) => {
    if (this.anchorEl.contains(e.target)) { return }
    this.setState({ open:false })
  }
}
export default withStyles(styles)(Nav)
