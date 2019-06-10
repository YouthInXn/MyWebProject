import React from 'react'

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div>
        {/*<Card className={classes.card}>*/}
        {/*<CardMedia*/}
        {/*className={classes.cover}*/}
        {/*image={`${rootUrl}/test.jpg`}*/}
        {/*title="Live from space album cover"*/}
        {/*/>*/}
        {/*<div className={classes.details}>*/}
        {/*<CardContent className={classes.content}>*/}
        {/*<Typography variant="subtitle1" color="textSecondary">*/}
        {/*我的一个道姑朋友*/}
        {/*</Typography>*/}
        {/*</CardContent>*/}
        {/*<audio*/}
        {/*src={`${rootUrl}/music/我的一个道姑朋友.mp3`}*/}
        {/*controls*/}
        {/*>*/}
        {/*您的浏览器不支持Autio.*/}
        {/*</audio>*/}
        {/*</div>*/}
        {/*</Card>*/}
        <iframe
          frameBorder="no"
          border="0"
          marginWidth="0"
          marginHeight="0"
          width="330"
          height="86"
          src="//music.163.com/outchain/player?type=2&id=495065117&auto=0&height=66"
        >
          浏览器不支持.
        </iframe>
      </div>
    )
  }
}


export default MusicPlayer
