import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Main.css";
import {
  selectedCurrentCity,
  weekWeather,
} from "../../redux/actions/weatherAction";
import axios from "axios";
import moment from "moment";
import Search from "../search/Search";
import useTheme from "../dark-mode/useTheme";
import DefaultPage from "../default-page/DefaultPage";
import { API_KEY } from "../../Api_key";

export default function Main() {
  const locationKey = useSelector((state) => state.key.payload);
  const [currentWeather, setCurrenWeather] = useState([]);
  const [weekWeather, setWeekWeather] = useState([]);
  const [tempUnit, setTempUnit] = useState(true);
  const [exist, setExists] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  var ts = new Date();

  useEffect(() => {
    if (locationKey) {
      const response = axios
        .get(
          `https://dataservice.accuweather.com/currentconditions/v1/${locationKey.Key}?apikey=${API_KEY}&language=en-us&details=true`
        )
        .catch((err) => {
          console.log("error", err);
        });
      response.then((value) => dispatch(selectedCurrentCity(value.data)));
      response.then((value) => setCurrenWeather(value.data));
    }
  }, [locationKey]);

  useEffect(() => {
    if (locationKey) {
      const response = axios
        .get(
          `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey.Key}?apikey=${API_KEY}&language=en-us&details=true&metric=true`
        )
        .catch((err) => {
          console.log("error", err);
        });

      response.then((value) => setWeekWeather(value.data.DailyForecasts));
    }
  }, [locationKey]);

  useEffect(() => {
    const dataGetItem = JSON.parse(localStorage.getItem("favorites"));
    if (dataGetItem && locationKey) {
      const exist = dataGetItem.find(
        (x) => x.key.payload.EnglishName === locationKey.EnglishName
      );
      if (exist) {
        setExists(true);
      } else {
        setExists(false);
      }
    }
  }, [locationKey]);

  const toggle = useCallback(() => {
    setTempUnit((v) => !v);
  }, []);

  return (
    <>
      <Search />
      <div className="container padding  pt-5">
        {currentWeather.length > 0 && (
          <div class={`card card-weather App ${theme}`}>
            <div class="card-body">
              <div class="weather-date-location">
                <h3
                  style={{
                    color: "white",
                    textShadow: "0px 1px 3px black",
                  }}
                >
                  {locationKey?.EnglishName
                    ? locationKey?.EnglishName
                    : "Tel Aviv"}
                  ,{" "}
                  {locationKey?.Country.EnglishName
                    ? locationKey?.Country.EnglishName
                    : "Israel"}
                </h3>
                <p class="text-gray">
                  {" "}
                  <span class="weather-date">{ts.toDateString()}</span>{" "}
                </p>
              </div>
              <div
                style={{
                  color: "white",
                  textShadow: "0px 1px 3px black",
                }}
                class="weather-data d-flex"
              >
                <div class="mr-auto">
                  <h4 class="display-3">
                    {tempUnit ? (
                      <>
                        {currentWeather[0]?.Temperature?.Metric.Value}{" "}
                        <span class="symbol">°</span>
                        {currentWeather[0]?.Temperature?.Metric.Unit}
                      </>
                    ) : (
                      <>
                        {currentWeather[0].Temperature.Imperial.Value}{" "}
                        <span class="symbol">°</span>
                        {currentWeather[0].Temperature.Imperial.Unit}
                      </>
                    )}
                  </h4>
                  <p> {currentWeather[0].WeatherText} </p>
                </div>
              </div>
              <div div className="text-right ">
                <button onClick={toggle} class="btn btn-outline-info p-1">
                  Change Unit
                </button>
                <div class="form-group pt-2">
                  <span class="switch switch-sm ">
                    <input
                      onClick={toggleTheme}
                      type="checkbox"
                      class="switch"
                      id="switch-sm"
                    />
                    <label for="switch-sm"> Dark mode </label>
                  </span>
                </div>
                {exist && (
                  <p class="text-gray">
                    {" "}
                    <span>location alredy added to favorites</span>{" "}
                  </p>
                )}
              </div>
            </div>

            <div class="card-body p-0">
              <div class="d-flex weakly-weather">
                {weekWeather.map((weather, index) => (
                  <div key={index} class={`weakly-weather-item App ${theme}`}>
                    <p class="mb-1">{moment(weather.Date).format("dddd")} </p>{" "}
                    <p class="mb-0">
                      {weather.Temperature.Minimum.Value}
                      <span class="symbol">°</span>-
                      {weather.Temperature.Maximum.Value}
                      <span class="symbol">°</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {currentWeather.length === 0 && <DefaultPage />}
      </div>
    </>
  );
}
