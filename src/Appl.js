import axios from "axios";
import { useState } from "react";
import { useSpring, animated } from "react-spring";

function Appl() {
    const [degree, setdegree] = useState("0");
    const [city, setcity] = useState("France");
    const [weather, setweather] = useState("Clouds");
    const [description, setDescription] = useState("overcast clouds");
    const [humidity, setHumidity] = useState(0);
    const [pressure, setPressure] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);
    const [inputvalue, setinputvalue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [bgImage, setBgImage] = useState("linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)");

    // Toggle function to add simple fade-in animation
    const [istogg, settog] = useState(false);
    const fade = useSpring({
        opacity: istogg ? 1 : 0,
    });

    function handleinput(event) {
        setinputvalue(event.target.value);
    }

    function getdata() {
        setLoading(true); // Start loading spinner
        axios(`https://api.openweathermap.org/data/2.5/weather?q=${inputvalue}&appid=0f4978c6281679611eb050a4d9632e10&units=metric`)
            .then(function (response) {
                const data = response.data;
                setdegree(data.main.temp);
                setcity(data.name);
                setweather(data.weather[0].main);
                setDescription(data.weather[0].description);
                setHumidity(data.main.humidity);
                setPressure(data.main.pressure);
                setWindSpeed(data.wind.speed);

                // Change background based on weather
                if (data.weather[0].main === "Clear") {
                    setBgImage("linear-gradient(120deg, #f6d365 0%, #fda085 100%)");
                } else if (data.weather[0].main === "Rain") {
                    setBgImage("linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)");
                } else if (data.weather[0].main === "Clouds") {
                    setBgImage("linear-gradient(120deg, #d3cce3 0%, #e9e4f0 100%)");
                }

                setLoading(false);
                settog(true); // Trigger the animation
            })
            .catch(function () {
                setLoading(false);
                setError("Enter a valid city");
            });
    }

    return (
        <div className="flex flex-row justify-center h-[100vh] items-center">
            <div style={{ backgroundImage: bgImage }} className="p-4 rounded-lg shadow-lg">
                <h2 className="font-medium text-lg">Hey! ⛅</h2>
                <p className="text-xs mb-4">Do you want to know the weather Report :)</p>
                <input
                    onChange={handleinput}
                    type="text"
                    className="rounded-md h-6 text-sm p-4 outline-none mb-2"
                    placeholder="City Name?"
                />
                <br />
                <button
                    onClick={getdata}
                    className="bg-black text-white rounded-lg px-4 py-2 text-xs mt-2"
                >
                    {loading ? "Loading..." : "Get Report ⚡"}
                </button>

                {error && <p className="text-xs mt-2 text-red-500">{error}</p>}

                <animated.div style={fade}>
                    {!loading && !error && (
                        <div className="text-sm mt-4">
                            <strong>Degree</strong>: {degree}°C | <strong>City</strong>: {city} |{" "}
                            <strong>Weather</strong>: {weather} ({description}) | <strong>Humidity</strong>: {humidity}% | <strong>Pressure</strong>: {pressure} hPa | <strong>Wind Speed</strong>: {windSpeed} m/s
                        </div>
                    )}
                </animated.div>
            </div>
        </div>
    );
}

export default Appl;
