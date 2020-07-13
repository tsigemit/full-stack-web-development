import React, { useState } from 'react'


const CountryLanguages = ({languages}) => {
       if(languages==null)
       return(
           <div></div>
       )
        return(
        <div>
            <h4>Languages</h4>
            {languages.map(lan => {
            return (
                <ul>
                    <li>{lan.name}</li>
                </ul>
            )
        })}
        </div>
        )
    }
const CountryInfo = ({selectCountry}) =>{
    if(selectCountry==null)
    return(
        <div></div>
    )
    return(
        selectCountry.map(info => {
            return (
                <div key={info.name}>
                    <h1>{info.name}</h1>
                    <p>capital {info.capital}</p>
                    <p> population {info.population}</p>
                    <CountryLanguages languages={info.languages} />
                    <img src={info.flag} alt="No flag" width="150" height="150" />
                </div>
            )
        })
    )
    
}
const Filter = ({ countries }) => {
    const [search, setNameSearch] = useState('')
    const [searchByName, setSearchByName] = useState([{}])
    const [selectCountry, setSelectCountry] = useState([])
    const [warningMessage, setWarningMessage] = useState('')
    const handleOnChangeSearch = (event) => {
        setNameSearch(event.target.value)
        var filtered = countries.filter(country => country.name.toLowerCase().startsWith(search.toLowerCase()))
        if (filtered.length == 1){
            setSelectCountry(filtered)            
        }
        if(filtered.length<10){
        setSearchByName(filtered)
        setWarningMessage('');
        }          
          else  
            setWarningMessage("Too many matches, specify another filter method")

        if (event.target.value.length==0) {
            setSelectCountry([])
        }
    }

    return (
        <div>
            find countries: <input value={search}
                onChange={handleOnChangeSearch} />
                  <h3>{warningMessage}</h3> 
            {searchByName.map(country => {
                return (
                    <p>{country.name}</p>
                )
            })}
            <CountryInfo selectCountry={selectCountry} /> 
        </div>
    )
}
export default Filter
