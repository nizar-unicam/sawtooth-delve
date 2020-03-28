import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import BlockList from "./components/BlockList";
import Navigation from "./components/Navigation";
import TransactionList from "./components/TransactionList";
import Transaction from "./components/Transaction";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navigation />

          <Switch>
            <Route path="/batches">
              <BlockList />
            </Route>
            <Route
              path="/transactions/:id"
              component={props => (
                <Transaction {...props} key={window.location.pathname} />
              )}
            />
            <Route path="/transactions">
              <TransactionList />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
