import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
    const [persons, setPersons] = useState([
                                            { name: 'Arto Hellas', number: '040-123456' },
                                            { name: 'Ada Lovelace', number: '39-44-5323523' },
                                            { name: 'Dan Abramov', number: '12-43-234345' },
                                            { name: 'Mary Poppendieck', number: '39-23-6423122' }
                                            ])   

const [newName, setNewName] = useState('')
const [newNumber, setNewNumber] = useState('')

const handleOnChangeName = (event) => {
    setNewName(event.target.value)
}

const handleOnChangeNumber = (event) => {
    setNewNumber(event.target.value)
}

const addPeson = (event) => {
    event.preventDefault()
    const nameObject = {
        name: newName,
        number: newNumber
    }
    if (persons.find(peson => peson.name === newName))
        alert(`${newName} is already added to phonebook`)
    else
        setPersons(persons.concat(nameObject))
}
   

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter persons ={persons}/>

            <h3>Add a new user</h3>

            <PersonForm addPeson={addPeson}
                        newName = {newName}
                        newNumber={newNumber}
                        handleOnChangeName={handleOnChangeName}
                        handleOnChangeNumber={handleOnChangeNumber}
                        />

            <h2>Numbers</h2>

            <Persons persons={persons} />
        </div>
    )
}

export default App