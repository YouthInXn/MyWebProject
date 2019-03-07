
import React from 'react'
import { Grid } from '@material-ui/core'
import './stripe.css'
import { getRandomColor } from '../../../util/commonFunc'

class Stripe extends React.Component {
  componentDidMount () {
    setTimeout(() => {
      const stripes = document.getElementById('stripe')
      stripes.setAttribute('class', 'background')
    }, 800)
  }
  render () {
    const colors = []
    for (let i = 0; i <= Math.floor(window.innerWidth / 72) - 1; i++) {
      colors.push(`#${getRandomColor()}`)
    }
    const point = Math.floor(colors.length / 2)
    return <div id="stripe" className="backgroundHide">
      <Grid container spacing={32} direction="row" justify="center" alignItems="flex-end">
        {colors.map((c, idx) => {
          return <Grid key={idx} item>
            <div
              className="column"
              style={{
                height:`${idx > point ? (2 * point - idx) * 25 : idx * 25}px`,
                backgroundColor:c
              }}></div>
          </Grid>
        })}
      </Grid>
    </div>
  }
}

export default Stripe
