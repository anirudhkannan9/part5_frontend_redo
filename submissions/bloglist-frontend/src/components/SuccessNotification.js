import React from 'react'
import PropTypes from 'prop-types'

const SuccessNotification = ({ message }) => {
    if (message === '') {
        return null
    }

    return (
        <div className="success">
            {message}
        </div>
    )
}

SuccessNotification.propTypes = {
    message: PropTypes.string.isRequired
}

export default SuccessNotification