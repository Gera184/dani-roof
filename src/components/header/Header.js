import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { notification } from "../notify/Notify";

export default function Header() {
  const currentCity = useSelector((state) => state);
  const [favorites, setFavorites] = useState([]);
  const [favoritesBtn, setFavoritesBtn] = useState(false);

  useEffect(() => {
    const dataGetItem = JSON.parse(localStorage.getItem("favorites"));
    if (dataGetItem) {
      setFavorites(dataGetItem);
    } else {
      setFavorites([]);
    }
  }, [currentCity]);

  useEffect(() => {
    if (favoritesBtn) {
      const dataGetItem = JSON.parse(localStorage.getItem("favorites"));
      if (dataGetItem) {
        const exist = dataGetItem.find(
          (x) =>
            x.key.payload.EnglishName === currentCity.key.payload.EnglishName
        );
        if (exist) {
          notification("exist");
          setFavoritesBtn(false);
        } else {
          localStorage.setItem("favorites", JSON.stringify(favorites));
          notification("added");
          setFavoritesBtn(false);
        }
      } else {
        localStorage.setItem("favorites", JSON.stringify(favorites));
        notification("added");
        setFavoritesBtn(false);
      }
    }
  }, [favoritesBtn]);

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ml-left">
              <a style={{ color: "white" }} class="nav-link" href="/home">
                Home
              </a>
              <a style={{ color: "white" }} class="nav-link" href="/favorites">
                Favorites
              </a>

              {currentCity?.key?.payload?.EnglishName && (
                <a
                  style={{ color: "white" }}
                  type="button"
                  onClick={() => {
                    setFavoritesBtn(true);
                    setFavorites((favorites) => [...favorites, currentCity]);
                  }}
                  class="btn btn-outline-warning"
                >
                  Add location
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
