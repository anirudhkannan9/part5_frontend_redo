import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import SuccessNotification from './components/SuccessNotification'
import ErrorNotification from './components/ErrorNotification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [ user, setUser ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setSuccessMessage('')
        }, 5000)
      })
  }

  const handleLogin = async ( loginObject ) => {
    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem(
        'loggedBloglistAppUser', JSON.stringify(user)

      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      console.log('error logging in lol')
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  const loginForm = () => (
    <Togglable buttonLabel={"log in"}>
      <LoginForm handleLogin={handleLogin}/>
    </Togglable>
  )

  const addBlogForm = () => (
    <Togglable buttonLabel={"create new blog"} ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <ErrorNotification message={errorMessage}/>
        <h2>blogs</h2>
        {loginForm()}
      </div>
    )
  } else {
    return (
      <div>
        <SuccessNotification message={successMessage}/>
        <h2>blogs</h2>
        <div>
          <p>{user.name} logged in </p> <button onClick={handleLogout}>logout</button>
        </div>
        <div> {addBlogForm()} </div>
        <br></br>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App