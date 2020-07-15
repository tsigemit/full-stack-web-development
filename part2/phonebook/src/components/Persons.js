import React from 'react'

const Persons = ({ persons, handleDelete }) => {
    return (
        <div>
            {persons.map(person => {
                return (
                    <p key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button></p>
                    )
                    
            }
            )}
        </div>
    )
}

export default Persons
