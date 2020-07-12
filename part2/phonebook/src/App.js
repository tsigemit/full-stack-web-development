import React, { useState } from 'react'


const App = () => {
    const [persons, setPersons] = useState([
                                            { name: 'Arto Hellas', number: '040-123456' },
                                            { name: 'Ada Lovelace', number: '39-44-5323523' },
                                            { name: 'Dan Abramov', number: '12-43-234345' },
                                            { name: 'Mary Poppendieck', number: '39-23-6423122' }
                                         ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setNameSearch] = useState('')
    const [searchByName, setSearchByName] = useState([{}])
    

    const handleOnChangeName = (event) => {
        setNewName(event.target.value)
    }
    const handleOnChangeNumber = (event) => {
        setNewNumber(event.target.value)
    }
    const handleOnChangeSearch = (event) => {
        setNameSearch(event.target.value)
        const filtered = persons.filter(person => person.name.toLowerCase().startsWith(search))
        setSearchByName(filtered)
        
    }
    const addPeson = (event) => {
        event.preventDefault()
        const nameObject = {
            name:newName,
            number:newNumber
        }
        if(persons.find(peson => peson.name === newName))
            alert(`${newName} is already added to phonebook`)
        else
        setPersons(persons.concat(nameObject))
     }

    return (
        <div>
            <h2>Phonebook</h2>
            Filter shown with: <input value={search}
                onChange={handleOnChangeSearch} /> 
            <div>
                {searchByName.map(person => {
                    return (
                        <p key={person.name}>{person.name} {person.number}</p>)
                }
                )}
            </div>
            <h3>Add a new user</h3>
            <form onSubmit={addPeson}>
                <div>
                    Name: <input value={newName} 
                                 onChange={handleOnChangeName}/>
                </div>
                <div>
                    Number: <input value={newNumber}
                                   onChange={handleOnChangeNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map(person =>{ return (
                    <p key={person.name}>{person.name} {person.number}</p> ) 
                        }
                        )}
            </div>
        </div>
    )
}

export default   App