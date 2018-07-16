import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect, Provider} from 'react-redux';
import { createStore, combineReducers } from 'redux';


const allCells = new Array();
for (var i = 0; i <= 25; i++) {
  allCells[i] = new Array();
  for (var j = 0; j <= 20; j++) {
    var oneCells = {}
    oneCells['value']=" "
    allCells[i][j] = oneCells;
  }
}

class CellsTable extends Component {
  constructor(props) {
      super (props);
      this.state = {allCells: []}

  }

  render(){
    var allCells = new Array();
for (var i = 0; i < 25; i++) {
  allCells[i] = new Array();
  for (var j = 1; j <= 20; j++) {
    var oneCells = {}
    oneCells['name']= String.fromCharCode(65+i) +  (+(+ j))
    allCells[i][j] = oneCells;
  }
}
      return (
       
          <tr>
          {allCells.map(item => (<td className = "cells"> {item.name} </td>))}
          </tr>
        
      );
  }
}

class Table extends Component {
  constructor(props){
    super (props);
    }
    
render() {
  return (
    <table className = 'table'> 
    <tbody>
        {this.props.cells.map((item) => <CellsTable data ={item}/> )}
        </tbody>
    </table>              
  );
 
  } 
}

function allCellsReducer(state, action){
    if (state === undefined){
        return allCells;
    }

    if (action.type === 'ADD_ITEM'){
        return [...state, {name: action.name}]
    }
    return [...state]
}

const reducers = combineReducers({
    allCells: allCellsReducer,
})

const store = createStore(reducers);

const mapStateToProps = function(store) {
  return {
    allCells: store.allCells,
  };
}

Table = connect(mapStateToProps)(Table)

class TableInput extends Component {
    save(){
        store.dispatch({
            type: 'ADD_ITEM',
            name: this.name.name,
        })
    }
    render(){
        return (
                <input type='text' className = 'inputCells' />
        );
    }
}

class AppRedux extends Component {
    render() {
      return (
          <Provider store={store}>
            <div className="App">
              <TableInput />
              <Table cells={allCells}/>
            </div>
          </Provider>
      );
    }
  }

  export default AppRedux;