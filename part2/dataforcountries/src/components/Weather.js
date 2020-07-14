import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital, search}) => {
    const [currentWeather, setCurrentWeather] = useState({})

    const api_key = process.env.REACT_APP_API_KEY;
    const httpUrl = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
    const weatherReport= () => {
        axios.get(httpUrl).then(response => {
            console.log(response)
                const info = {
                    temprature: response.data.current.temperature,
                    icon: response.data.current.weather_icons[0],
                    windSpeed: response.data.current.wind_speed,
                    windDirection: response.data.current.wind_dir
                }
                setCurrentWeather(info)
            })
    }
    
    useEffect(weatherReport, [capital])
    
    if (search)
        return (
            <div>
                <h1>Weather in {capital} </h1>
                <p> <b>temperature: </b> {currentWeather.temprature} Celsius </p>
                <img src={currentWeather.icon} alt="icon not found" />
                <p>
                    <b>wind: </b> {currentWeather.windSpeed} mph direction {currentWeather.windDirection}
                </p>
            </div>
        )
    else
        return (
            <div></div>
        )
}

export default Weather;