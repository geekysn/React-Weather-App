import { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";

const Inputs = ({setQuery, setUnits}) => {
  const [city, setCity] = useState('');

  const handleSubmit = ()=>{
    if(city != ''){
      setQuery({q: city});
    }
  }

  const liveLocation = ()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        const {latitude, longitude} = position.coords;
        setQuery({lat: latitude, lon: longitude});
      })
    }
  }

  return (
    <div className="flex flew-row justify-center my-6">
      <div className="flex flew-row w-3/4 items-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          placeholder="Search by City"
          className="text-gray-500 text-xl font-light p-2 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase"
        />
        <BiSearch
          size={30}
          className=" cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSubmit}
        />
        <BiCurrentLocation
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={liveLocation}
        />
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button className="text-2xl font-medium transition ease-out hover:scale-125" onClick={()=>{
          setUnits("metric")
        }}>
          °C
        </button>
        <p className="text-2xl font-medium mx-1">|</p>
        <button className="text-2xl font-medium transition ease-out hover:scale-125" onClick={()=>{
          setUnits("imperial")
        }}>
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
