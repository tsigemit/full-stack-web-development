import React, { useState } from 'react'
import CountryInfo from './CountryInfo'   
import Weather from './Weather'   
const Filter = ({ countries }) => {
    const [search, setNameSearch] = useState('')
    const [searchByName, setSearchByName] = useState([{}])
    const [selectCountry, setSelectCountry] = useState([])
    const [capital, setCapital] = useState('')
    const [warningMessage, setWarningMessage] = useState('')
    const handleOnChangeSearch = (event) => {
        setNameSearch(event.target.value)
        const filtered = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
        if (filtered.length == 1){
            setSelectCountry(filtered)            
        }
        if(filtered.length<10){
        setSearchByName(filtered)
        setWarningMessage('');
        }          
          else  
            setWarningMessage("Too many matches, specify another filter method")

        if (event.target.value.length===0) {
            setSearchByName([])
        }
    }
    const showCountryInfo =(countryName) => {
        const filtered = countries.filter(country => country.name.toLowerCase().includes(countryName.toLowerCase()))  
        setCapital(filtered[0].capital)
        setSelectCountry(filtered)
    }
    return (
        <div>
            find countries: <input value={search}
                onChange={handleOnChangeSearch} />
                  <h3>{warningMessage}</h3> 
            {searchByName.map(country => {
                return (
                    <p key={country.numericCode}>{country.name} 
                   {(search) ?  <button onClick={() => showCountryInfo(country.name)}>show</button>:null}
                    </p>
                )
            })}
            <CountryInfo selectCountry={selectCountry} search={search} /> 
            {(capital) ? <Weather capital={capital} search={search} /> : null}
        </div>
    )

}
export default Filter
