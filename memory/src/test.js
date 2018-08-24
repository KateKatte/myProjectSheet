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
  render () {
    return {
    // onClick = this.props
    }
  }
}
class Table extends Component{
  constructor (){
  super();
  this.cellClick = this.cellClick.bind(this);
  }
  
  cellClick () {
    console.log (i,j)
  }

  render(){
    var trs= new Array();
    for (var i = 0; i <= this.props.rows; i++) {
      var tds = new Array();
      for (var j = 0; j <= this.props.columns; j++) {
        tds.push (<td columns = {i} rows = {j} onClick = {this.props.cellClick}> {i} x {j} </td>)
        // tds.push (<CellComponent columns = {i} rows = {j} onClick = {this.props.onClick.bind(this)}/>)
      }
      trs.push(<tr>{tds}</tr>)
    }
    return (
      <table>
          {trs}
        </table>
    )
  }
}

// class CellsTable extends Component {
//   constructor(props) {
//       super (props);
//       this.state = {allCells: []}

//   }

//   render(){
//     var allCells = new Array();
//     for (var i = 0; i <= 25; i++) {
//       allCells[i] = new Array();
//       for (var j = 0; j <= 20; j++) {
//         var oneCells = {}
//         oneCells['value']=" "
//         allCells[i][j] = oneCells;
//       }
//     }
//       return (
       
//           <tr>
//           {allCells.map(item => (<td className = "cells"> {item.value}</td>))}
//           </tr>
        
//       );
//   }
// }

// class Table extends Component {
//   constructor(props){
//     super (props);
//     }
    
// render() {
//   return (
//     <table className = 'table'> 
//     <tbody>
//         {this.props.cells.map((item) => <CellsTable data ={item}/> )}
//         </tbody>
//     </table>              
//   );
 
//   } 
// }

export default Table;

