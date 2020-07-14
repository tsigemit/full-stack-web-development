import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'

const App = () => {
    const [countries, setCountries] = useState([])

    const data= () => {
        axios.get('https://restcountries.eu/rest/v2/all')
             .then(response => {setCountries(response.data)})
    }
    useEffect(data,[])

    return (
        <div>
            <Filter countries ={countries}/>
        </div>
    )
}

export default App