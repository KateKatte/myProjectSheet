import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect, Provider} from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { stat } from 'fs';

class CellComponent extends Component {
  onClick = () => {
    this.props.onClick(this.props.columns, this.props.rows);
};

render() {
    return(
     <td onClick = {this.onClick}> {this.props.children} </td>
    )
  }
}
class Table extends Component{
  cellClick = (i, j) => {
    console.log (i,j)
};

  render(){
    console.log(this.props);
    var trs= new Array();
    for (var i = 0; i <= this.props.rows; i++) {
      var tds = new Array();
      for (var j = 0; j <= this.props.columns; j++) {
        // tds.push (<td columns = {i} rows = {j} onClick = {this.cellClick.bind(this, i, j)}> {i} x {j} </td>)
        tds.push (<CellComponent columns = {i} rows = {j} onClick = {this.cellClick.bind(this, i, j)}> </CellComponent>)
        // tds.push (<CellComponent columns = {i} rows = {j} onClick = {this.cellClick}/>)
      }
      trs.push(<tr>{tds}</tr>)
    }
    return (
      <table> {trs} </table>  
    )
  }
}

// function cellPlaceReducer(state, action){
//   if (state === undefined){
//       return {data: {}, status: 'ADD_CELL'}
//   }
//   if (action.type === 'CELL'){
//       return {data: action.data.cell, status: 'INPT_CELL'}
//   }
//   return state;
// }

// const reducerCellPlace = combineReducers({
//     cell: cellPlaceReducer
//   })
  
//   var store = createStore(reducerCellPlace);
//   store.subscribe( () => console.log(store.getState()))


function cellPlace (state = {}, action){
  if (state === undefined){
          return {data: {i: this.props.i, j: this.props.j}, status: 'ADD_CELL'}
      }
  if (action.type ==='CELL'){
    return {data: action.data.cell, status: 'INPT_CELL'}
  }
  console.log(action)
  return state
}

const reducerCellPlace = combineReducers({
      cell: cellPlace
    })

const store = createStore(reducerCellPlace);
console.log(store.getState())

store.subscribe(() => {
  console.log ('subscribe', store.getState())
})

store.dispatch ({type: 'ADD_CELL', cellPlace: this.props})

// function allCellsReducer(state, action){
//     if (state === undefined){
//         return trs;
//     }

//     if (action.type === 'ADD_ITEM'){
//         return [...state, {name: action.name}]
//     }
//     return [...state]
// }

class TableInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data_input: false
    };
    this.inputData = this.inputData.bind(this);
}

    save(){
      const store = createStore(this.props);
      console.log(store.getState())
        store.dispatch({
            type: 'ADD_ITEM',
            name: this.name.name,
        })
        store.subscribe( () => console.log(store.getState()))
    }

    inputData() {       
      this.setState(
          (prevState, props) => ({
              data_input: this.input.value
          })
      );
      console.log ('inputData', this.input.value)
  }
    render(){
      console.log(this.props)
        return (
                <input type='text' className = 'inputCells' value={this.props.data_input} ref={ c => this.input = c} />
        );
    }
}

// store.subscribe( () => console.log(store.getState()))


class AppRedux extends Component {
    render() {
      return (
          <Provider store={store}>
            <div className="App">
              <TableInput />
              <Table columns = {20} rows = {25}/>
            </div>
          </Provider>
      );
    }
  }

  export default AppRedux;