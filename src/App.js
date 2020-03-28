import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import BlockList from "./components/BlockList";
import Navigation from "./components/Navigation";
import TransactionList from "./components/TransactionList";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />

        <Switch>
          <Route path="/batches">
            <BlockList />
          </Route>
          <Route path="/transactions">
            <TransactionList />
          </Route>
          <Route path="/">
            <h1>another one </h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
