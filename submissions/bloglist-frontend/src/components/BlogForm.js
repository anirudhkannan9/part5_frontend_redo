import React, { useState } from 'react'
import PropTypes from 'prop-types'

//separated form for creating a new blog into its own component
const BlogForm = ({ addBlog }) => {
    const [ title, setTitle ] = useState('')
    const [ author, setAuthor ] = useState('')
    const [ url, setUrl ] = useState('')

    const handleTitleChange = event => setTitle(event.target.value)
    const handleAuthorChange = event => setAuthor(event.target.value)
    const handleUrlChange = event => setUrl(event.target.value)

    const createBlog = (event) => {
        event.preventDefault()
        addBlog({
            title: title,
            author: author,
            url: url,
            likes: 0
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div className="formDiv">
            <form onSubmit={createBlog}>
                <div>
                    title:
                    <input
                        id='title'
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author:
                    <input
                        id='author'
                        value={author}
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url:
                    <input
                        id='url'
                        value={url}
                        onChange={handleUrlChange}
                    />
                </div>
                <button id='createBlogButton' type="submit">create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired
}

export default BlogForm