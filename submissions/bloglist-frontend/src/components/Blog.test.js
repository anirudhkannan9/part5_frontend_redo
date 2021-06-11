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

test('when button controlling shown details is clicked, blog url and number of likes are shown', () => {
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

    const buttonView = component.getByText('view')
    expect(buttonView).toBeDefined()
    fireEvent.click(buttonView)

    const divDefaultShow = component.container.querySelector('.defaultShowContent')
    expect(divDefaultShow).toHaveStyle('display: none')
    const divDefaultHide = component.container.querySelector('.defaultHideContent')
    expect(divDefaultHide).not.toHaveStyle('display: none')
    expect(divDefaultHide).toHaveTextContent(
        'Test author'
    )
    expect(divDefaultHide).toHaveTextContent(
        'Test blog object for testing default render behaviour'
    )
    expect(divDefaultHide).toHaveTextContent(
        'likes: 1'
    )
    expect(divDefaultHide).toHaveTextContent(
        'Testuser'
    )
})

test('when like button is clicked twice, event handler the component receives as props is called twice', () => {
    //NOTE: In order to successfully test this functionality, I had to modify the 'Blog' component to temporarily take in a handleLike function as prop
    //(this is at odds with its current setup, in which it only takes a blog object as props)
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

    const buttonView = component.getByText('view')
    fireEvent.click(buttonView)

    let divDefaultHide = component.container.querySelector('.defaultHideContent')
    expect(divDefaultHide).not.toHaveStyle('display: none')
    expect(divDefaultHide).toHaveTextContent( 'likes: 1' )
    const buttonLike = component.container.querySelector('.likeButton')
    fireEvent.click(buttonLike)
    expect(divDefaultHide).toHaveTextContent( 'Test blog object for testing default render behaviour | Test author link.com likes: 2like Testuser removehide' )
    fireEvent.click(buttonLike)

})

