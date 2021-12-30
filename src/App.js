import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Favorites from "./components/favorites/Favorites";

export default () => {
  return (
    <div className="app">
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
