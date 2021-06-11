import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> calls onSubmit correctly', () => {
    const addBlog = jest.fn()

    const component = render(
        <BlogForm addBlog={addBlog}/>
    )

    const author = component.container.querySelector('#author')
    fireEvent.change(author, {
        target: { value: 'Author for testing'}
    })
    const title = component.container.querySelector('#title')
    fireEvent.change(title, {
        target: { value: 'Testing that BlogForm calls onSubmit with the right details when a new blog is created' }
    })
    const url = component.container.querySelector('#url')
    fireEvent.change(url, {
        target: { value: 'testlink.com' }
    })

    const form = component.container.querySelector('form')
    fireEvent.submit(form)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].author).toBe(
        'Author for testing'
    )
    expect(addBlog.mock.calls[0][0].title).toBe(
        'Testing that BlogForm calls onSubmit with the right details when a new blog is created'
    )
    expect(addBlog.mock.calls[0][0].url).toBe(
        'testlink.com'
    )
})