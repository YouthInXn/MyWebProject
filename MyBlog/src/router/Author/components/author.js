
import React from 'react'
import './authorStyle/style.css'
import {
  Grid, Avatar, List,
  ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import projectConfig from '../../../../myBlog.config'

const styles = theme => ({
  root:{
    flewGrow:1
  },
  avatar:{
    width:100,
    height:100,
    margin:'10px auto'
  }
})


class Author extends React.Component {
  render () {
    const { classes } = this.props
    return <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid className={classes.root} item xs={4}>
          <div className='sidebar'>
            <div style={{ textAlign:'center', borderBottom:'1px solid #ccc' }}>
              <Avatar className={classes.avatar} src={projectConfig.myVatar} />
              <p>{projectConfig.des}</p>
            </div>
            <List component='nav'>
              <ListItem style={{ textAlign:'center' }} button>
                <ListItemIcon></ListItemIcon>
                <ListItemText>
                  <span style={{ color:'#fff' }}>作者信息</span></ListItemText>
              </ListItem>
              <ListItem style={{ textAlign:'center' }} button>
                <ListItemIcon></ListItemIcon>
                <ListItemText style={{ color:'#fff' }}>
                  <span style={{ color:'#fff' }}>个人分享</span>
                </ListItemText>
              </ListItem>
              <ListItem style={{ textAlign:'center' }} button>
                <ListItemIcon></ListItemIcon>
                <ListItemText style={{ color:'#fff' }}>
                  <span style={{ color:'#fff' }}>留言板</span>
                </ListItemText>
              </ListItem>
            </List>
          </div>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={6}>
        </Grid>
      </Grid>
    </div>
  }
}

export default withStyles(styles)(Author)
