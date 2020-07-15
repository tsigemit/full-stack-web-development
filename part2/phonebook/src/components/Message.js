
import React from 'react'

const Message = ({ successMessage, confirmationMessage}) => {
    if (successMessage === confirmationMessage)
    return (
        <divi></divi>
    )
    if (successMessage) return (<div className="success">{successMessage}</div>)
           else return (<div className="notify">{confirmationMessage}</div>)
}
export default Message