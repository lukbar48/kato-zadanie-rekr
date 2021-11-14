import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherInfo, setWeatherInfo] = useState({
    dt_txt: [],
    temp: [],
    humidity: [],
  });
  const appid = 'c2e097d87337bcc7410f885309c63a6e';

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const fetchData = async (key) => {
    console.log(city);
    const fetchUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;
    try {
      if (city) {
        const result = await fetch(fetchUrl);
        const data = await result.json();
        const dt_txtArray = [];
        const humidityArray = [];
        const temperatureArray = [];
        for (let i = 0; i < data.list.length; i++) {
          const { dt_txt } = data.list[i];
          const { humidity, temp } = data.list[i].main;
          dt_txtArray.push(dt_txt);
          humidityArray.push(humidity);
          temperatureArray.push(temp);
        }
        setWeatherInfo({
          dt_txt: dt_txtArray,
          temp: temperatureArray,
          humidity: humidityArray,
        });
      } else
        setWeatherInfo({
          dt_txt: [],
          temp: [],
          humidity: [],
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(appid);
    if (city) {
      const update = setInterval(() => {
        fetchData(appid);
      }, 10000);
      return () => clearInterval(update);
    }
  }, [city]);

  return (
    <div className="App">
      <div className="selectCity">
        <label htmlFor="city">Choose city</label>
        <select onChange={handleChange} name="city" id="city">
          <option defaultValue value=""></option>
          <option value="london" id="london">
            London
          </option>
          <option value="münchen" id="münchen">
            München
          </option>
        </select>
      </div>
      <div className="displayWeather">
        <div className="dt_txt">
          <h3>Dt_txt</h3>
          {weatherInfo.dt_txt &&
            weatherInfo.dt_txt.map((info) => {
              return (
                <>
                  <h4 key={info}>{info}</h4>
                </>
              );
            })}
        </div>
        <div className="humidity">
          <h3>Humidity</h3>
          {weatherInfo.humidity &&
            weatherInfo.humidity.map((info, index) => {
              return (
                <>
                  <h4 key={index}>{info}</h4>
                </>
              );
            })}
        </div>
        <div className="temp">
          <h3>Temp</h3>
          {weatherInfo.temp &&
            weatherInfo.temp.map((info) => {
              return (
                <>
                  <h4 key={info}>{info}</h4>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
