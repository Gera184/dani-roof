import React, { useEffect, useState } from "react";
import useGeoLocation from "../geolocation/useGeoLocation";
import Loading from "../loading/Loading";
import axios from "axios";
import { API_KEY_LOCATION } from "../../Api_key";

export default function Default() {
  const location = useGeoLocation();
  const [defaultLocation, setDefaultLocation] = useState();
  const [unit, setUnit] = useState();
  var ts = new Date();

  useEffect(() => {
    if (location.loaded) {
      const response = axios
        .get(
          `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY_LOCATION}&q=${location.coordinates.lat}%20%2C%20${location.coordinates.lng}&language=en-us&details=true`
        )
        .catch((err) => {
          console.log("error", err);
        });

      response.then((value) => setDefaultLocation(value.data));
    }
  }, [location]);

  useEffect(() => {
    if (defaultLocation) {
      const response = axios
        .get(
          `https://dataservice.accuweather.com/currentconditions/v1/${defaultLocation.Key}?apikey=${API_KEY_LOCATION}&language=en-us&details=true`
        )
        .catch((err) => {
          console.log("error", err);
        });
      response.then((value) => setUnit(value.data[0]));
    }
  }, [defaultLocation]);

  return (
    <>
      {location.loaded ? (
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <div class="card-fav p-3">
                <ul
                  style={{
                    color: "gray",
                    textShadow: " 1px 1px 1px whitesmoke",
                    fontSize: "30px",
                  }}
                >
                  <span>{defaultLocation?.EnglishName}</span>
                </ul>
                <h3
                  style={{
                    color: "white",
                    textShadow: " 1px 1px 1px black",
                  }}
                  class=" display-3"
                >
                  {unit?.Temperature.Metric.Value} <span>°</span>
                  {unit?.Temperature.Metric.Unit}
                </h3>

                <div
                  style={{
                    color: "gray",
                    textShadow: " 1px 1px 1px whitesmoke",
                  }}
                  class="text-right pt-3"
                >
                  {ts.toDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
