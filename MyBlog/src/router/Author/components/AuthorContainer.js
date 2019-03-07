import React from 'react'
import Author from './Author'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAuthorInfo, likesAuthor } from '../authorActionCreators'

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAuthorInfo,
    likesAuthor
  },dispatch)
}

const mapStateToProps = ({ author: { aboutMe: { author } } }) => {
  return {
    author
  }
}

const AuthorContainer = connect(mapStateToProps, mapDispatchToProps)(Author)

export default AuthorContainer
