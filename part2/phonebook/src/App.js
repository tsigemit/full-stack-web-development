import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import contacts from './services/functions'

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

    if (persons.find(peson => peson.name === newName)){
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
            const replaceNumber = persons.filter(person => person.name === newName)
            let updatePerson = replaceNumber[0]
            updatePerson.number = newNumber
            contacts.update(updatePerson.id, updatePerson).then(newContacts => {
                setPersons(persons.map(person => person.id !== updatePerson.id ? person : newContacts))
                alert(`${newName}'s number is successfully updated`)
            })
    }
}
    else
    {
        setPersons(persons.concat(nameObject))
        contacts.create(nameObject)
        
    }
   
}
   
    const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
            contacts.remove(person.id)
                .then(() =>(
                   alert(`${person.name} successfully deleted`)
                ))
                .catch(error => (`${person.name} ${error}`))
            const filtered = persons.filter(pre => pre.id !== person.id)
            setPersons(filtered)
        }
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

            <Persons persons={persons} handleDelete={handleDelete} />
        </div>
    )
}

export default App