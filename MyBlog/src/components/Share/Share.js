import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { getLocalTime } from '../../../util/commonFunc'
import { connect } from 'react-redux'

const styles = (theme) => ({
  root: {
    padding:theme.spacing.unit * 2,
    marginLeft:50
  },
  content: {},
  timeTitle:{

  }
})

class Share extends React.Component {
  constructor (props) {
    super(props)
    this.content = React.createRef()
  }
  componentDidMount () {}
  render () {
    const { data, classes, shareList } = this.props
    const share = shareList.byId[data] // 取出实体
    return <div className={classes.root}>
      <h1 className={classes.timeTitle}>{getLocalTime(share.time)}</h1>
      {/* 这个属性厉害了。。 */}
      <div dangerouslySetInnerHTML={{ __html:share.content }} />
    </div>
  }
}

const WithStylesShare = withStyles(styles)(Share)

const stateToProps = ({ shareList }) => {
  return {
    shareList
  }
}

export default connect(stateToProps, null)(WithStylesShare)
