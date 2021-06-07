import React, { useState } from 'react'

const Blog = ( {blog} ) => {
  const [ visible, setVisible ] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = event => setVisible(!visible)
  

  const like = (event) => {
    console.log(event.target, 'clicked')
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
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <pre>
          {blog.title} {blog.author}
          {'\n'}{blog.url}
          {'\n'}{blog.likes}<button onClick={like}>like</button>
          {'\n'}{blog.user.name}
        </pre>
        <button onClick={toggleVisibility}>hide</button>
     
      </div>
    </div>
  )
 
}

export default Blog