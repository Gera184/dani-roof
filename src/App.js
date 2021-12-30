import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Favorites from "./components/favorites/Favorites";

export default () => {
  return (
    <div
      style={{
        backgroundImage: "url(https://cdn.wallpapersafari.com/3/89/53j19Z.jpg)",
        width: "100%",
        height: "100%",
        overflowY: "hidden",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        fontFamily: "Spartan sans-serif",
      }}
    >
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/home" component={Main} />
          <Route path="/favorites" component={Favorites} />
        </Switch>
      </Router>
    </div>
  );
};
