import React, { useState } from 'react'

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
        <form onSubmit={createBlog}>
            <div>
                title: 
                <input 
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>
            <div>
                author: 
                <input 
                    value={author}
                    onChange={handleAuthorChange}
                />
            </div>
            <div>
                url:
                <input 
                    value={url}
                    onChange={handleUrlChange}
                /> 
            </div>
            <button type="submit">create</button>

        </form>
    )
}

export default BlogForm