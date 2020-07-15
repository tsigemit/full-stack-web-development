import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import contacts from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])  
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    
    const handleOnChangeName = (event) => {
    setNewName(event.target.value)
}

    const handleOnChangeNumber = (event) => {
    setNewNumber(event.target.value)
}

    useEffect(() => {
        contacts
            .getContacts()
            .then(initialContacts => {
                setPersons(initialContacts)
            })
    }, [])

    const addPeson = (event) => {
    event.preventDefault()
    const nameObject = {
        name: newName,
        number: newNumber,
        id:persons.length+1
    }
     contacts.create(nameObject)
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