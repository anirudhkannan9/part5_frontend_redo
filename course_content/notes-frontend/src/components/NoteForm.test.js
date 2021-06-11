import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from './NoteForm'

test('<NoteForm /> updates parent state and calls onSubmit', () => {
    const createNote = jest.fn()

    const component = render(
        <NoteForm createNote={createNote} />
    )

    const input = component.container.querySelector('input')
    const form = component.container.querySelector('form')

    //We can simulate writing to input fields by creating a change event to them, and defining an object, which contains the text 'written' to the field.
    fireEvent.change(input, {
        target: { value: 'testing of forms could be easier' }
    })
    //The form is sent by simulating the submit event to the form.
    fireEvent.submit(form)

    //ensures that submitting the form calls the createNote method
    expect(createNote.mock.calls).toHaveLength(1)
    //checks that the event handler is called with the right params (note w correct content is created when the form is filled)
    expect(createNote.mock.calls[0][0].content).toBe('testing of forms could be easier')
})