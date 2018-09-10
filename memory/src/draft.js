import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect, Provider} from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { stat } from 'fs';


var dataGrid = []

function data () {
    let dataGrid = []
    for (var x = 0; x < 3; x++) {
        var rowGrid = new Array();
        dataGrid.push(rowGrid)
        for (var y = 0; y < 3; y++) {
            var cellGrid = {}
            cellGrid['formula'] = x + y
            cellGrid['value']= String.fromCharCode(65+x) +  (+(+ y))
            rowGrid.push(cellGrid)
        }
    }
    return dataGrid
}

dataGrid = data ()

class CellComponent extends Component {
    onClick = () => {
    this.props.onClick(this.props.rows, this.props.columns); 
    console.log (this.props)
    };
    render() {
        return(
        <td onClick = {this.onClick}> {this.props.cellData.formula} </td>
        )
    }
}


class TestFromInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cell_input: true,
            row: 0,
            column: 0
            };
        this.inputCell = this.inputCell.bind(this.value);
        this.onChange = this.onChange.bind(this);
    }

    cellClick = (i,j) => {
        console.log (j,i)
        this.input.value = this.props.dataGrid [i][j].formula 
        this.setState(() => ({
            row: i, 
            column: j
        }))
        store.dispatch ({type: 'CHANGE_INPUT', dataFormula: this.props.dataGrid [i][j].formula})
    };

    inputCell() {       
        this.setState(
            (prevState, props) => ({
                cell_input: this.input.value
            })
        );
    }
    onChange(i, j){
        console.log ('inputCell', this.input.value)
        this.props.dataGrid [this.state.row][this.state.column].formula = this.input.value
        
        store.dispatch ({type: 'CHANGE_CELL', dataInput: this.input.value})
        //todo dispatch
    }
  
    render (){
        console.log ('render', this.props)
        var trs= new Array();
                    for (var i = 0; i < this.props.rows; i++) {
                    var tds = new Array();
                    for (var j = 0; j < this.props.columns; j++) {
                        var oneCell = {}
                        oneCell['addres']= String.fromCharCode(65+i) +  (+(+ j))
                        oneCell['formula'] = " "
                        oneCell[String.fromCharCode(65+i) +  (+(+ j))] = {i} + {j}
                        tds.push (<CellComponent
                            addres = {oneCell.addres}
                            columns = {j} rows = {i} 
                            onClick = {this.cellClick.bind(this, j, i)}
                            onChange = {this.inputCell}
                            ref={ c => this.td = c}
                            cellData = {this.props.data[j][i]}
                            >  </CellComponent>)
                        }
                    trs.push(<tr>{tds}</tr>)
                    }
        
        return (
            <div>
                <input                  
                className = "dataInput" 
                onChange={this.onChange}  
                ref={ c => this.input = c}/>
                <table> 
                    <tbody>
                        {trs}
                    </tbody>
                </table>        
            </div>                
        )
    };
};

function tableReducer(state =[], action){
    if (action.type === 'CHANGE_INPUT'){
        return [...state, action.dataFormula]
    }
    if (action.type === 'CHANGE_CELL'){
        return [...state, action.dataInput]
    }
    return state;
}

const store = createStore (tableReducer)
store.subscribe(() => {
    console.log('subcribe', store.getState())
})

const mapStateToProps = function (store) {
    return {
        tableReducer: store,
    
    };
  }
  
data = connect(mapStateToProps)(data)
  

// const cellData = combineReducers({
//     //   sheet: sheetsReducer,
//       cell: cellPlace
//     })


// const store = createStore (cellData);
// store.subscribe(() => {
//     console.log('subcribe', store.getState())
// })

class AppInput extends Component {
    render() {
        //todo connect data from store
      return (
        <Provider store={store}>
        
            <div className="App">
            
              <TestFromInput columns = {3} rows = {3} data = {dataGrid}/> 
            </div>
        </Provider>
      );
    }
  }

  export default AppInput;


import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { connect, Provider} from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { stat } from 'fs';

let data = [[{value: 5, formula: 5}, {value: 2, formula: 2}, {value: 3, formula: 3}],
            [{value: 4, formula: 4}, {value: 6, formula: 6}, {value: 7, formula: 7}],
            [{value: 8, formula: 8}, {value: 9, formula: 9}, {value: 1, formula: 1}], ]



class CellComponent extends Component {
    onClick = () => {
    this.props.onClick(this.props.rows, this.props.columns); 
    console.log (this.props)
    };
    render() {
        return(
        <td onClick = {this.onClick}> {this.props.cellData.value} </td>
        )
    }
}


class TestFromInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cell_input: true,
            row: 0,
            column: 0
            };
        this.inputCell = this.inputCell.bind(this.value);
        this.onChange = this.onChange.bind(this);
    }

    cellClick = (i,j) => {
        console.log (j,i)
        this.input.value = this.props.data [i][j].formula 
        this.setState(() => ({
            row: i, 
            column: j
        }))
        store.dispatch ({type: 'CHANGE_INPUT', dataFormula: this.props.data [i][j].formula})
    };

    inputCell() {       
        this.setState(
            (prevState, props) => ({
                cell_input: this.input.value
            })
        );
    }
    onChange(i, j){
        console.log ('inputCell', this.input.value)
        this.props.data [this.state.row][this.state.column].formula = this.input.value
        
        store.dispatch ({type: 'CHANGE_CELL', dataInput: this.input.value})
        //todo dispatch
    }
  
    render (){
        console.log (this.props)
        var trs= new Array();
                    for (var i = 0; i < this.props.rows; i++) {
                    var tds = new Array();
                    for (var j = 0; j < this.props.columns; j++) {
                        var oneCell = {}
                        oneCell['adress']= String.fromCharCode(65+i) +  (+(+ j))
                        oneCell['formula'] = " "
                        oneCell[String.fromCharCode(65+i) +  (+(+ j))] = {i} + {j}
                        tds.push (<CellComponent
                            adress = {oneCell.adress}
                            columns = {j} rows = {i} 
                            onClick = {this.cellClick.bind(this, j, i)}
                            onChange = {this.inputCell}
                            ref={ c => this.td = c}
                            cellData = {this.props.data[j][i]}
                            >  </CellComponent>)
                        }
                    trs.push(<tr>{tds}</tr>)
                    }
        
        return (
            <div>
                <input                  
                className = "dataInput" 
                onChange={this.onChange}  
                ref={ c => this.input = c}/>
                <table> 
                    <tbody>
                        {trs}
                    </tbody>
                </table>        
            </div>                
        )
    };
};

function tableReducer(state =[], action){
    if (action.type === 'CHANGE_INPUT'){
        return [...state, action.dataFormula]
    }
    if (action.type === 'CHANGE_CELL'){
        return [...state, action.dataInput]
    }
    return state;
}

const store = createStore (tableReducer)
store.subscribe(() => {
    console.log('subcribe', store.getState())
})

const mapStateToProps = function (store) {
    return {
        tableReducer: store,
    
    };
  }
  
 data = connect(mapStateToProps)(data)
  

// const cellData = combineReducers({
//     //   sheet: sheetsReducer,
//       cell: cellPlace
//     })


// const store = createStore (cellData);
// store.subscribe(() => {
//     console.log('subcribe', store.getState())
// })

class AppInput extends Component {
    render() {
        //todo connect data from store
      return (
        <Provider store={store}>
        
            <div className="App">
            
              <TestFromInput columns = {3} rows = {3} data = {data}/> 
            </div>
        </Provider>
      );
    }
  }

  export default AppInput;
  


import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


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

class TestFromInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
  
    render (){
        var trs= new Array();
                    for (var i = 0; i <= this.props.rows; i++) {
                    var tds = new Array();
                    for (var j = 0; j <= this.props.columns; j++) {
                        var oneCell = {}
                        oneCell['name']= String.fromCharCode(65+i) +  (+(+ j))
                        tds.push (<CellComponent
                            id = {oneCell}
                            columns = {i} rows = {j} 
                            onClick = {this.cellClick.bind(this, i, j)}
                            onClick = {this.inputDiv}
                            text={this.props.data}> {this.state.div_input} </CellComponent>)
                        }
                    trs.push(<tr>{tds}</tr>)
                    }
        return (
            <div>
                <input  value={this.props.div_input} ref={ c => this.input = c}/>
                <table> 
                    <tbody>
                    {trs}
                    </tbody>
                </table>        
            </div>                
        )
    };
};

// var trs = new Array();
// for (var i = 0; i < 5; i++) {
//   var tds = new Array();
//   for (var j = 1; j <= 5; j++) {
//     var oneCell = {}
//     oneCell['name']= String.fromCharCode(65+i) +  (+(+ j))
//     tds.push(oneCell);
//   }
// trs.push(tds)
// }
// oneCell['name']= String.fromCharCode(65+i) +  (+(+ j))
// render(){
//     var allCells = new Array();
// for (var i = 0; i < 25; i++) {
//   allCells[i] = new Array();
//   for (var j = 1; j <= 20; j++) {
//     var oneCells = {}
//     oneCells['name']= String.fromCharCode(65+i) +  (+(+ j))
//     allCells[i][j] = oneCells;
//   }
// }
//       return (
       
//           <tr>
//           {allCells.map(item => (<td className = "cells"> {item.name} </td>))}
//           </tr>
        
//       );
//   }


class TestFromInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
  
    render (){
        var trs= new Array();
                    for (var i = 0; i <= this.props.rows; i++) {
                    var tds = new Array();
                    for (var j = 0; j <= this.props.columns; j++) {
                        tds.push (<td columns = {i} rows = {j} onClick = {this.inputDiv}> {this.state.div_input} </td>)
                        // tds.push (<CellComponent columns = {i} rows = {j} onClick = {this.props.onClick.bind(this)}/>)
                    }
                    trs.push(<tr>{tds}</tr>)
                    }
        return (
            <div>
                <input  value={this.props.div_input} ref={ c => this.input = c}/>
                

                <table>
                    {trs}
                </table>        
                {/* <table> 
                    <tr>
                        <td onClick = {this.inputDiv}> {this.state.div_input} </td>
                        <td> {this.state.div_input} </td>
                        <td> {this.state.div_input} </td>
                    </tr>
                    <tr>
                        <td> {this.state.div_input} </td>
                        <td> {this.state.div_input} </td>
                        <td> {this.state.div_input} </td>
                    </tr>
                </table> */}
                {/* <div onMouseOver = {this.inputDiv} placeholder = "text"> {this.state.div_input}  </div> */}
            </div> 
        )
    };
};

class AppInput extends Component {
    render() {
      return (
            <div className="App">
              <TestFromInput columns = {4} rows = {6}/>
            </div>
      );
    }
  }

  export default AppInput;