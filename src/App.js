import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Navigation from "./components/Navigation";

import Block from "./components/Block";
import BlockList from "./components/BlockList";

import TransactionList from "./components/TransactionList";
import Transaction from "./components/Transaction";

import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout className="layout">
          <Router>
            <Header>
              <div className="logo" />
              <Navigation />
            </Header>

            <Content style={{ padding: "0 50px", height: "90vh" }}>
              <div className="site-layout-content">
                <Switch>
                  <Route
                    path="/blocks/:id"
                    component={props => (
                      <Block {...props} key={window.location.pathname} />
                    )}
                  />

                  <Route path="/blocks">
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
              </div>
            </Content>
          </Router>
          <Footer style={{ textAlign: "center" }}>
            UNICAM 2020
          </Footer>
        </Layout>
      </div>
    );
  }
}
