/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ( { blog } ) => {
  const [ visible, setVisible ] = useState(false)
  const [ localBlog, setLocalBlog ] = useState(blog)
  const [ allowDelete, setAllowDelete ] = useState(false)
  const [ likesClicked, setLikesClicked ] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showIfLoggedInUserCreatedBlog = { display: allowDelete ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    // if (blog.user.username === JSON.parse(window.localStorage.getItem('loggedBloglistAppUser')).username) {
    //   console.log('Blog user: ', blog.user.username)
    //   console.log('Logged in user: ', JSON.parse(window.localStorage.getItem('loggedBloglistAppUser')).username)
    //   setAllowDelete(true)
    // }
  }

  const like = async ()  => {
    const oldBlog = localBlog
    const likedBlog = { ...localBlog, likes: oldBlog.likes + 1 }
    const likedBlogReturned = await blogService.update(likedBlog.id, likedBlog)
    setLocalBlog(likedBlogReturned)
  }

  const deleteBlog = async blog => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
      const user = JSON.parse(window.localStorage.getItem('loggedBloglistAppUser'))
      const deleteRequest = await blogService.remove(blog.id, user.token)
      console.log(deleteRequest)
      setLocalBlog(null)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (localBlog !== null) {
    return (
      <div style={blogStyle} className='blog'>
        <div style={hideWhenVisible} className='defaultShowContent'>
          {localBlog.title} | {localBlog.author} <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible} className='defaultHideContent'>
          <pre>
            {localBlog.title} | {localBlog.author}
            {'\n'}{localBlog.url}
            {'\n'}likes: {localBlog.likes}<button className='likeButton' onClick={() => like(blog)}>like</button>
            {'\n'}{blog.user.name}
            {'\n'}<button style={showIfLoggedInUserCreatedBlog} onClick={() => deleteBlog(blog)}>remove</button>
          </pre>
          <button onClick={toggleVisibility}>hide</button>

        </div>
      </div>
    )
  } else { return (<></>)}
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog