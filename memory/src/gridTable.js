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
    oneCells['value']="+"
    allCells[i][j] = oneCells;
  }
}
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
  constructor (){
  super();
  // this.cellClick = this.cellClick.bind(this, i, j);
  }
  cellClick = (i, j) => {
    console.log (i,j)
};
  render(){
    var trs= new Array();
    for (var i = 0; i <= this.props.rows; i++) {
      var tds = new Array();
      for (var j = 0; j <= this.props.columns; j++) {
        // tds.push (<td columns = {i} rows = {j} onClick = {this.cellClick.bind(this, i, j)}> {i} x {j} </td>)
        tds.push (<CellComponent columns = {i} rows = {j} onClick = {this.cellClick.bind(this, i, j)}> {i} x {j} </CellComponent>)
        // tds.push (<CellComponent columns = {i} rows = {j} onClick = {this.cellClick}/>)
      }
      trs.push(<tr>{tds}</tr>)
    }
    return (
      <table> {trs} </table>
    )
  }
}

class All extends Component {
  render() {
   return (
     <div>
      {/* <CellComponent/> */}
      <Table columns = {3} rows = {5}/>
     </div>
   );
 }
}


export default Table;