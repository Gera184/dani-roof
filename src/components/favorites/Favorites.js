import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { notification } from "../notify/Notify";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCityLocationKey } from "../../redux/actions/weatherAction";
import "./Favorites.css";

export default function Favorites() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);
  var ts = new Date();
  let history = useHistory();

  useEffect(() => {
    if (deleted) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
      notification("deleted");
      setDeleted(false);
    }
  }, [deleted]);

  useEffect(() => {
    if (favorites.length === 0) {
      notification("no_locations_was_added");
      history.push("/home");
    }
  }, [favorites]);

  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <h1
              style={{
                color: "white",
                fontSize: "60px",
              }}
            >
              My Locations
            </h1>
          </div>
        </div>
      </div>
      <div className="container pt-3">
        <div class="row">
          {favorites.map((favorite, index) => (
            <div key={index} class="col-md-3 col-sm-6  pb-4 text-center">
              <div class="card-fav p-3">
                <ul
                  style={{
                    color: "gray",
                    textShadow: " 1px 1px 1px whitesmoke",
                    fontSize: "30px",
                  }}
                >
                  <span>
                    {favorite?.key.payload.EnglishName} {""}
                  </span>
                </ul>
                <h3
                  style={{
                    color: "white",
                    textShadow: " 1px 1px 1px black",
                  }}
                  class=" display-3"
                >
                  {favorite?.city[0].Temperature.Metric.Value} <span>°</span>
                  {favorite?.city[0].Temperature.Metric.Unit}
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

                <div class="text-center  pt-3">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    class="btn btn-outline-info p-1"
                  >
                    DELETE
                  </button>{" "}
                  <Link
                    to={{
                      pathname: "/home",
                    }}
                  >
                    <button
                      class="btn btn-outline-info p-1"
                      onClick={() => {
                        dispatch(
                          setCityLocationKey(favorites[index].key.payload)
                        );
                      }}
                    >
                      BROADCAST
                    </button>
                  </Link>
                </div>
              </div>
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog pt-5">
                  <div class="modal-content">
                    <div class="modal-body">
                      You sure you want to delete location ?
                    </div>
                    
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-md green"
                        data-bs-dismiss="modal"
                      >
                        leave it
                      </button>
                      <button
                        onClick={() => {
                          setFavorites(
                            favorites.filter(
                              (item) =>
                                item.key.payload.EnglishName !==
                                favorites[index].key.payload.EnglishName
                            )
                          );
                          setDeleted(true);
                        }}
                        type="button"
                        class="btn btn-md red"
                        data-bs-dismiss="modal"
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
