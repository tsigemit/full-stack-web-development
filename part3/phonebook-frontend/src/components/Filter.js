import React, { useState } from 'react'

const Filter = ({ persons }) => {
    const [search, setNameSearch] = useState('')
    const [searchByName, setSearchByName] = useState([{}])

    const handleOnChangeSearch = (event) => {
        setNameSearch(event.target.value)
        const filtered = persons.filter(person => person.name.toLowerCase().startsWith(search.toLowerCase()))
        setSearchByName(filtered)
    }
    
    
    return (
        <div>
            Filter shown with: <input value={search}
                onChange={handleOnChangeSearch} />
           {(search) ? searchByName.map(person => {
                return (
                    <p key={person.name}>{person.name} {person.number}</p>
                )
            }):null}
        </div>
    )
}
export default Filter
