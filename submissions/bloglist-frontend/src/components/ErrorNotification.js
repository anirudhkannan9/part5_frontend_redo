import React from 'react'

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
export default ErrorNotification