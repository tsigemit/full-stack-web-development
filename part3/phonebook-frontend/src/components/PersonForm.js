import React from 'react'

const PersonForm = (props) => {
    const {addPeson, newName, newNumber, handleOnChangeName, handleOnChangeNumber}= props
    return (
        <form onSubmit={addPeson}>
            <div>
                Name: <input value={newName}
                    onChange={handleOnChangeName} />
            </div>
            <div>
                Number: <input value={newNumber}
                    onChange={handleOnChangeNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
