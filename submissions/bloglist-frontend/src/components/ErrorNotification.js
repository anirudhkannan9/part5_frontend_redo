import React from 'react'
import PropTypes from 'prop-types'

const ErrorNotification = ({ message }) => {
    if (message === '') {
        return null
    }

    return (
        <div className="error">
            {message}
        </div>
    )
}

ErrorNotification.propTypes = {
    message: PropTypes.string.isRequired
}

export default ErrorNotification