import React from 'react';

const CountryLanguages = ({ languages }) => {
    if (languages == null)
        return (
            <div></div>
        )
    return (
        <div>
            <h4>Languages</h4>
            {languages.map(lan => {
                return (
                    <ul>
                        <li key={lan.iso639_1}>{lan.name}</li>
                    </ul>
                )
            })}
        </div>
    )
}

const CountryInfo = ({ selectCountry, search }) => {
    if (!search)
        return (
            <div></div>
        )
    return (
        selectCountry.map(info => {
            return (
                <div key={selectCountry.numericCode}>
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

export default CountryInfo;