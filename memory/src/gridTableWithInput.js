import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect, Provider} from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { stat } from 'fs';

class CellComponent extends Component {
        onClick = () => {
        this.props.onClick(this.props.columns, this.props.rows);
        console.log (this.props)
    };
    render() {
        return(
        <td onClick = {this.onClick}> {this.props.children} </td>
        )
        }
    }
  
class Table extends Component{
    constructor(props) {
        super(props);
        this.state = {
            row: false,
            column: false,
            div_input: false
        };
        this.inputDiv = this.inputDiv.bind(this);
    }

    cellClick = (i, j) => {
        console.log (i,j)
        this.setState(() => ({
            row: i, 
            column: j
        }))
    };

    inputDiv() {       
        this.setState(
            (prevState, props) => ({
                div_input: this.input.value
            })
        );
        console.log ('inputDiv', this.input.value)
    }
    
    render(){
        // console.log(this.props);
        var trs= new Array();
        for (var i = 0; i <= this.props.rows; i++) {
            var tds = new Array();
            for (var j = 0; j <= this.props.columns; j++) {
            tds.push (<CellComponent columns = {i} rows = {j} onClick = {this.cellClick.bind(this, i, j)} text={this.props.data}> {this.props.div_input} </CellComponent>)
            }
            trs.push(<tr>{tds}</tr>)
        }
      //  this.input.value = this.props.data[this.state.row][this.state.column].formula
        return (
            <div>
            <input  value={this.props.div_input} ref={ c => this.input = c}/>
            <table> {trs} </table> 
            </div> 
        )
        }
    }

    function cellPlace (state = {}, action){
        if (state === undefined){
                return {data: {}, status: 'ADD_CELL'}
            }
        if (action.type ==='CELL'){
          return {data: action.CellComponent, status: 'INPT_CELL'}
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

      class AppTable extends Component {
        render() {
          return (
              <Provider store={store}>
                <div className="App">
                  <Table columns = {20} rows = {25}/>
                </div>
              </Provider>
          );
        }
      }
    
      export default AppTable;