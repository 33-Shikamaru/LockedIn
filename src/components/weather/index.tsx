import { useState, useEffect } from 'react';
// import {ReactComponent as MoonSvg} from '../../assets/moon.svg';
// import {ReactComponent as CloudSvg} from '../../assets/cloud.svg';
// import {ReactComponent as SunSvg} from '../../assets/sun.svg';

import MoonSvg from '../../assets/moon.svg?react';
import CloudSvg from '../../assets/cloud.svg?react';
import SunSvg from '../../assets/sun.svg?react';

import axios from 'axios';

interface WeatherData {
  timezone: number;
  sys: {
    sunrise: number;
    sunset: number;
  };
  clouds: {
    all: number;
  };
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
  }>;
}

const WeatherWidget = ({ location }: { location: string }) => {

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(()=> {
    if(location.length){
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid={API-KEY-HERE}`
      )
      .then(response=>{
        setWeatherData(response.data)
      }).catch(error=>{
        console.error("Error fetching weather data: ", error)
      })
    }
  }, [location])

  if(!weatherData){
    return(
      <div className="flex items-center justify-center">
        <p>Loading weather data...</p>
      </div>
    );
  }

  const currentTimeUTC = new Date().getTime() / 1000; 
  const localTime = currentTimeUTC + weatherData.timezone;
  const isDayTime = localTime > weatherData.sys.sunrise && localTime < weatherData.sys.sunset; // Corrected comparison
  // const cloudSize = weatherData.clouds.all; 

  const {main, weather} = weatherData;
  const {temp, temp_min, temp_max, feels_like, humidity} = main;

  return (
    <div className="flex items-center justify-center">
      <div 
        className={`flex flex-col justify-center items-center rounded-md 
          ${isDayTime ? "bg-gradient-to-br from-blue-50 via-blue-300 to-blue-600" : 
          "bg-gradient-to-br from-blue-500 to-indigo-900"}
           text-sm text-white p-5`} // removed font-digital
      >
        {isDayTime ? 
        <SunSvg 
        className = "fill-yellow-100 drop-shadow-xl"
        style={{
          filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))'
        }}
        width="50px" height="50px"/> 
        : 
        <MoonSvg 
        className = "fill-gray-200 drop-shadow-xl"
        style={{
          filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))'
        }}
        width="50px" height="50px" />}
        
        
        <div className="cloud-container">
         <CloudSvg 
         className = "fill-white drop-shadow-xl"
         />
         {/* {cloudSize} */}
          {/* {cloudSize > 20 && <CloudSvg />} */}
        </div>
        <div className="text-2xl" aria-label="location">{location}</div>
        <div className="text-xl" aria-label="temperature">{Math.round(temp)}°F</div>
        <div aria-label="weather">Weather: {weather[0].main}</div>
        <div aria-label="low-high">
          Low/High: {Math.round(temp_min)}°F - {Math.round(temp_max)}°F
        </div>
        <div aria-label="feels-like">Feels Like: {Math.round(feels_like)}°F</div>
        
        <div aria-label="humidity">Humidity: {humidity}%</div>
      </div>
    </div>
  );
};

export default WeatherWidget;
