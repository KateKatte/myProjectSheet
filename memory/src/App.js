import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import Table from './gridTable'
import AppRedux from './inputRedux'
import AppGraphRedux from './graphRedux'
import {Router, Route} from "react-router-dom"
import createHistory from "history/createBrowserHistory"
import { connect, Provider} from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { GraphQLClient } from 'graphql-request'
const gql =  new GraphQLClient("http://localhost:4000/graphql", { headers: {} })

var allCells = new Array();
for (var i = 0; i <= 25; i++) {
  allCells[i] = new Array();
  for (var j = 0; j <= 20; j++) {
    var oneCells = {}
    oneCells['value']=" "
    allCells[i][j] = oneCells;
  }
}

class App extends Component {
   render() {
    return (
      <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
       <AppGraphRedux/>
       <AppRedux/>
      </div>
    );
  }
}

export default App;