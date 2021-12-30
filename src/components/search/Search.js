import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css";
import { useDispatch } from "react-redux";
import { setCityLocationKey } from "../../redux/actions/weatherAction";
import { API_KEY, API_KEY_AUTO_COMPLETE } from "../../Api_key";

export default function Search() {
  const [cityName, setCityName] = useState("");
  const [autocomplete, setAutocomplete] = useState("");

  const dispatch = useDispatch();

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const response = await axios
      .get(
        `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${cityName}&language=en-us&details=true`
      )
      .catch((err) => {
        console.log("error", err);
      });
    dispatch(setCityLocationKey(response.data[0]));

    setCityName("");
  };

  useEffect(() => {
    const response = axios
      .get(
        `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY_AUTO_COMPLETE}&q=${cityName}&language=en-us`
      )
      .catch((err) => {
        console.log("error", err);
      });
    response.then((value) => setAutocomplete(value.data));
    console.log(response);
  }, [cityName]);

  return (
    <div className="container ">
      <div className="row text-center">
        <div className="col pt-5">
          <h1
            style={{
              color: "white",
              textShadow: " 1 1 1px black",
              fontSize: "60px",
            }}
          >
            Danny-Rof weather
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="col text-center pt-3">
          <div class="main-search-input-wrap">
            <form onSubmit={SubmitHandler}>
              <div class="main-search-input fl-wrap">
                <div class="main-search-input-item">
                  <input
                    type="text"
                    value={cityName}
                    required
                    onChange={(e) => {
                      setCityName(e.target.value);
                    }}
                    placeholder="Enter city name"
                  />
                </div>{" "}
                <button type="submit" class="main-search-button">
                  Search
                </button>
              </div>
              <div className="row">
                <div className="col pt-3 text-left">
                  {autocomplete ? (
                    <ul
                      style={{
                        textShadow: " 0px 2px 3px black",
                        color: "whitesmoke",
                        background: "transparent",
                        border: "none",
                        listStyleType: "none",
                      }}
                      class="main-search-input-item"
                    >
                      {autocomplete.map((option, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setCityName(option.LocalizedName);
                          }}
                        >
                          {option.LocalizedName}, {option.Country.ID}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
