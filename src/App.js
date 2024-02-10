import { useState, useEffect } from "react";
import "./App.css";
import loadingimg from '../src/image/ZKZg.gif'

function App() {
  const [userInput, setUserInput] = useState("");
  const [cityName, setCityName] = useState([]);
  const [error, seterror] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${
    userInput ? userInput : "Mumbai"
  }`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "33654bff97msh6b4b5a10e3fadbbp11484fjsn48637d73ceac",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  useEffect(() => {
    fetchData(); // Fetch data on initial load
  }, []); 

  const fetchData = async () => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setCityName([data]);
      console.log(data);
    } catch {
      console.log("error in api");
      seterror("city name is not found");
      setUserInput('')
    } finally {
      setLoading(false);
      
    }
  };
  const handelSearch = () => {
    fetchData();
    setUserInput("");
  };
  return (
    <div className="main-div">
      <h1>Wearther App</h1>
      <div className="card">
        <div className="inputBox">
          <input
            type="text"
            placeholder="City name"
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button className="btn" onClick={handelSearch}>
            search
          </button>
        </div>
        {error && <p id="errormsg">City name is not found</p>}
        {loading ? (
          <h2><img src={loadingimg} alt="loading..." id="loadingimg"/></h2>
        ) : (
          <div className="info">
            <h2>
              {cityName[0].location.name ? (
                cityName[0].location.name
              ) : (
                <h2>City name is not correct</h2>
              )}
            </h2>
            {/* <h5>Tempreture{cityName[0].current.temp_c>20?<img src={img1} alt="img"/>:null}{cityName[0].current.temp_c}°C</h5> */}
            <h5>
              Tempreture:
              <span className="tepm"> {cityName[0].current.temp_c}°C</span>
            </h5>
            <h5>
              Fahrenheit:{" "}
              <span className="tepm">{cityName[0].current.temp_f}°F</span>
            </h5>
            <h5>
              Humidity:{" "}
              <span className="tepm">{cityName[0].current.humidity}%</span>
            </h5>
            <h5>
              Wind degree:{" "}
              <span className="tepm">{cityName[0].current.wind_degree}</span>
            </h5>
            <h5>
              Region:{" "}
              <span className="tepm"> {cityName[0].location.region}</span>
            </h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
