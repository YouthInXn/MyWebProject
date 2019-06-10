import WangEditor from '../../../components/WangEditor'
import React from 'react'
import MusicPlayer from '../../../components/MusicPlayer/MusicCard'
import { Button, CircularProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { customAxios } from '../../../xhr'
import { shareUrl } from '../../../urlConfig'
import { showMessage } from '../../../components/Notices/NoticeMessage'
import Share from '../../../components/Share/Share'
import { connect } from 'react-redux'
import { getShareList, addShare } from '../actions/actions'

const styles = (theme) => ({
  root: {
    position:'relative'
  },
  toolbar:{
    float:'right',
    margin:theme.spacing.unit,
    position:'absolute',
    right:44,
  },
  progress: {
    position:'absolute',
    top:6,
    right:65
  },
  progressContainer: {
    width:'100%',
    textAlign:'center',
  }
})

class AuthorShare extends React.Component {
  state = {
    content:'',
    btnLoading:false
  }
  componentDidMount () {
    this.props.getShareList()
  }
  render () {
    const { classes, shareList, loading } = this.props
    const { btnLoading } = this.state
    return <div className={classes.root}>
      <div className={classes.toolbar}>
        {btnLoading && <CircularProgress size={20} className={classes.progress} />}
        <Button disabled={btnLoading} onClick={this.addShare} color="primary">发布{btnLoading && '中..'}</Button>
      </div>
      <WangEditor
        disabled={btnLoading}
        defaultValue="今天分享点什么呢..."
        onChange={this.handeChange}
        style={{ width:'90%', margin:'0px auto 20px auto' }}
      />
      {
        loading
          ? <div className={classes.progressContainer}>
            <CircularProgress />
            <p style={{ fontStyle:'italic', color:'#aaaaaa' }}>全力加载中..</p>
          </div>
          : shareList.allIds.map((s) => <Share key={s} data={s} />)
      }
      {/*<div>*/}
      {/*<h3>我的一个道姑朋友</h3>*/}
      {/*<MusicPlayer />*/}
      {/*</div>*/}
    </div>
  }
  handeChange = (html, text) => {
    this.setState({ content:html })
  }
  addShare = () => {
    // TODO 需改为action,修改state中的数据
    const { content } = this.state
    if (!content) {
      showMessage({ msg:'请输入内容。' })
      return
    }
    this.setState({ loading:true })
    customAxios
      .post(`${shareUrl}`, { content:this.state.content })
      .then((res) => {
        if (res.isSuccess) {
          // 获取数据,更新列表
        } else {
          showMessage({ msg:res.data.message })
        }
        this.setState({ loading:false })
      })
      .catch((e) => {
        showMessage({ msg:e.message })
      })
  }
}

const stateToProps = ({ author:{ share }, shareList }) => {
  const { loading } = share
  return {
    loading,
    shareList
  }
}

const dispatchToProps = {
  getShareList,
  addShare
}

const WrappedStyleShare = withStyles(styles)(AuthorShare)

export default connect(stateToProps, dispatchToProps)(WrappedStyleShare)
