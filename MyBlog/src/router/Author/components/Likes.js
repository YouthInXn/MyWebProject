import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { FavoriteBorder } from '@material-ui/icons'

const style = () => {
  return {
    likes: {
      float:'right',
      position: 'relative',
      top:-110,
      right:10
    },
    fans: {
      color:'#CCCCCC'
    }
  }
}

class Likes extends React.Component {
  render () {
    const { classes } = this.props
    return <div className={classes.likes}>
      <Button variant="contained" color="secondary" onClick={this.props.likesAuthor}>
        <FavoriteBorder/>&nbsp;
        <span className={classes.fans}>{this.props.likes.length}</span>
      </Button>
    </div>
  }
}

export default withStyles(style)(Likes)
