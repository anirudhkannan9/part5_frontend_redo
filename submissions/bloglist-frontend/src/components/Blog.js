import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ( { blog } ) => {
  const [ visible, setVisible ] = useState(false)
  const [ localBlog, setLocalBlog ] = useState(blog)

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = event => setVisible(!visible)
  
  const like = async blog  => {
    const oldBlog = localBlog
    const likedBlog = {...localBlog, likes: oldBlog.likes + 1}
    const likedBlogReturned = await blogService.update(likedBlog.id, likedBlog)
    //console.log('RETURNED', likedBlogReturned)
    setLocalBlog(likedBlogReturned)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {localBlog.title} {localBlog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <pre>
          {localBlog.title} {localBlog.author}
          {'\n'}{localBlog.url}
          {'\n'}likes: {localBlog.likes}<button onClick={() => like(blog)}>like</button>
          {'\n'}{blog.user.name}
        </pre>
        <button onClick={toggleVisibility}>hide</button>
     
      </div>
    </div>
  )
 
}

export default Blog