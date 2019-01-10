import React from 'react'
import Menu from '@material-ui/icons/Menu'
import Home from '@material-ui/icons/Home'
import ImportContacts from '@material-ui/icons/ImportContacts'
import LibraryBooks from '@material-ui/icons/LibraryBooks'
import { withStyles } from '@material-ui/core/styles'
import projectConfig from '../../../myBlog.config'

import Grow from '@material-ui/core/Grow'
import Fab from '@material-ui/core/Fab'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Popper from '@material-ui/core/Popper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Paper from '@material-ui/core/Paper'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
/* 类似IndexRoute,不受路由改变影响，一直显示 */

const navStyle = {
  position:'absolute',
  top:'20px',
  left:'60px'
}

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
  avatar:{
    width:25,
    height:25,
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
                    <MenuItem>
                      <ListItemIcon><Home /></ListItemIcon>
                      <ListItemText inset primary="首页"/>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon><LibraryBooks /></ListItemIcon>
                      <ListItemText inset primary="帖子"/>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon><ImportContacts /></ListItemIcon>
                      <ListItemText inset primary="教程"/>
                    </MenuItem>
                    <MenuItem>
                      <ListItemAvatar>
                        <Avatar src={projectConfig.myVatar} className={classes.avatar} />
                      </ListItemAvatar>
                      <ListItemText inset primary="作者"/>
                    </MenuItem>
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
