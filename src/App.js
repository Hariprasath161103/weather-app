import axios from "axios"
import { useState } from "react"
function App() {


  const [degree, setdegree] = useState("0")
  const [city, setcity] = useState("france")
  const [weather, setweather] = useState("rainy")
  const [inputvalue, setinputvalue] = useState()

  function handleinput(event) {
    setinputvalue(event.target.value)
  }

  function getdata() {
    var weather = axios(`https://api.openweathermap.org/data/2.5/weather?q=${inputvalue}&appid=0f4978c6281679611eb050a4d9632e10`)
    weather.then(function (dalta) {
      console.log(dalta.data)
      setdegree(dalta.data.main.temp)
      setcity(dalta.data.name)
      setweather(dalta.data.weather[0].main)
    }).catch(function () {
      console.log("enter valid city")
    })
  }
  return (
    <div className="flex flex-row justify-center h-[100vh] items-center" >
      <div style={{ backgroundImage: "linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)" }} className="p-2 rounded shadow">
        <h2 className="font-medium">Hey! ⛅</h2>
        <p className="text-xs">Do you want to know the weather Report :)</p>
        <input onChange={handleinput} type="text" className="rounded-md h-6 text-sm mt-2 p-4 outline-none" placeholder="City Name ?"></input>
        <br></br>
        <button onClick={getdata} className="bg-black text-white rounded-lg p-2 text-xs mt-2" >Get Report ⚡</button>

        <p className="text-xs mt-2">Degree: {degree} | City: {city} | Weather: {weather}</p>
      </div>
    </div>)
}

export default App