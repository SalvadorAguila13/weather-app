import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import Loader from "./components/Loader";
import WeatherCard from "./components/WeatherCard";
const API_KEY = "1b52cb7fba520efa057a997126d2274a";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  // Almacenar las temperaturas
  const [temps, setTemps] = useState();
  const [isCelsius, setIsCelsius] = useState(true);

  // Almacenamiento de la latitud y longitud propia
  const success = (e) => {
    const newCoords = {
      lat: e.coords.latitude,
      lon: e.coords.longitude,
    };
    setCoords(newCoords);
  };
  // Función que se encarga del cambio de temperatura.
  const changeUnitTemp = () => setIsCelsius(!isCelsius);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`;
      axios
        .get(URL)
        .then((res) => {
          setTimeout(() => {
            setWeather(res.data);
            console.log(res.data);
            const celsius = (res.data.main.temp - 273.15).toFixed(2);
            const fahrenheit = (celsius * (9 / 5) + 32).toFixed(2);
            const newTemps = { celsius, fahrenheit };
            // Se manda la informacion de newTemps a el estado en setTemps
            setTemps(newTemps);
          }, 1000);
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);

  return (
    <div className="App">
      {weather ? (
        <WeatherCard
          weather={weather}
          temps={temps}
          isCelsius={isCelsius}
          changeUnitTemp={changeUnitTemp}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
