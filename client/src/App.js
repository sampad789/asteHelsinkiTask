import "./App.css";
import axios from "axios";
import { useState } from "react";
import Result from "./Components/Result";
import Loader from "./Components/Loader";
function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/search?query=${query}`
      );
      // Randoming the array just for change of response
      //Probably not the best way just something small
      setData(response.data.sort(() => 0.5 - Math.random()));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    fetchData();
  };

  return (
    <div>
      <div className="header">
        <h1 className="brand">
          RANDOMEST API EVER <i className="fas fa-dragon"></i>
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="inputFeild"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your query"
          />
        </form>
      </div>

      <div className="resultsContainer">
        {loading ? (
          <Loader />
        ) : (
          data.map((item) => {
            return (
              <Result
                key={item.id}
                title={item.title ? item.title : item.id}
                data_source={
                  item.data_source ? item.data_source : "No data Source found"
                }
                publisher={
                  item.publisher ? item.publisher : "No publisher found"
                }
                subject={
                  item.subjects ? item.subjects.join(",") : "No subject Found"
                }
                isEvent={
                  item.event_status
                    ? `This is an ${item.event_status}`
                    : "This is a Book or an Audio "
                }
                name={item.name ? item.name : ""}
                location={item.location ? item.location : ""}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
