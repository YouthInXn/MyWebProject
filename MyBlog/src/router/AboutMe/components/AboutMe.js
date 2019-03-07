import React from 'react'
import MyInfo from './MyInfo'
import Contact from './Contact'


class AboutMe extends React.Component{
  render () {
    const { contact, contactAuthor, user } = this.props
    return <div>
      <MyInfo />
      <Contact user={user} contact={contact} contactAuthor={contactAuthor} />
    </div>
  }
}

export default AboutMe
