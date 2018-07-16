import React, { Component } from 'react';
import './App.css';
import {Router, Route, Link, Switch} from "react-router-dom"
import createHistory from "history/createBrowserHistory"
import { connect, Provider} from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { GraphQLClient } from 'graphql-request'
const gql =  new GraphQLClient("http://localhost:4000/graphql", { headers: {} })

gql.request(`query getSheet ($sheetId: Int!) {
  sheet (id: $sheetId) {
    title
    id
  }
}`,
      {
        "sheetId": 5
      }
).then(data => store.dispatch({type: 'SHEET_GOT', data}))
console.log(gql)

class SheetFeed extends Component {
    render () {
        console.log(this.props)
        return (
            <div className='sheet'>
                <div>{this.props.sheet.id}</div>
                <div>{this.props.sheet.title}</div>
            </div>
        )
    }
}

class Feed extends Component {
    render(){
        if (this.props.sheet.status === 'SHEET_GOT'){
            return (
                <div className='feedContainer'>
                    please, wait :)
                </div>
            )
        }
            return (
                <div className='feedContainer'>
                    {this.props.sheet.data.map(item => <SheetFeed sheet={item} key={item.id} />)}
                </div>
            );
    }
}

class Sheet extends Component {
    render () {
        console.log(this.props)
        return (
            <div>
                <div className = "id">
                   id sheet: {this.props.id}
                </div>
                <div className = "title"> 
                   title sheet: {this.props.title}
                </div>
            </div>
        )
    }
}

class GetSheet extends React.Component {
  render () {
      return (
          <Router history= {createHistory ()}>
          <Switch>
            <Route path='/' component={FeedPage} exact />
            <Route path='/sheet/:id' component={SheetPage} />
           </Switch> 
          </Router>
      );
  }
}


class SheetPage extends React.Component {
    render (props) {
      gql.request(`query getSheet ($sheetId: Int!) {
        sheet (id: $sheetId) {
          title
          id
        }
      }`,
      {
        "sheetId": this.props.match.params.id
      }).then(data => store.dispatch({type: 'SHEET_GOT', data}))
      console.log (this.props)
    return (
      <Sheet id={this.props.match.params.id}  />
    )
}}


function sheetsReducer(state, action){
    if (action.type === undefined){
        return {data:[], status: 'SHEET_LOAD'}
    }
    if (action.type === 'SHEET_GOT'){
        // console.log(action)
        return {data: action.data.sheet, status: 'SHEET_GOT'}
    }
    return {data: [], status: 'SHEET_LOAD'}
  }


const reducerSheet = combineReducers({
  sheet: sheetsReducer,
})

var store = createStore(reducerSheet);

const mapStateToProps = function(store) {
  return {
    sheet: store.sheet,
  };
}

Feed = connect(mapStateToProps)(Feed)
let FeedPage = (props) => <Feed />



class AppGraphRedux extends Component {
   render() {
    return (
        <Provider store={store}>
            <div className="App">
                <GetSheet/>
            </div>
        </Provider>
    );
  }
}

export default AppGraphRedux;