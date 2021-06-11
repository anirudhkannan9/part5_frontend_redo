import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

//The function that creates the component is wrapped inside of a forwardRef function call. This way the component can access the ref that is assigned to it.
const Togglable = React.forwardRef((props, ref) => {
    const [ visible, setVisible ] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => setVisible(!visible)

    //hook to make its toggleVisibility function available outside of the component.
    useImperativeHandle(ref, () => {
        return {
          toggleVisibility
        }
      })
    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible} className="togglableContent">
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable