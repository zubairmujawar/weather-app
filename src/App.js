import { useState, useEffect, useCallback, useMemo } from "react";
import "./App.css";
import loadingimg from "../src/image/loading.gif";
function App() {
  const [userInput, setUserInput] = useState("");
  const [cityName, setCityName] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${
    userInput ? userInput : "Mumbai"
  }`;

  const options = useMemo(() => {
    return {method: "GET",
    headers: {
      "X-RapidAPI-Key": "33654bff97msh6b4b5a10e3fadbbp11484fjsn48637d73ceac",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    }}; 
  }, []);

  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "33654bff97msh6b4b5a10e3fadbbp11484fjsn48637d73ceac",
  //     "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  //   },
  // };

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setCityName(data);
      setError(null); // Reset error state if data is successfully fetched
    } catch (error) {
      console.error("Error in API:", error);
      setError("City not found");
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  const handleSearch = () => {
    fetchData();
  };
  // eslint-disable-next-line
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="main-div">
      <h1>Weather App</h1>
      <div className="card">
        <div className="inputBox">
          <input
            type="text"
            placeholder="City name"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button className="btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        {loading ? (
          <img src={loadingimg} alt="loading.." className="loadingImg" />
        ) : error ? (
          <h2 id="errormsg">{error}</h2>
        ) : (
          <div className="info">
            <h2>{cityName.location.name}</h2>
            <h5>
              Temperature:{" "}
              <span className="tepm">{cityName.current.temp_c}°C</span>
            </h5>
            <h5>
              Fahrenheit:{" "}
              <span className="tepm">{cityName.current.temp_f}°F</span>
            </h5>
            <h5>
              Humidity:{" "}
              <span className="tepm">{cityName.current.humidity}%</span>
            </h5>
            <h5>
              Wind degree:{" "}
              <span className="tepm">{cityName.current.wind_degree}</span>
            </h5>
            <h5>
              Region: <span className="tepm">{cityName.location.region}</span>
            </h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
