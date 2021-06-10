import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('by default, only title and author of a blog are rendered', () => {
    const blog = {
        author: 'Test author',
        id: 'blogID6abbcd',
        likes: 1,
        title: 'Test blog object for testing default render behaviour',
        url: 'link.com',
        user: {
            id: 'userID60b93e',
            name: 'Testuser',
            username: 'test'
        }
    }

    const component = render(
        <Blog blog={blog} />
    )

    const divDefaultShow = component.container.querySelector('.defaultShowContent')
    expect(divDefaultShow).toHaveTextContent(
        'Test blog object for testing default render behaviour'
    )
    expect(divDefaultShow).toHaveTextContent(
        'Test author'
    )
    expect(divDefaultShow).not.toHaveStyle('display: none')


    const divDefaultHide = component.container.querySelector('.defaultHideContent')
    expect(divDefaultHide).toHaveStyle('display: none')
})