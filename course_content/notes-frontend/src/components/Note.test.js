import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Note from './Note'

test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    const component = render(
        <Note note={note}/>
    )

    //component.debug()

    //Search for a smaller part of the component and print its HTML code
    const li = component.container.querySelector('li')
    console.log(prettyDOM(li))

    //method 1 of investigating the content of the component being tested
    expect(component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )

    //method 2
    const element = component.getByText(
        'Component testing is done with react-testing-library'
    )
    //exception if above element doesn't exist; technically we don't need the below 'expect'
    expect(element).toBeDefined()

    //method 3
                                    //receives CSS selector as param
    const div = component.container.querySelector('.note')
    expect(div).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
})

test('clicking the button calls event handler once', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    //event handler is a mock function defined w Jest
    const mockHandler = jest.fn()

    const component = render(
        <Note note={note} toggleImportance={mockHandler} />
    )

    //test finds button based on text from rendered component and clicks the element
    const button = component.getByText('make not important')
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
})