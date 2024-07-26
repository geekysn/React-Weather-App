import { FaReact } from "react-icons/fa";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./Services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function capitalize(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}


const App = () => {
  const [query, setQuery] = useState({q: 'ahmedabad'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  const getWeather = async()=>{
    const message = query.q ? query.q : 'current location'
    toast.info(`Fetching weather details for ${capitalize(message)}`)
    await getFormattedWeatherData({...query, units})
      .then(data=>{
        toast.success(`Fetched weather data for ${data.name}, ${data.country}`)
        setWeather(data)
      })
    // console.log(data);
  }
  
  useEffect(()=>{
    getWeather();
  }, [query, units])

  const formatBackground = ()=>{
    if(!weather) return "from-cyan-600 to-blue-700";
    const threshold = units === 'metric' ? 20 : 60;
    if(weather.temp <= threshold)return 'from-cyan-600 to-blue-700';
    return 'from-yellow-600 to-orange-700'; 
  }

  return (
    <div className={`text-white mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />
      {weather && (
        <>
          <TimeAndLocation weather={weather}/>
          <TempAndDetails weather={weather} units={units}/>
          <Forecast title='3 hour step forcast' data={weather.hourly} />
          <Forecast title='daily forcast' data={weather.daily}/>
        </>
      )}
      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored"/>
    </div>
  )
}
 
export default App